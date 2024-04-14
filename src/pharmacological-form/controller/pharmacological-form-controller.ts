import { Request, Response } from "express";
import { PharmacologicalFormModel } from "pharmacological-form/model/pharmacological-form-model";

export class PharmacologicalFormController {
  private model = new PharmacologicalFormModel();

  public create = async (req: Request, res: Response) => {
    try {
      const pharmacologicalForm = req.body;
      const createdPharmacologicalForm = await this.model.create(pharmacologicalForm);
      return res.status(201).send(createdPharmacologicalForm);
    } catch (error) {
      return res.status(500).send();
    }
  };

  public getAll = async (req: Request, res: Response) => {
    try {
      const pharmacologicalForms = await this.model.getAll();
      return res.status(200).json({ pharmacologicalForms: pharmacologicalForms });
    } catch (error) {
      return res.status(500).send();
    }
  };

  public update = async (req: Request, res: Response) => {
    try {
      const pharmacologicalForm = req.body;
      const updatedPharmacologicalForm = await this.model.update(pharmacologicalForm);
      return res.status(200).send(updatedPharmacologicalForm);
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
