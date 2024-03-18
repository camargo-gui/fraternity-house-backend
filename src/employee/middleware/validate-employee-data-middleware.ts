import { EmployeeModel } from "employee/model/employee-model";
import { NextFunction, Request, Response } from "express";

export class ValidateEmployeeDataMiddleware {

  private model = new EmployeeModel();

  private errors: string[] = [];

  alreadyExists = async (document: string) => {
    const employee = await this.model.getByDocument(document);
    if (employee) {
      this.errors.push("Employee already exists");
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  requiredFields = (employee: any) => {
    console.log(employee);
    if (!employee.document) {
      this.errors.push("Document is required");
    }
    if (!employee.name) {
      this.errors.push("Name is required");
    }
    if (!employee.email) {
      this.errors.push("Email is required");
    }
    if (!employee.role_id) {
      this.errors.push("Role is required");
    }
    if (!employee.phone) {
      this.errors.push("Phone is required");
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