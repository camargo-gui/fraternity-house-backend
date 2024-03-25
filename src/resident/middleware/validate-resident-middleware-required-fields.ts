import {Request, Response, NextFunction } from "express";

/* eslint-disable @typescript-eslint/no-explicit-any */
export class ValidateResidentMiddlewareRequiredFields{

  private errors: string[] = [];

  requiredFields = async (resident: any) => {
    if (!resident.name) {
      this.errors.push("Name is required");
    }
    if (!resident.cpf) {
      this.errors.push("CPF is required");
    }
    if (!resident.contact_phone) {
      this.errors.push("Phone is required");
    }
    if (!resident.birthday) {
      this.errors.push("Birthdate is required");
    }
    if (!resident.rg) {
      this.errors.push("RG is required");
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