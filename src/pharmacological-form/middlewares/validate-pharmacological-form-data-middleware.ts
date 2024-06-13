import { PharmacologicalFormDTO } from "#/pharmacological-form/DTO/pharmacological-form-dto";
import { NextFunction, Request, Response } from "express";

export class ValidatePharmacologicalFormDataMiddleware {
  private errors: string[] = [];

  requiredFields = (pharmacologicalForm: PharmacologicalFormDTO) => {
    if (!pharmacologicalForm.name) {
      this.errors.push("Nome é obrigatório.\n");
    }
  };

  execute = async (req: Request, res: Response, next: NextFunction) => {
    try {
      this.errors = [];
      const pharmacologicalForm = req.body;
      this.requiredFields(pharmacologicalForm);
      if (this.errors.length > 0) {
        return res.status(400).json({ message: this.errors });
      }
      next();
    } catch (error) {
      return res.status(500).send();
    }
  };
}
