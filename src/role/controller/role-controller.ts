import { RoleModel } from "#/role/model/role-model";
import { Request, Response } from "express";

export class RoleController {
  private model = new RoleModel();

  create = async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      const role = await this.model.create(name);
      return res.status(201).send(role);
    } catch (error) {
      return res.status(500).send();
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const roles = await this.model.getAll();
      return res.status(200).json({ roles: roles });
    } catch (error) {
      return res.status(500).send();
    }
  };
}
