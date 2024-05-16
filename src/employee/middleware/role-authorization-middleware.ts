import assert from "assert";
import { AuthRequest } from "common/entities/auth-request";
import { Response, NextFunction } from "express";

export class RoleAuthorizationMiddleware {
  private allowedRoles: number[];

  constructor(...allowedRoles: number[]) {
    this.allowedRoles = allowedRoles;
  }

  execute = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const employeeId = req.id;
      const roleId = req.role;
      assert(employeeId, "Id do funcionário não encontrado na requisição");
      assert(roleId, "Role do funcionário não encontrado na requisição");

      if (!this.allowedRoles.includes(roleId)) {
        return res.status(403).json({
          message:
            ["Acesso negado: você não tem permissão para realizar esta ação."],
        });
      }

      next();
    } catch (error) {
      console.error("RoleAuthorizationMiddleware error:", error);
      return res.status(500).json({ message: "Erro interno no servidor" });
    }
  };
}
