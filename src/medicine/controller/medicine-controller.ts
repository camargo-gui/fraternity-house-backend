import { Request, Response } from "express";
import { MedicineRequestParams } from "medicine/DTO/medicine-dto";
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
      const { name, pharmacologicalName, pharmacologicalForm } = req.query;
      const filters = {
        name,
        pharmacologicalName,
        pharmacologicalForm,
      };
      const medicines = await this.model.getAll(
        filters as MedicineRequestParams
      );
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
      const err = error as Error;
      if (
        err.message ===
        "Medicamento está vinculado a uma prescrição e não pode ser deletado."
      ) {
        return res.status(400).send({ message: [err.message] });
      }
      return res.status(500).send();
    }
  };
}
