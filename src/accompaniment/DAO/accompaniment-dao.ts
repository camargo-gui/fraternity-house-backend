import { AccompanimentDTO } from "#/accompaniment/DTO/accompaniment-dto";
import { PoolClient } from "pg";

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
      client.release();
    } catch (error) {
      console.error("Erro ao inserir acompanhamento:", error);
      throw error;
    }
  }

  async get(client: PoolClient) {
    const result = await client.query("SELECT * FROM \"Accompaniment\"");
    client.release();
    return result.rows;
  }

  async getAccompanimentByResId(client: PoolClient, residentId: number) {
    const result = await client.query("SELECT * FROM \"Accompaniment\" WHERE \"residentId\" = $1", [residentId]);
    client.release();
    return result.rows;
  }

  async getAccompanimentsByTypeAndId(client: PoolClient, type: string, id: number) {
    const result = await client.query(
      `SELECT a."date", e."name", a."description", a."updated_at", a."id", r."name" as "residentName"
      FROM "Accompaniment" a
      INNER JOIN "Employee" e ON a."employeeId" = e."id"
      INNER JOIN "Resident" r ON a."residentId" = r."id"
      WHERE a."type" = $1 AND a."residentId" = $2`,
      [type, id]
    );
    client.release();
    return result.rows;
  }


  async getAllResidentsHasAccompaniments(client: PoolClient, type: string) {
    const result = await client.query(
      `SELECT r."id", r."name" as "residentName", r."psychologicalStatus",
      r."nutritionistStatus", r."physicalStatus" FROM "Resident" r
      INNER JOIN "Accompaniment" a ON r."id" = a."residentId"
      WHERE a."type" = $1 AND r."status" = 'ACTIVE'
      GROUP BY r."id"`,
      [type]
    );
    client.release();
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
      client.release();
    } catch (error) {
      console.error("Erro ao atualizar acompanhamento:", error);
      throw error;
    }
  }
}
