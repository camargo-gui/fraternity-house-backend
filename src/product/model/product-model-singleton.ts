import { Prisma } from "@prisma/client";
import { MovimentationType } from "movimentation/DTO/movimentation-dto";

export class ProductModelSing {
  private static instance: ProductModelSing | null = null;

  private constructor() {}

  public static getInstance(): ProductModelSing {
    if (!ProductModelSing.instance) {
      ProductModelSing.instance = new ProductModelSing();
    }
    return ProductModelSing.instance;
  }

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
    prismaClient: Prisma.TransactionClient,
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
