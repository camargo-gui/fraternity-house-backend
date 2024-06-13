import { AccompaninmentDAO } from "#/accompaniment/DAO/accompaniment-dao";
import { PoolClient } from "pg";
import { AccompanimentDTO } from "./../DTO/accompaniment-dto";

export class AccompanimentModel {
  private static instance: AccompanimentModel;

  private constructor() {}

  public static getInstance(): AccompanimentModel {
    if (!AccompanimentModel.instance) {
      AccompanimentModel.instance = new AccompanimentModel();
    }
    return AccompanimentModel.instance;
  }

  async create(client: PoolClient, accompaniment: AccompanimentDTO) {
    const accompanimentDAO = new AccompaninmentDAO();
    return await accompanimentDAO.create(client, accompaniment);
  }

  async get(client: PoolClient) {
    const accompanimentDAO = new AccompaninmentDAO();
    return await accompanimentDAO.get(client);
  }

  async getAccompanimentByResId(client: PoolClient, residentId: number) {
    const accompanimentDAO = new AccompaninmentDAO();
    return await accompanimentDAO.getAccompanimentByResId(client, residentId);
  }

  async getAccompanimentsByTypeAndId(client: PoolClient, type: string, id: number) {
    const accompanimentDAO = new AccompaninmentDAO();
    return await accompanimentDAO.getAccompanimentsByTypeAndId(client, type, id);
  }

  async getAllResidentsHasAccompaniments(client: PoolClient, type: string) {
    const accompanimentDAO = new AccompaninmentDAO();
    return await accompanimentDAO.getAllResidentsHasAccompaniments(client, type);
  }

  async updateAccompaniments(client: PoolClient, description: string, id: number) {
    const accompanimentDAO = new AccompaninmentDAO();
    return await accompanimentDAO.updateAccompaniments(client, description, id);
  }
}
