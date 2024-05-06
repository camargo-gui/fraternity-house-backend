import assert from "assert";
import EmailService from "common/services/send-email-service";
import SMSService from "common/services/sms-service";
import { EmployeeModel } from "employee/model/employee-model";
import moment from "moment";
import cron from "node-cron";
import { buildEmailMessageForEmployee } from "notification/email-template/notification-email-template";
import { PrescriptionDTO } from "prescription/DTO/prescription-dto";
import { PrescriptionModel } from "prescription/model/prescription-model";

type PrescriptionWithRelations = PrescriptionDTO & {
  MedicationSheet: {
    createdBy: number;
    Resident: { name: string };
    Employee: { name: string; phone: string; email: string };
  };
  Medicine: { name: string };
};

export interface PrescriptionDetail {
  residentName: string;
  medicineName: string;
  dosage: string;
  time: string;
  endDate: string;
}

interface GroupedPrescriptions {
  [employeeId: string]: PrescriptionDetail[];
}

const emailService = new EmailService();
const smsService = new SMSService();
const employeeModel = new EmployeeModel();
const prescriptionModel = new PrescriptionModel();

const scheduleHourlyMedicationReminders = async () => {
  cron.schedule("30 * * * *", async () => {
    const currentTime = moment().subtract(30, "minutes");
    const prescriptionsDueNextHour = await getPrescriptionsDue(
      currentTime.add(1, "hours")
    );

    const notificationsByEmployee = groupPrescriptionsByEmployee(
      prescriptionsDueNextHour
    );

    for (const [employeeId, details] of Object.entries(
      notificationsByEmployee
    )) {
      const employee = await employeeModel.getById(Number(employeeId));
      assert(employee, `Employee not found for id ${employeeId}`);

      const message = buildMessageForEmployee(details);
      const emailMessage = buildEmailMessageForEmployee(details, employee.name);

      await smsService.sendSMS(`+55${employee.phone}`, message);
      await emailService.sendEmail(
        employee.email,
        "Lembrete de Medicação",
        emailMessage
      );
    }
  });
};

const getPrescriptionsDue = async (targetTime: moment.Moment) => {
  const startOfHour = targetTime.startOf("hour");
  const endOfHour = moment(startOfHour).add(1, "hour");

  const prescriptions = await prescriptionModel.getAll();

  return prescriptions.filter((prescription) => {
    const prescriptionTime = moment(prescription.firstTime, "HH:mm");
    return (
      prescriptionTime.isSameOrAfter(startOfHour) &&
      prescriptionTime.isBefore(endOfHour)
    );
  });
};

const groupPrescriptionsByEmployee = (
  prescriptions: PrescriptionWithRelations[]
): GroupedPrescriptions => {
  const grouped: GroupedPrescriptions = {};
  prescriptions.forEach((prescription) => {
    const createdBy = String(prescription.MedicationSheet.createdBy);
    if (!grouped[createdBy]) {
      grouped[createdBy] = [];
    }
    grouped[createdBy].push({
      residentName: prescription.MedicationSheet.Resident.name,
      medicineName: prescription.Medicine.name,
      dosage: prescription.dosage,
      time: prescription.firstTime,
      endDate: moment(prescription.endDate).format("DD/MM/YYYY"),
    });
  });
  return grouped;
};

const buildMessageForEmployee = (details: PrescriptionDetail[]) => {
  let message =
    details.length > 1
      ? "Bora preparar os medicamentos:\n"
      : "Bora preparar o medicamento:\n";

  details.forEach((detail) => {
    message += `Morador: ${detail.residentName}\nMedicamento: ${detail.medicineName} (${detail.dosage})\nhora: ${detail.time}\n\n`;
  });
  return message;
};

export { scheduleHourlyMedicationReminders };
