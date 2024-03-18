import { prismaClient } from "client/prisma-client";

export class RoleModel {

  create = async (name: string) => {
    return prismaClient.role.create({
      data: {
        name: name
      }
    });
  };

  getAll = async () => {
    return prismaClient.role.findMany();
  };

  getByName = async (name: string) => {
    return prismaClient.role.findFirst({
      where: {
        name: name
      }
    });
  };
}