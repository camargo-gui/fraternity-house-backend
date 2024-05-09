import { Prisma } from "@prisma/client";
import { Movimentation } from "movimentation-singleton/entities/movimentation";

export class MovimentationModelSing {
  private static instance: MovimentationModelSing | null = null;

  private constructor() {}

  public static getInstance(): MovimentationModelSing {
    if (!MovimentationModelSing.instance) {
      MovimentationModelSing.instance = new MovimentationModelSing();
    }
    return MovimentationModelSing.instance;
  }

  async create(
    movimentation: Movimentation,
    prisma: Prisma.TransactionClient
  ): Promise<void> {
    await prisma.movimentation.create({
      data: {
        type: movimentation.type,
        id_employee: movimentation.employee.id,
        ProductMovimentations: {
          create: movimentation.getProductList().map((product) => ({
            quantity: product.quantity,
            id_product: product.product.id,
          })),
        },
      },
    });
  }
}
