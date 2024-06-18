import { AccompanimentModel } from "#/accompaniment/model/accompaniment-model";
import { poolConexao } from "#/client/postgres-client";
import { AuthRequest } from "#/common/entities/auth-request";
import { ResidentModel } from "#/resident/model/resident-model";
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

  create = async (req: AuthRequest, res: Response) => {
    try {
      const { description, residentId, type, accompanimentStatus } = req.body;
      const client = await poolConexao.getInstance().connect();

      console.log("Status: ", accompanimentStatus);

      await client.query("BEGIN");

      if(type === "PHYSIOTHERAPIST") {
        await new ResidentModel().updatePhysicalStatus(residentId, accompanimentStatus);
      } else if(type === "PSYCHOLOGIST") {
        await new ResidentModel().updatePhysicologicalStatus(residentId, accompanimentStatus);
      }
      else{
        await new ResidentModel().updateNutritionistStatus(residentId, accompanimentStatus);
      }

      await this.model.create(client, {
        description,
        employeeId: req.id ?? 0,
        residentId,
        type,
      });

      return res
        .status(201)
        .send({ message: ["Acompanhamento criado com sucesso!"] });
    } catch (err) {
      return res.status(500).send({ message: ["Erro do servidor!", err] });
    }
  };

  get = async (req: AuthRequest, res: Response) => {
    try {
      const { type, residentId } = req.query;
      const client = await poolConexao.getInstance().connect();
      let accompaniments = [];

      if (!type && !residentId) {
        return res
          .status(400)
          .send({ message: ["Tipo de acompanhamento não informado!"] });
      } else if (type && residentId) {
        accompaniments = await this.model.getAccompanimentsByTypeAndId(
          client,
          type as string,
          parseInt(residentId as string)
        );
      }

      return res.status(200).json(accompaniments);
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .send({ message: ["Erro ao recuperar acompanhamentos!"] });
    }
  };

  getAllResidentsHasAccompaniments = async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const { type } = req.query;
      const client = await poolConexao.getInstance().connect();
      const accompaniments = await this.model.getAllResidentsHasAccompaniments(
        client,
        type as string
      );

      return res.status(200).json(accompaniments);
    } catch (err) {
      return res
        .status(500)
        .send({ message: ["Erro ao recuperar acompanhamentos!"] });
    }
  };

  updateAccompaniments = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const { description } = req.body;
      const client = await poolConexao.getInstance().connect();
      await client.query("BEGIN");
      await this.model.updateAccompaniments(client, description, Number(id));

      return res
        .status(200)
        .send({ message: ["Acompanhamento atualizado com sucesso!"] });
    } catch (err) {
      return res.status(500).send({ message: ["Erro do servidor!"] });
    }
  };
}
