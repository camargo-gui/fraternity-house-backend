import { NextFunction, Request, Response } from "express";
import type { MedicineDTO } from "medicine/DTO/medicine-dto";

export class ValidateMedicineDataMiddleware {
  private errors: string[] = [];

  requiredFields = (medicine: MedicineDTO) => {
    if (!medicine.name) {
      this.errors.push("Name is required");
    }
    if (!medicine.pharmaceutical_forms) {
      this.errors.push("Pharmaceutical forms is required");
    }
    if (!medicine.id_pharmacological_name) {
      this.errors.push("Pharmacological name is required");
    }
  };

  execute = async (req: Request, res: Response, next: NextFunction) => {
    try {
      this.errors = [];
      const medicine = req.body;
      this.requiredFields(medicine);
      if (this.errors.length > 0) {
        return res.status(400).json({ message: this.errors });
      }
      next();
    } catch (error) {
      return res.status(500).send();
    }
  };
}
