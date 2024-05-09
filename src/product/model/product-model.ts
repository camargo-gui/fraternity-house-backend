import { Prisma, PrismaClient } from "@prisma/client";
import { MovimentationType } from "movimentation-singleton/entities/movimentation";
import { ProductDTO } from "product/DTO/product-dto";

export class ProductModel {

  private prismaClient = new PrismaClient();

  create = async (product: ProductDTO) => {
    return this.prismaClient.product.create({
      data: { 
        ...product,
        quantity: 0,
        name: product.name ?? "",
      }
    });
  };

  updateStock = async (prismaClient: Prisma.TransactionClient,id: number, quantity: number, type: MovimentationType) => {
    return prismaClient.product.update({
      where: {
        id
      },
      data: {
        quantity: {
          [type === MovimentationType.OUTPUT ? "decrement" : "increment"]: quantity
        }
      }
    });
  };

  getStock = async () => {
    return this.prismaClient.product.findMany({
      where: {
        quantity:{
          gt: 0
        },
      },
      orderBy: {
        name: "asc"
      },
    });
  };

  getById = async (id: number) => {
    return this.prismaClient.product.findUnique({
      where: {
        id
      }
    });
  };

  getAll = async () => {
    return this.prismaClient.product.findMany({
      orderBy: {
        name: "asc"
      }
    });
  };
}