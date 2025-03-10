import { MedicationSheetRequestBody } from "#/medication-sheet/DTO/medication-sheet-dto";
import { NextFunction, Request, Response } from "express";

export class ValidateMedicationSheetDataMiddleware {
  private errors: string[] = [];

  requireFields = (medicationSheet: MedicationSheetRequestBody) => {
    if (!medicationSheet.residentId) {
      this.errors.push("Morador é obrigatório.");
    }
    if (!medicationSheet.prescriptions) {
      this.errors.push("Prescrições são obrigatórias.");
    }
  };

  execute = async (req: Request, res: Response, next: NextFunction) => {
    try {
      this.errors = [];
      const medicationSheet = req.body;
      this.requireFields(medicationSheet);
      if (this.errors.length > 0) {
        return res.status(400).json({ message: this.errors });
      }
      next();
    } catch (error) {
      return res.status(500).send();
    }
  };
}
