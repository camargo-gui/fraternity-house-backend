import { PrismaClient } from "@prisma/client";

export class IllnessesModel {
  private prisma = new PrismaClient();

  getAll = async () => {
    return await this.prisma.illnesses.findMany({
      select: {
        id: true,
        name: true,
      }
    });
  };
}