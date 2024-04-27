import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "common/entities/auth-request";
import { Request, Response } from "express";
import { MedicationSheetModel } from "medication-sheet/model/medication-sheet-model";
import { PrescriptionModel } from "prescription/model/prescription-model";

export class MedicationSheetController {
  private medicationSheetModel = new MedicationSheetModel();
  private prescriptionModel = new PrescriptionModel();
  private prismaClient = new PrismaClient();

  public create = async (req: AuthRequest, res: Response) => {
    const { residentId, observations, prescriptions } = req.body;

    try {
      const medicationSheet = await this.prismaClient.$transaction(
        async (prisma) => {
          const newMedicationSheet =
            await this.medicationSheetModel.getOrCreateSheet(
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
                medicationSheetId: newMedicationSheet?.id,
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
          "An error occurred while creating or updating the medication sheet with prescriptions.",
          error,
        ],
      });
    }
  };

  update = async (req: Request, res: Response) => {
    const medicationSheetBody = req.body;

    try {
      const medicationSheet = await this.medicationSheetModel.update(
        medicationSheetBody
      );

      res.status(200).json({ medicationSheet });
    } catch (error) {
      res.status(500).json({
        message: [
          "An error occurred while updating the medication sheet with prescriptions.",
          error,
        ],
      });
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const medicationSheets = await this.medicationSheetModel.getAll();

      res.status(200).json({ medicationSheets });
    } catch (error) {
      res.status(500).json({
        message: [
          "An error occurred while fetching all medication sheets.",
          error,
        ],
      });
    }
  };
}
