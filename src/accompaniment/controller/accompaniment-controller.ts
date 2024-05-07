import { AccompanimentModel } from "accompaniment/model/accompaniment-model";
import { Request, Response } from "express";

export class AccompanimentController {
  private static instance: AccompanimentController;
  private model: AccompanimentModel;

  private constructor() {
    this.model = AccompanimentModel.getInstance();
  }

  public static getInstance(): AccompanimentController {
    if (!this.instance) {
      this.instance = new AccompanimentController();
    }
    return this.instance;
  }

  create = async (req: Request, res: Response) => {
    try {
      const { description, employeeId, residentId, type } = req.body;

      await this.model.create({
        description,
        employeeId,
        residentId,
        type,
      });

      return res
        .status(201)
        .send({ message: ["Acompanhamento criado com sucesso!"] });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: ["Erro do servidor!", err] });
    }
  };

  async get() {
    // get accompaniment
  }

  async getAccompanimentByResId() {
    // get accompaniment by resident id
  }

  async delete() {
    // delete accompaniment
  }
}
