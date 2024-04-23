import { Prisma, PrismaClient } from "@prisma/client";

export class ProductMovimentationModel {

  private prismaClient = new PrismaClient();

  create = async (prismaClient: Prisma.TransactionClient, id_movimentation: number, id_product: number, quantity: number) => {
    return prismaClient.productMovimentation.create({
      data: {
        id_product,
        id_movimentation,
        quantity
      }
    });
  };
  getMovimentations = async (id: number) => {
    return this.prismaClient.productMovimentation.findMany({
      where: {
        id_movimentation: id
      }
    });
  };
}