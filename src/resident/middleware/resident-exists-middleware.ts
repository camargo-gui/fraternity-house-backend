import {Request, Response, NextFunction } from "express";
import { ResidentModel } from "resident/model/resident-model";

export class ResidentExistsMiddleware{

  private model = new ResidentModel();

  execute = async (req: Request, res: Response, next: NextFunction) => {
    const { cpf } = req.params;
    const resident = await this.model.getByCpf(cpf);
    console.log(resident);
    if(!resident){
      return res.status(404).json({error: "Resident not found"});
    }
    next();
  };
}