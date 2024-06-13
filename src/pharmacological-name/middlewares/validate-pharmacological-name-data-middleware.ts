import type { PharmalogicalNameDTO } from "#/pharmacological-name/DTO/pharmacological-name-dto";
import { NextFunction, Request, Response } from "express";

export class ValidatePharmacologicalNameDataMiddleware {
  private errors: string[] = [];

  requiredFields = (pharmacologicalName: PharmalogicalNameDTO) => {
    if (!pharmacologicalName.name) {
      this.errors.push("Nome é obrigatório.\n");
    }
  };

  execute = async (req: Request, res: Response, next: NextFunction) => {
    try {
      this.errors = [];
      const pharmacologicalName = req.body;
      this.requiredFields(pharmacologicalName);
      if (this.errors.length > 0) {
        return res.status(400).json({ message: this.errors });
      }
      next();
    } catch (error) {
      return res.status(500).send();
    }
  };
}
