import { AccompanimentDTO } from "./../DTO/accompaniment-dto";
import { AccompaninmentDAO } from "accompaniment/DAO/accompaniment-dao";

export class AccompanimentModel {
  private static instance: AccompanimentModel;

  private constructor() {}

  public static getInstance(): AccompanimentModel {
    if (!AccompanimentModel.instance) {
      AccompanimentModel.instance = new AccompanimentModel();
    }
    return AccompanimentModel.instance;
  }

  async create(accompaniment: AccompanimentDTO) {
    const accompanimentDAO = new AccompaninmentDAO();
    return await accompanimentDAO.create(accompaniment);
  }

  async get() {}

  async getAccompanimentByResId() {
    const accompanimentDAO = new AccompaninmentDAO();
    return await accompanimentDAO.getAccompanimentByResId();
  }

  async delete() {
    const accompanimentDAO = new AccompaninmentDAO();
    return await accompanimentDAO.delete();
  }
}
