import { IllnessesModel } from "#/screening/model/illnesses-model";
import { Request, Response } from "express";

export class IllnessesController {

  private model = new IllnessesModel();

  getAll = async (req: Request ,res: Response) => {
    try {
      const illnesses = await this.model.getAll();
      res.status(200).json(illnesses);
    } catch (error) {
      res.status(500).json({ message: ["Erro no servidor"] });
    }
  };
}