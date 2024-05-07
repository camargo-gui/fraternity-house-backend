import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const postgresUrl = process.env.DATABASE_URL;

export class poolConexao {
  private static instance: Pool | null = null;

  private constructor() {
    poolConexao.instance = new Pool({
      connectionString: postgresUrl,
    });
  }

  public static getInstance(): Pool {
    if (!poolConexao.instance) {
      new poolConexao();
    }
    return poolConexao.instance!;
  }
}
