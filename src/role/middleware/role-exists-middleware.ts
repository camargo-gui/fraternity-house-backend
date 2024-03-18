import { NextFunction, Request, Response } from "express";
import { RoleModel } from "role/model/role-model";

export class RoleExistsMiddleware {

  private model = new RoleModel();

  execute = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({ message: "Name is required" });
      }
      const role = await this.model.getByName(name);
      if (role) {
        return res.status(400).json({ message: "Role already exists" });
      }
      next();
    } catch (error) {
      return res.status(500).send();
    }
  };
}