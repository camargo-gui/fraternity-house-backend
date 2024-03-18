import { Request, Response } from "express";
import { ResidentModel } from "resident/model/resident-model";

export class ResidentController{

  private model = new ResidentModel();

  create = async (req: Request, res: Response) => {
    try {
      const {   
        cpf,
        rg,
        name,
        contact_phone,
        birthday
      } = req.body;

      if(!cpf || !rg || !name || !contact_phone || !birthday) {
        return res.status(400).json({error: "Invalid data"});
      }

      const residentExists = await this.model.getByCpf(cpf);
      if(residentExists){
        return res.status(400).json({error: "Resident already exists"});
      }

      await this.model.create({
        cpf,
        rg,
        name,
        contact_phone,
        birthday: new Date(birthday)
      });

      return res.status(201).json({error: "Resident created"});
    }
    catch(e) {
      return res.status(500).json({error: "Error to create resident"});
    }
  };

  update = async (req: Request, res: Response) => {
    try{      
      const resident = req.body;
      await this.model.update(resident);
      return res.status(201).send();
      
    }
    catch(e){
      return res.status(500).json({error: "Error to update resident"});
    }
  };

  delete = async (req: Request, res: Response) => {
    try { 
      const { cpf } = req.params;
      await this.model.deleteByCpf(cpf);
      return res.status(201).send();
    }
    catch(e) {
      return res.status(500).json({error: "Error to delete resident"});
    }
  };

  getAll = async (req: Request, res: Response) => {
    try{
      const residents = await this.model.getAll();
      return res.status(201).send({
        residents
      });
    }
    catch(e){
      return res.status(500).send({error: "Error to search residents"});
    }
  };

  getByCpf = async (req: Request, res: Response) => {
    try{
      const { cpf } = req.params;
      const resident = await this.model.getByCpf(cpf);
      return res.status(201).send({
        resident
      });
    }
    catch(e){
      return res.status(500).send({error: "Error to search resident"});
    }
  };
}