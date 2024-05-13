/* eslint-disable @typescript-eslint/no-explicit-any */
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
      const route = req.baseUrl;
      const employeeId = req.id;
      assert(employeeId, "Id do funcionário não encontrado na requisição");

      const employee = await this.employeeModel.getById(employeeId);

      if (this.isAccompanimentRoute(route)) {
        const type = req.body.type;

        if (!type) {
          return res.status(400).json({ message: "Type não informado" });
        }

        if (!this.verifyAccompanimentType(type, employee)) {
          return res.status(403).json({
            message:
              "Acesso negado: você não tem permissão para realizar esta ação.",
          });
        }
      } else {
        if (!this.checkRoleAuthorization(employee)) {
          return res.status(403).json({
            message:
              "Acesso negado: você não tem permissão para realizar esta ação.",
          });
        }
      }

      next();
    } catch (error) {
      console.error("RoleAuthorizationMiddleware error:", error);
      return res.status(500).json({ message: "Erro interno no servidor" });
    }
  };

  private isAccompanimentRoute(route: string) {
    return route === "/accompaniment";
  }

  private verifyAccompanimentType(type: string, employee: any) {
    if (type === "PSYCHOLOGIST" && employee?.Role.id !== 4) {
      return false;
    }

    if (type === "NUTRITIONIST" && employee?.Role.id !== 3) {
      return false;
    }

    if (type === "PHYSIOTHERAPIST" && employee?.Role.id !== 5) {
      return false;
    }

    return true;
  }

  private checkRoleAuthorization(employee: any) {
    if (!this.allowedRoles.includes(Number(employee?.Role.id))) {
      return false;
    }
    return true;
  }
}
