import { EmployeeModel } from "employee/model/employee-model";
import { NextFunction, Request, Response } from "express";

export class ValidateEmployeeDataMiddleware {

  private model = new EmployeeModel();

  private errors: string[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private requiredFields = (employee: any) => {
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

  public validateRequiredFields = (req: Request, res: Response, next: NextFunction) => {
    try {
      this.errors = [];
      this.requiredFields(req.body);
      if (this.errors.length > 0) {
        return res.status(400).json({ message: this.errors });
      }
      next();
    } catch (error) {
      console.log(error); 
      return res.status(500).send({ message: ["Falha"]});
    }
  };


  public validateEmployeeExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employee = req.body;
      const employeeExists = await this.model.getByDocument(employee.document);
      if (employeeExists) {
        if (employeeExists.status === "INACTIVE") {
          return res.status(409).send({employee: employeeExists});
        }
        return res.status(400).send({message: "Funcionário já está ativo"});
      }
      next();
    } catch (error) {
      return res.status(500).send();
    }
  };
}