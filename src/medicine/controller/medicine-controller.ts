import { Request, Response } from "express";
import { MedicineModel } from "medicine/model/medicine-model";

export class MedicineController {
  private model = new MedicineModel();

  public create = async (req: Request, res: Response) => {
    try {
      const medicine = req.body;
      const createdMedicine = await this.model.create(medicine);
      return res.status(201).send(createdMedicine);
    } catch (error) {
      return res.status(500).send();
    }
  };

  public getAll = async (req: Request, res: Response) => {
    try {
      const medicines = await this.model.getAll();
      return res.status(200).json({ medicines: medicines });
    } catch (error) {
      return res.status(500).send();
    }
  };

  public update = async (req: Request, res: Response) => {
    try {
      const medicine = req.body;
      const updatedMedicine = await this.model.update(medicine);
      return res.status(200).send(updatedMedicine);
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
