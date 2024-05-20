import { ResidentModel } from "resident/model/resident-model";
import {Request, Response, NextFunction } from "express";

export class ValidateResidentMiddlewareAlreadyExists{
  private model = new ResidentModel();

  private errors: string[] = [];

  execute = async (req: Request, res: Response, next: NextFunction) => {
    try{
      const cpf = req.body.cpf;
      const resident = await this.model.getByCpf(cpf);
      if(resident) {
        if (resident.status === "INACTIVE") {
          return res.status(409).send({resident: resident});
        }

        return res.status(400).send({message: ["Morador já cadastrado!"]});
      }
      next();
    } catch (error) {
      return res.status(500).send();
    }
  };
}