import { Request, Response } from "express";
import { ScreeningDTO } from "screening/DTO/screening-dto";
import { DefaultScreeningResponse } from "screening/controller/response/default-screening-response";
import { ScreeningModel } from "screening/model/screening-model";

export class ScreeningController {
  private screeningModel = new ScreeningModel(); 

  create = async (req: Request, res: Response) => {
    try {
      const screening: ScreeningDTO = req.body.screening;
      const createdScreening = await this.screeningModel.create(screening);
      res.status(201).json(createdScreening);
    } catch (error) {
      console.log("error ", error);
      res.status(500).json({ message: [error] });
    }
  };

  getByResident = async (req: Request, res: Response) => {
    try {
      const id_resident = Number(req.params.id_resident);
      if(!id_resident) return res.status(400).json({ message: ["Resident ID is required"] });
      const screening = await this.screeningModel.getByResident(id_resident);
      if(!screening) return res.status(200).json({ screening: DefaultScreeningResponse });
      res.status(200).json(screening);
    } catch (error) {
      res.status(500).json({ message: [error] });
    }
  };

}