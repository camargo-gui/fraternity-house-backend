import { Prisma } from "@prisma/client";
import { MovimentationType } from "movimentation-singleton/entities/movimentation";

export class ProductModel {
  getById = async (id: number, prisma: Prisma.TransactionClient) => {
    return prisma.product.findUnique({
      where: {
        id,
      },
    });
  };

  updateStock = async (
    id: number,
    quantity: number,
    type: MovimentationType,
    prismaClient: Prisma.TransactionClient
  ) => {
    return prismaClient.product.update({
      where: {
        id,
      },
      data: {
        quantity: {
          [type === MovimentationType.OUTPUT ? "decrement" : "increment"]:
            quantity,
        },
      },
    });
  };
}
