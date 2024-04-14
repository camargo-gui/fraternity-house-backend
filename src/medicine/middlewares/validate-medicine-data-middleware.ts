import { NextFunction, Request, Response } from "express";
import type { MedicineDTO } from "medicine/DTO/medicine-dto";

export class ValidateMedicineDataMiddleware {
  private errors: string[] = [];

  requiredFields = (medicine: MedicineDTO) => {
    if (!medicine.name) {
      this.errors.push("Nome é obrigatório.\n");
    }
    if (!medicine.id_pharmacological_form) {
      this.errors.push("Formafamarcêuticas é obrigatória.\n");
    }
    if (!medicine.id_pharmacological_name) {
      this.errors.push("Nome farmacológico é obrigatório.\n");
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
