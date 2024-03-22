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
    console.log(employee);
    if (!employee.document) {
      this.errors.push("Document é obrigatório");
    }
    if (!employee.name) {
      this.errors.push("Nome é obrigatório");
    }
    if (!employee.email) {
      this.errors.push("Email é obrigatório");
    }
    if (!employee.role_id) {
      this.errors.push("Role é obrigatório");
    }
    if (!employee.phone) {
      this.errors.push("Phone é obrigatório");
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