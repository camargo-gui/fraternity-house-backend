import { EmployeeModel } from "employee/model/employee-model";
import { NextFunction, Request, Response } from "express";

export class ValidateEmployeeDataMiddleware {

  private model = new EmployeeModel();

  private errors: string[] = [];

  alreadyExists = async (document: string) => {
    const employee = await this.model.getByDocument(document);
    if (employee) {
      this.errors.push("Usuário já existe");
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  requiredFields = (employee: any) => {
    if (!employee.document) {
      this.errors.push("Documento é obrigatório,");
    }
    if (!employee.name) {
      this.errors.push("nome é obrigatório");
    }
    if (!employee.email) {
      this.errors.push("email é obrigatório,");
    }
    if (!employee.role_id) {
      this.errors.push("cargo é obrigatório,");
    }
    if (!employee.phone) {
      this.errors.push("telefone é obrigatório");
    }
  };

  execute = async (req: Request, res: Response, next: NextFunction) => {
    try {
      this.errors = [];
      const employee = req.body;
      this.requiredFields(employee);
      await this.alreadyExists(employee.document);
      if (this.errors.length > 0) {
        return res.status(400).json({ message: this.errors });
      }
      next();
    } catch (error) {
      return res.status(500).send();
    }
  };
}