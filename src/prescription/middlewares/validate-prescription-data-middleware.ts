import { NextFunction, Request, Response } from "express";
import { PrescriptionDTO } from "prescription/DTO/prescription-dto";

export class ValidatePrescriptionDataMiddleware {
  private errors: string[] = [];

  requireFields = (prescription: PrescriptionDTO) => {
    if (!prescription.dosage) {
      this.errors.push("Prescrições são obrigatórias.");
    }
    if (!prescription.frequency) {
      this.errors.push("Frequência é obrigatória.");
    }
    if (!prescription.startDate) {
      this.errors.push("Data de início é obrigatória.");
    }
    if (!prescription.endDate) {
      this.errors.push("Data de término é obrigatória.");
    }
    if (!prescription.firstTime) {
      this.errors.push("Primeira vez é obrigatória.");
    }
  };

  execute = async (req: Request, res: Response, next: NextFunction) => {
    try {
      this.errors = [];
      const prescription = req.body;
      this.requireFields(prescription);
      if (this.errors.length > 0) {
        return res.status(400).json({ message: this.errors });
      }
      next();
    } catch (error) {
      return res.status(500).send();
    }
  };
}
