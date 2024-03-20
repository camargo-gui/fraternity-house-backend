import { prismaClient } from "client/prisma-client";
import { PharmalogicalNameDTO } from "pharmacological-name/DTO/pharmacological-name-dto";

export class PharmacologicalNameModel {
  create = (pharmacologicalName: PharmalogicalNameDTO) => {
    return prismaClient.pharmacologicalName.create({
      data: pharmacologicalName,
    });
  };

  getAll = () => {
    return prismaClient.pharmacologicalName.findMany();
  };

  getById = (id: number) => {
    return prismaClient.pharmacologicalName.findFirst({
      where: {
        id: id,
      },
    });
  };

  update = (pharmacologicalName: PharmalogicalNameDTO) => {
    return prismaClient.pharmacologicalName.update({
      where: {
        id: pharmacologicalName.id,
      },
      data: pharmacologicalName,
    });
  };

  delete = (id: number) => {
    return prismaClient.medicine.delete({
      where: {
        id: id,
      },
    });
  };
}
