import { Prisma } from "@prisma/client";
import { Movimentation } from "movimentation-singleton/entities/movimentation";

export class MovimentationModel {
  async create(
    movimentation: Movimentation,
    prisma: Prisma.TransactionClient
  ): Promise<void> {
    await prisma.movimentation.create({
      data: {
        type: movimentation.type,
        id_employee: movimentation.employee.id,
        ProductMovimentations: {
          create: movimentation.getProductMovimentations().map((product) => ({
            quantity: product.quantity,
            id_product: product.product.id,
          })),
        },
      },
    });
  }
}
