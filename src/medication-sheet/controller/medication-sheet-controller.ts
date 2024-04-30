import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "common/entities/auth-request";
import { Request, Response } from "express";
import { MedicationSheetModel } from "medication-sheet/model/medication-sheet-model";
import moment from "moment";
import { PrescriptionDTO } from "prescription/DTO/prescription-dto";
import { PrescriptionModel } from "prescription/model/prescription-model";

export class MedicationSheetController {
  private medicationSheetModel = new MedicationSheetModel();
  private prescriptionModel = new PrescriptionModel();
  private prismaClient = new PrismaClient();

  public create = async (req: AuthRequest, res: Response) => {
    const { residentId, observations, prescriptions } = req.body;

    if (!this.verifyPrescriptionsDate(prescriptions)) {
      return res.status(400).json({
        message: [
          "As datas de início e término das prescrições devem ser válidas e posteriores à data atual.",
        ],
      });
    }

    try {
      const medicationSheet = await this.prismaClient.$transaction(
        async (prisma) => {
          let sheet = await this.medicationSheetModel.getById(
            residentId,
            prisma
          );

          if (!sheet) {
            sheet = await this.medicationSheetModel.create(
              {
                residentId,
                createdBy: Number(req.id),
                observations,
              },
              prisma
            );
          }

          for (const prescription of prescriptions) {
            await this.prescriptionModel.create(
              {
                medicationSheetId: sheet.id,
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

          return sheet;
        }
      );

      res.status(201).json({ medicationSheet });
    } catch (error) {
      res.status(500).json({
        message: [
          "Ocorreu um erro ao criar a ficha de medicação com as prescrições.",
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

  private verifyPrescriptionsDate = (prescriptions: PrescriptionDTO[]) => {
    const today = moment().startOf("day");
    for (const prescription of prescriptions) {
      const startDate = moment(prescription.startDate, "YYYY-MM-DD");
      const endDate = moment(prescription.endDate, "YYYY-MM-DD");
      if (
        moment(startDate).isAfter(moment(endDate)) ||
        moment(startDate).isBefore(today)
      ) {
        return false;
      }
    }

    return true;
  };
}
