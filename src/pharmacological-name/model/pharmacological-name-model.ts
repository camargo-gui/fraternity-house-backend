import { PrismaClient } from "@prisma/client";
import { PharmalogicalNameDTO } from "pharmacological-name/DTO/pharmacological-name-dto";

export class PharmacologicalNameModel {
  private prismaClient = new PrismaClient();

  create = (pharmacologicalName: PharmalogicalNameDTO) => {
    return this.prismaClient.pharmacologicalName.create({
      data: pharmacologicalName,
    });
  };

  getAll = () => {
    return this.prismaClient.pharmacologicalName.findMany();
  };

  getById = (id: number) => {
    return this.prismaClient.pharmacologicalName.findFirst({
      where: {
        id: id,
      },
    });
  };

  update = (pharmacologicalName: PharmalogicalNameDTO) => {
    return this.prismaClient.pharmacologicalName.update({
      where: {
        id: pharmacologicalName.id,
      },
      data: pharmacologicalName,
    });
  };

  delete = (id: number) => {
    return this.prismaClient.medicine.delete({
      where: {
        id: id,
      },
    });
  };
}
