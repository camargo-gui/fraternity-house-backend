import { PoolClient } from "pg";
import { AccompanimentDTO } from "accompaniment/DTO/accompaniment-dto";

export class AccompaninmentDAO {
  async create(client: PoolClient, accompaniment: AccompanimentDTO) {
    try {
      await client.query(
        "INSERT INTO \"Accompaniment\" (\"description\", \"employeeId\", \"residentId\", \"type\") VALUES ($1, $2, $3, $4)",
        [
          accompaniment.description,
          accompaniment.employeeId,
          accompaniment.residentId,
          accompaniment.type,
        ]
      );
      await client.query("COMMIT");
      console.log("query executada com sucesso");
    } catch (error) {
      console.error("Erro ao inserir acompanhamento:", error);
      throw error;
    }
  }

  async get(client: PoolClient) {
    const result = await client.query("SELECT * FROM \"Accompaniment\"");
    return result.rows;
  }

  async getAccompanimentByResId(client: PoolClient, residentId: number) {
    const result = await client.query("SELECT * FROM \"Accompaniment\" WHERE \"residentId\" = $1", [residentId]);
    return result.rows;
  }

  async getAccompanimentsByTypeAndId(client: PoolClient, type: string, id: number) {
    const result = await client.query(
      `SELECT a."date", e."name", a."description", a."updated_at", a."id"
      FROM "Accompaniment" a
      INNER JOIN "Employee" e ON a."employeeId" = e."id"
      WHERE a."type" = $1 AND a."residentId" = $2 AND e."id" = $3`,
      [type, id, id]
    );
    return result.rows;
  }

  async getAllResidentsHasAccompaniments(client: PoolClient, type: string) {
    console.log("Entrou aqui", type);
    const result = await client.query(
      `SELECT r."id", r."name" FROM "Resident" r
      INNER JOIN "Accompaniment" a ON r."id" = a."residentId"
      WHERE a."type" = $1
      GROUP BY r."id"`,
      [type]
    );
    return result.rows;
  }


  async updateAccompaniments(client: PoolClient, description: string, id: number) {
    try {
      await client.query(
        "UPDATE \"Accompaniment\" SET \"description\" = $1, \"updated_at\" = $2 WHERE \"id\" = $3",
        [
          description,
          new Date(),
          id,
        ]
      );
      await client.query("COMMIT");
      console.log("query executada com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar acompanhamento:", error);
      throw error;
    }
  }
}
