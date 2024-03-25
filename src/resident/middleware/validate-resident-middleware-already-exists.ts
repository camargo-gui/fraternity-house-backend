import { ResidentModel } from "resident/model/resident-model";
import {Request, Response, NextFunction } from "express";

export class ValidateResidentMiddlewareAlreadyExists{
  private model = new ResidentModel();

  private errors: string[] = [];

  alreadyExists = async (cpf: string) => {
    const resident = await this.model.getByCpf(cpf);
    if (resident) {
      this.errors.push("Morador já existe!");
    }
  };

  execute = async (req: Request, res: Response, next: NextFunction) => {
    try{
      this.errors = [];
      const cpf = req.body.cpf;
      await this.alreadyExists(cpf);
      if(this.errors.length > 0){
        return res.status(400).json({message: this.errors});
      }
      next();
    } catch (error) {
      return res.status(500).send();
    }
  };
}