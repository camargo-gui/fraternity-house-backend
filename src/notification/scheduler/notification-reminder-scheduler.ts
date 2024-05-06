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
  cron.schedule("0 * * * *", async () => {
    const currentTime = moment().subtract(3, "hours");
    const prescriptionsDueThisHour = await getPrescriptionsDue(currentTime);

    const notificationsByEmployee = groupPrescriptionsByEmployee(
      prescriptionsDueThisHour
    );

    for (const [employeeId, details] of Object.entries(
      notificationsByEmployee
    )) {
      const employee = await employeeModel.getById(Number(employeeId));
      const message = buildMessageForEmployee(details);
      assert(employee, `Employee not found for id ${employeeId}`);

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

const getPrescriptionsDue = async (currentTime: moment.Moment) => {
  const startOfHour = currentTime.startOf("hour").get("hour");
  const endOfHour = currentTime.startOf("hour").add(1, "hour").get("hour");

  const prescriptions = await prescriptionModel.getAll();

  return prescriptions.filter((prescription) => {
    const firstTime = moment(prescription.firstTime, "HH:mm").get("hour");
    return firstTime >= startOfHour && firstTime < endOfHour;
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
    message += `Morador: ${detail.residentName} | Medicamento: ${detail.medicineName} (${detail.dosage}) | hora: ${detail.time}\n\n`;
  });
  return message;
};

export { scheduleHourlyMedicationReminders };
