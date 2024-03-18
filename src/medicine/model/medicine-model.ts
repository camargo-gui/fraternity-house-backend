import { prismaClient } from "client/prisma-client";
import { MedicineDTO } from "medicine/DTO/medicine-dto";

export class MedicineModel {
  create = (medicine: MedicineDTO) => {
    return prismaClient.medicine.create({
      data: medicine,
    });
  };

  getAll = () => {
    return prismaClient.medicine.findMany();
  };

  getById = (id: number) => {
    return prismaClient.medicine.findFirst({
      where: {
        id: id,
      },
    });
  };

  update = (medicine: MedicineDTO) => {
    return prismaClient.medicine.update({
      where: {
        id: medicine.id,
      },
      data: medicine,
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
