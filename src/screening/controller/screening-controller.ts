import { ResidentModel } from "#/resident/model/resident-model";
import { ScreeningDTO } from "#/screening/DTO/screening-dto";
import { ScreeningModel } from "#/screening/model/screening-model";
import { Request, Response } from "express";

export class ScreeningController {
  private screeningModel = new ScreeningModel(); 
  private residentModel = new ResidentModel();

  create = async (req: Request, res: Response) => {
    try {
      const screening: ScreeningDTO = req.body.screening;
      await this.screeningModel.create(screening);
      await this.residentModel.registerScreening(screening.id_resident);
      res.status(201).send();
    } catch (error) {
      res.status(500).json({ message: [error] });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const screening: ScreeningDTO = req.body.screening;
      await this.screeningModel.update(screening);
      res.status(200).send();
    } catch (error) {
      res.status(500).json({ message: [error] });
    }
  };

  getByResident = async (req: Request, res: Response) => {
    try {
      const id_resident = Number(req.params.id_resident);
      if(!id_resident) return res.status(400).json({ message: ["Resident ID is required"] });
      const screening = await this.screeningModel.getByResident(id_resident);
      if(!screening) return res.status(200).send();
      res.status(200).json(screening);
    } catch (error) {
      res.status(500).json({ message: [error] });
    }
  };

}