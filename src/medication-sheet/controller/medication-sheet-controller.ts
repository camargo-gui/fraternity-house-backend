import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "common/entities/auth-request";
import { Response } from "express";
import { MedicationSheetModel } from "medication-sheet/model/medication-sheet-model";
import { PrescriptionModel } from "medication-sheet/model/prescription-model";

export class MedicationSheetController {
  private medicationSheetModel = new MedicationSheetModel();
  private prescriptionModel = new PrescriptionModel();
  private prismaClient = new PrismaClient();

  public create = async (req: AuthRequest, res: Response) => {
    const { residentId, observations, prescriptions } = req.body;

    try {
      const medicationSheet = await this.prismaClient.$transaction(
        async (prisma) => {
          const newMedicationSheet = await this.medicationSheetModel.create(
            {
              residentId,
              createdBy: Number(req.id),
              observations,
            },
            prisma
          );

          for (const prescription of prescriptions) {
            await this.prescriptionModel.create(
              {
                medicationSheetId: newMedicationSheet.id,
                medicineId: prescription.medicineId,
                frequency: prescription.frequency,
                startDate: new Date(prescription.startDate),
                endDate: new Date(prescription.endDate),
                firstTime: prescription.firstTime,
                dosage: prescription.dosage,
              },
              prisma
            );
          }

          return newMedicationSheet;
        }
      );

      res.status(201).json({ medicationSheet });
    } catch (error) {
      res.status(500).json({
        message: [
          "An error occurred while creating the medication sheet with prescriptions.",
          error,
        ],
      });
    }
  };
}
