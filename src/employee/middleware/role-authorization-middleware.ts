/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthRequest } from "#/common/entities/auth-request";
import assert from "assert";
import { NextFunction, Response } from "express";

export class RoleAuthorizationMiddleware {
  private allowedRoles: number[];

  constructor(...allowedRoles: number[]) {
    this.allowedRoles = allowedRoles;
  }

  execute = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const route = req.baseUrl;
      const employeeId = req.id;
      const roleId = req.role;
      assert(employeeId, "Id do funcionário não encontrado na requisição");
      assert(roleId, "Role do funcionário não encontrado na requisição");

      if (this.isAccompanimentRoute(route)) {
        const type = req.body.type;

        if (!type) {
          return res.status(400).json({ message: ["Type não informado"] });
        }

        if (!this.verifyAccompanimentType(type, roleId)) {
          return res.status(403).json({
            message:
              ["Acesso negado: você não tem permissão para realizar esta ação."],
          });
        }
      } else {
        if (!this.checkRoleAuthorization(roleId)) {
          return res.status(403).json({
            message:
              ["Acesso negado: você não tem permissão para realizar esta ação."],
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

  private verifyAccompanimentType(type: string, role: number) {
    if (type === "PSYCHOLOGIST" && role !== 4) {
      return false;
    }

    if (type === "NUTRITIONIST" && role !== 3) {
      return false;
    }

    if (type === "PHYSIOTHERAPIST" && role !== 5) {
      return false;
    }

    return true;
  }

  private checkRoleAuthorization(role: number) {
    if (!this.allowedRoles.includes(role)) {
      return false;
    }
    return true;
  }
}
