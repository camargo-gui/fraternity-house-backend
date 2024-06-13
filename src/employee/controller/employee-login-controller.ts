import { JWT } from "#/common/entities/jwt";
import { Password } from "#/common/entities/password";
import { EmployeeModel } from "#/employee/model/employee-model";
import { Request, Response } from "express";

export class EmployeeLoginController {
  private model = new EmployeeModel();

  private jwt = new JWT();

  login = async (req: Request, res: Response) => {
    try {
      const { cpf, password } = req.body;
      if (!cpf || !password) {
        return res
          .status(400)
          .json({ message: ["CPF e Senha são obrigatórios"] });
      }
      const employee = await this.model.getByDocument(cpf);
      if (!employee) {
        return res
          .status(404)
          .json({ message: ["Funcionário não encontrado"] });
      }
      const validatePassword = new Password(password).compare(
        employee.password
      );
      if (!validatePassword) {
        return res.status(401).json({ message: ["Senha inválida"] });
      } else {
        const token = this.jwt.generate(employee.id, employee.role_id);
        return res
          .status(200)
          .json({ token, name: employee.name, role: employee.Role.name });
      }
    } catch (error) {
      return res.status(500).json({ mesage: ["Erro interno"] });
    }
  };
}
