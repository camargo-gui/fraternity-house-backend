import { Prisma, PrismaClient } from "@prisma/client";
import { MovimentationDTO } from "movimentation/DTO/movimentation-dto";

export class MovimentationModel {

  private prismaClient = new PrismaClient();

  create = async (prismaClient: Prisma.TransactionClient, movimentation: MovimentationDTO) => {
    return prismaClient.movimentation.create({
      data: movimentation
    });
  };

  getMovimentations = async () => {
    return this.prismaClient.movimentation.findMany({
      orderBy: {
        created_at: "desc"
      }
    });
  };
}