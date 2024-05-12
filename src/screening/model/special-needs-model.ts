import { PrismaClient } from "@prisma/client";

export class SpecialNeedsModel {
  private prisma = new PrismaClient();

  getAll = async () => {
    return await this.prisma.specialNeeds.findMany({
      select: {
        id: true,
        name: true,
      }
    });
  };
}