import assert from "assert";
import EmailService from "common/services/send-email-service";
import { EmployeeModel } from "employee/model/employee-model";
import moment from "moment-timezone";
import cron from "node-cron";
import { buildEmailMessageForEmployee } from "notification/email-template/notification-email-template";
import { NotificationModel } from "notification/model/notification-model";
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

interface PrescriptionTimeCalculationInput {
  firstTime: string;
  frequency: number;
  duration: moment.Moment;
}

interface ExtendedPrescription extends PrescriptionWithRelations {
  scheduledTime: string;
}

const getTimeInSaoPaulo = (time: string): moment.Moment => {
  return moment.tz(time, "HH:mm", "America/Sao_Paulo");
};

interface GroupedPrescriptions {
  [employeeId: string]: PrescriptionDetail[];
}

const emailService = new EmailService();
const employeeModel = new EmployeeModel();
const prescriptionModel = new PrescriptionModel();
const notificationModel = new NotificationModel();

const scheduleHourlyMedicationReminders = async () => {
  cron.schedule("30 * * * *", async () => {
    const nextHour = moment()
      .tz("America/Sao_Paulo")
      .startOf("hour")
      .add(1, "hour");
    const prescriptionsDueNextHour = await getPrescriptionsDue(nextHour);

    const notificationsByEmployee = groupPrescriptionsByEmployee(
      prescriptionsDueNextHour
    );

    for (const [employeeId, details] of Object.entries(
      notificationsByEmployee
    )) {
      const employee = await employeeModel.getById(Number(employeeId));
      assert(employee, `Employee not found for id ${employeeId}`);

      await Promise.all(
        details.map((detail) =>
          notificationModel.create({
            residentName: detail.residentName,
            medicineName: detail.medicineName,
            dosage: detail.dosage,
            time: detail.time,
            endDate: moment(detail.endDate, "DD/MM/YYYY").toDate(),
            employeeId: Number(employeeId),
            wasRead: false,
          })
        )
      );

      const emailMessage = buildEmailMessageForEmployee(details, employee.name);

      await emailService.sendEmail(
        employee.email,
        "Lembrete de Medicação",
        emailMessage
      );
    }
  });
};

const calculateScheduledTimes = ({
  firstTime,
  frequency,
  duration,
}: PrescriptionTimeCalculationInput): moment.Moment[] => {
  const times = [];
  const currentTime = getTimeInSaoPaulo(firstTime);

  while (currentTime.isBefore(duration)) {
    times.push(currentTime.clone());
    currentTime.add(frequency, "hours");
  }

  return times;
};

const getPrescriptionsDue = async (
  targetTime: moment.Moment
): Promise<ExtendedPrescription[]> => {
  const startOfHour = targetTime.clone().startOf("hour");
  const endOfHour = startOfHour.clone().add(1, "hour");
  const prescriptions = await prescriptionModel.getAll();

  return prescriptions.flatMap((prescription) => {
    const startDate = moment(prescription.startDate).tz("America/Sao_Paulo");
    const endDate = moment(prescription.endDate).tz("America/Sao_Paulo");
    const now = moment().tz("America/Sao_Paulo");

    if (now.isBefore(startDate) || now.isAfter(endDate)) {
      return [];
    }

    const times = calculateScheduledTimes({
      firstTime: prescription.firstTime,
      frequency: Number(prescription.frequency),
      duration: endOfHour,
    });

    return times
      .filter(
        (time) => time.isSameOrAfter(startOfHour) && time.isBefore(endOfHour)
      )
      .map((time) => ({
        ...prescription,
        scheduledTime: time.format("HH:mm"),
      }));
  });
};

const groupPrescriptionsByEmployee = (
  prescriptions: ExtendedPrescription[]
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
      time: prescription.scheduledTime,
      endDate: moment(prescription.endDate).format("DD/MM/YYYY"),
    });
  });
  return grouped;
};

export { scheduleHourlyMedicationReminders };
