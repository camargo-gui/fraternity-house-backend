import { Request, Response } from "express";
import { PharmacologicalNameModel } from "pharmacological-name/model/pharmacological-name-model";

export class PharmacologicalNameController {
  private model = new PharmacologicalNameModel();

  public create = async (req: Request, res: Response) => {
    try {
      const pharmacologicalName = req.body;
      const createdPharmacologicalName = await this.model.create(pharmacologicalName);
      return res.status(201).send(createdPharmacologicalName);
    } catch (error) {
      return res.status(500).send();
    }
  };

  public getAll = async (req: Request, res: Response) => {
    try {
      const pharmacologicalNames = await this.model.getAll();
      return res.status(200).json({ pharmacologicalNames: pharmacologicalNames });
    } catch (error) {
      return res.status(500).send();
    }
  };

  public update = async (req: Request, res: Response) => {
    try {
      const pharmacologicalName = req.body;
      const updatedPharmacologicalName = await this.model.update(pharmacologicalName);
      return res.status(200).send(updatedPharmacologicalName);
    } catch (error) {
      return res.status(500).send();
    }
  };

  public delete = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      await this.model.delete(id);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).send();
    }
  };
}
