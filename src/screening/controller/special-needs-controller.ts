import { SpecialNeedsModel } from "#/screening/model/special-needs-model";
import { Request, Response } from "express";

export class SpecialNeedsController {
  private model = new SpecialNeedsModel();

  getAll = async (req: Request, res: Response) => {
    try {
      const specialNeeds = await this.model.getAll();
      return res.status(200).json(specialNeeds);
    } catch (e) {
      return res.status(500).json({ message: ["Erro ao buscar necessidades especiais"] });
    }
  };
}