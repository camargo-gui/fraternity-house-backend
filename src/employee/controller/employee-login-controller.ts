import { JWT } from "common/entities/jwt";
import { Password } from "common/entities/password";
import { EmployeeModel } from "employee/model/employee-model";
import { Request, Response } from "express";

export class EmployeeLoginController {

  private model = new EmployeeModel();

  private jwt = new JWT();

  login = async (req: Request, res: Response) => {
    try {
      const { cpf, password } = req.body;
      if (!cpf || !password) {
        return res.status(400).json({ error: "CPF and password are required" });
      }
      const employee = await this.model.getByDocument(cpf);
      if (!employee) {
        return res.status(404).json({ error: "Employee not found" });
      }
      const validatePassword = new Password(password).compare(employee.password);
      if (!validatePassword) {
        return res.status(401).json({ error: "Invalid password" });
      }
      else {
        const token = this.jwt.generate(employee.id, employee.role_id);
        return res.status(200).json({ token });
      }
    }
    catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
}