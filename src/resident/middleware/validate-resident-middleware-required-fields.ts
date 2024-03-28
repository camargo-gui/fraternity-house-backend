import {Request, Response, NextFunction } from "express";

/* eslint-disable @typescript-eslint/no-explicit-any */
export class ValidateResidentMiddlewareRequiredFields{

  private errors: string[] = [];

  requiredFields = async (resident: any) => {
    if (!resident.name) {
      this.errors.push("Campo nome é obrigatório!");
    }
    if (!resident.cpf) {
      this.errors.push("Campo CPF é obrigatório!");
    }
    if (!resident.contact_phone) {
      this.errors.push("Campo telefone é obrigatório!");
    }
    if (!resident.birthday) {
      this.errors.push("Campo data de nascimento é obrigatório!");
    }
    if (!resident.rg) {
      this.errors.push("Campo RG é obrigatório!");
    }
  };

  execute = async (req: Request, res: Response, next: NextFunction) => {
    try{
      this.errors = [];
      const resident = req.body;
      await this.requiredFields(resident);
      if(this.errors.length > 0){
        return res.status(400).json({message: this.errors});
      }
      next();
    } catch (error) {
      return res.status(500).send();
    }
  };
}