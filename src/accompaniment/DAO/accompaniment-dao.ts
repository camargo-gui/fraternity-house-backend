import { Pool } from "pg";
import { poolConexao } from "./../../client/postgres-client";
import { AccompanimentDTO } from "accompaniment/DTO/accompaniment-dto";

export class AccompaninmentDAO {
  private static instance: AccompaninmentDAO | null = null;
  private readonly client: Pool;

  constructor() {
    this.client = poolConexao.getInstance();
  }

  public static getInstance(): AccompaninmentDAO {
    if (!AccompaninmentDAO.instance) {
      AccompaninmentDAO.instance = new AccompaninmentDAO();
    }
    return AccompaninmentDAO.instance;
  }

  async create(accompaniment: AccompanimentDTO) {
    try {
      console.log("Acompanhamento: ", accompaniment);
      console.log("Conexão: ", this.client);
      await this.client.query(
        "INSERT INTO Accompaniment (description, employeeId, residentId, type) VALUES ($1, $2, $3, $4)",
        [
          accompaniment.description,
          accompaniment.employeeId,
          accompaniment.residentId,
          accompaniment.type,
        ]
      );
      await this.client.end();
      console.log("query executada com sucesso");
    } catch (error) {
      console.error("Erro ao inserir acompanhamento:", error);
      throw error;
    }
  }

  async get() {
    // Implementação para obter acompanhamentos
  }

  async getAccompanimentByResId() {
    // Implementação para obter acompanhamentos por ID de residente
  }

  async delete() {
    // Implementação para excluir acompanhamentos
  }
}
