import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { MedicationSheetModel } from "medication-sheet/model/medication-sheet-model";
import { PrescriptionModel } from "prescription/model/prescription-model";

export class PrescriptionController {
  private prescriptionModel = new PrescriptionModel();
  private medicationSheetModel = new MedicationSheetModel();
  private prismaClient = new PrismaClient();

  public create = async (req: Request, res: Response) => {
    const bodyPrescription = req.body;

    try {
      const prescription = await this.prismaClient.$transaction(
        async (prisma) => {
          const medicationSheet =
            await this.medicationSheetModel.getByResidentId(
              bodyPrescription.residentId,
              prisma
            );

          if (!medicationSheet) {
            throw new Error("Medication sheet not found.");
          }

          return this.prescriptionModel.create(
            {
              medicationSheetId: medicationSheet.id,
              medicineId: bodyPrescription.medicineId,
              dosage: bodyPrescription.dosage,
              endDate: new Date(bodyPrescription.endDate),
              startDate: new Date(bodyPrescription.startDate),
              firstTime: bodyPrescription.firstTime,
              frequency: bodyPrescription.frequency,
            },
            prisma
          );
        }
      );

      res.status(201).json({ prescription });
    } catch (error) {
      res.status(500).json({
        message: ["An error occurred while creating the prescription.", error],
      });
    }
  };

  public update = async (req: Request, res: Response) => {
    const bodyPrescription = req.body;

    try {
      const prescriptionExists = await this.prescriptionModel.getById(
        bodyPrescription.id
      );

      if (!prescriptionExists) {
        return res.status(404).json({ message: "Prescription not found." });
      }

      const updatedPrescription = await this.prescriptionModel.update({
        id: prescriptionExists.id,
        medicationSheetId: prescriptionExists.MedicationSheet.id,
        medicineId: prescriptionExists.Medicine.id,
        dosage: bodyPrescription.dosage,
        endDate: bodyPrescription.endDate,
        firstTime: bodyPrescription.firstTime,
        frequency: bodyPrescription.frequency,
        startDate: bodyPrescription.startDate,
      });

      res.status(200).json({ prescription: updatedPrescription });
    } catch (error) {
      res.status(500).json({
        message: ["An error occurred while updating the prescription.", error],
      });
    }
  };

  public delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await this.prismaClient.$transaction(async (prisma) => {
        const prescription = await this.prescriptionModel.delete(
          Number(id),
          prisma
        );
        const remainingPrescriptions =
          await this.prescriptionModel.getAllByMedicationSheetId(
            prescription.medicationSheetId,
            prisma
          );

        if (remainingPrescriptions.length === 0) {
          await this.medicationSheetModel.delete(
            prescription.medicationSheetId,
            prisma
          );
        }
      });

      res.status(204).send();
    } catch (error) {
      res.status(500).json({
        message: ["An error occurred while deleting the prescription.", error],
      });
    }
  };
}
