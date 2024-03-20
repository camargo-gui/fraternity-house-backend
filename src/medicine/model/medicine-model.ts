import { prismaClient } from "client/prisma-client";
import { MedicineDTO } from "medicine/DTO/medicine-dto";

export class MedicineModel {
  create = (medicine: MedicineDTO) => {
    return prismaClient.medicine.create({
      data: medicine,
      select: {
        id: true,
        name: true,
        pharmaceutical_forms: true,
        PharmacologicalName: true,
        created_at: true,
        updated_at: true,
      },
    });
  };

  getAll = () => {
    return prismaClient.medicine.findMany({
      select: {
        id: true,
        name: true,
        pharmaceutical_forms: true,
        PharmacologicalName: true,
        created_at: true,
        updated_at: true,
      },
    });
  };

  getById = (id: number) => {
    return prismaClient.medicine.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        pharmaceutical_forms: true,
        PharmacologicalName: true,
        created_at: true,
        updated_at: true,
      },
    });
  };

  update = (medicine: MedicineDTO) => {
    return prismaClient.medicine.update({
      where: {
        id: medicine.id,
      },
      data: medicine,
      select: {
        id: true,
        name: true,
        pharmaceutical_forms: true,
        PharmacologicalName: true,
        created_at: true,
        updated_at: true,
      },
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
