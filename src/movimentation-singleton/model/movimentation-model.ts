import { Movimentation } from "#/movimentation-singleton/entities/movimentation";
import { Prisma, PrismaClient } from "@prisma/client";

export class MovimentationModel {
  private prismaClient = new PrismaClient();

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

  getMovimentations = async () => {
    return await this.prismaClient.movimentation.findMany({
      include: {
        ProductMovimentations: {
          include: {
            Product: {
              select: {
                name: true,
                measurement: true,
              },
            },
          },
        },
        Employee: {
          select: {
            name: true,
          },
        },
      },
    });
  };
}
