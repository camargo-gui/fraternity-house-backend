import { prismaClient } from "client/prisma-client";
import EmailService from "common/services/send-email-service";
import SMSService from "common/services/sms-service";
import { EmployeeModel } from "employee/model/employee-model";
import { MedicationSheetModel } from "medication-sheet/model/medication-sheet-model";
import { MedicineModel } from "medicine/model/medicine-model";
import moment from "moment";
import cron from "node-cron";
import { PrescriptionDTO } from "prescription/DTO/prescription-dto";
import { PrescriptionModel } from "prescription/model/prescription-model";
import { ResidentModel } from "resident/model/resident-model";

const emailService = new EmailService();
const smsService = new SMSService();

const medicineModel = new MedicineModel();
const employeeModel = new EmployeeModel();
const residentModel = new ResidentModel();
const medicationSheetModel = new MedicationSheetModel();
const prescriptionModel = new PrescriptionModel();

async function scheduleAllMedicationReminders() {
  try {
    const prescriptions = await prescriptionModel.getAll();
    if (!prescriptions) {
      console.log("No prescriptions found.");
      return;
    }

    prescriptions.forEach((prescription) => {
      scheduleMedicationReminders(prescription);
    });
  } catch (error) {
    console.log("Failed to fetch prescriptions:", error);
  }
}

function scheduleMedicationReminders(prescription: PrescriptionDTO): void {
  const { startDate, frequency, dosage, medicineId, endDate, firstTime } =
    prescription;
  const firstDoseTime = moment(startDate)
    .hours(Number(firstTime.substring(0, 2)))
    .minutes(Number(firstTime.substring(3, 5)));
  const prescriptionEndDate = moment(endDate);

  const scheduledTime = firstDoseTime;

  while (scheduledTime <= prescriptionEndDate) {
    const reminderTime = moment(scheduledTime)
      .subtract(10, "minutes")
      .add(3, "hours");

    cron.schedule(
      `${reminderTime.minute()} ${reminderTime.hour()} ${reminderTime.date()} ${
        reminderTime.month() + 1
      } *`,
      async () => {
        const medicineDetails = await medicineModel.getById(medicineId);

        const medicationSheet = await medicationSheetModel.getById(
          prescription.medicationSheetId,
          prismaClient
        );
        const employee = await employeeModel.getById(
          medicationSheet?.createdBy ?? 0
        );
        const resident = await residentModel.getById(
          medicationSheet?.residentId ?? 0
        );

        if (!medicineDetails || !employee || !resident) {
          console.log("Failed to get medicine or employee details.");
          return;
        }

        const message = `
        É hora de preparar a medicação ${medicineDetails.name} (${dosage}).\n
        Morador: ${resident.name}
        `;

        await emailService.sendEmail(
          employee.email,
          "Lembrete de Medicação",
          `<p>${message}</p>`
        );

        await smsService.sendSMS(`+55${employee.phone}`, message);
      }
    );

    scheduledTime.add(frequency, "hours");
  }
}

export { scheduleAllMedicationReminders };
