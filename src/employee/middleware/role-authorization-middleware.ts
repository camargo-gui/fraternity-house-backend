import assert from "assert";
import { AuthRequest } from "common/entities/auth-request";
import { EmployeeModel } from "employee/model/employee-model";
import { Response, NextFunction } from "express";

export class RoleAuthorizationMiddleware {
  private allowedRoles: number[];
  private employeeModel = new EmployeeModel();

  constructor(...allowedRoles: number[]) {
    this.allowedRoles = allowedRoles;
  }

  execute = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const employeeId = req.id;
      assert(employeeId, "Id do funcionário não encontrado na requisição");

      const employee = await this.employeeModel.getById(employeeId);
      if (!this.allowedRoles.includes(Number(employee?.Role.id))) {
        return res.status(403).json({
          message:
            "Acesso negado: você não tem permissão para realizar esta ação.",
        });
      }

      next();
    } catch (error) {
      console.error("RoleAuthorizationMiddleware error:", error);
      return res.status(500).json({ message: "Erro interno no servidor" });
    }
  };
}
