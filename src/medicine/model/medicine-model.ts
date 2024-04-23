import { PrismaClient } from "@prisma/client";
import {
  MedicineDTO,
  MedicineRequestParams,
  MedicineWhereConditions,
} from "medicine/DTO/medicine-dto";

export class MedicineModel {
  private prismaClient = new PrismaClient();

  create = (medicine: MedicineDTO) => {
    return this.prismaClient.medicine.create({
      data: medicine,
      select: {
        id: true,
        name: true,
        PharmacologicalForm: true,
        PharmacologicalName: true,
        created_at: true,
        updated_at: true,
      },
    });
  };

  getAll = (filters: MedicineRequestParams) => {
    const conditions: MedicineWhereConditions = {};

    if (filters.name) {
      conditions.name = { contains: filters.name, mode: "insensitive" };
    }
    if (filters.pharmacologicalName) {
      conditions.PharmacologicalName = {
        name: { contains: filters.pharmacologicalName, mode: "insensitive" },
      };
    }
    if (filters.pharmacologicalForm) {
      conditions.PharmacologicalForm = {
        name: { contains: filters.pharmacologicalForm, mode: "insensitive" },
      };
    }

    return this.prismaClient.medicine.findMany({
      where: conditions,
      select: {
        id: true,
        name: true,
        PharmacologicalForm: true,
        PharmacologicalName: true,
        created_at: true,
        updated_at: true,
      },
    });
  };

  getById = (id: number) => {
    return this.prismaClient.medicine.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        PharmacologicalForm: true,
        PharmacologicalName: true,
        created_at: true,
        updated_at: true,
      },
    });
  };

  update = (medicine: MedicineDTO) => {
    return this.prismaClient.medicine.update({
      where: {
        id: medicine.id,
      },
      data: medicine,
      select: {
        id: true,
        name: true,
        PharmacologicalForm: true,
        PharmacologicalName: true,
        created_at: true,
        updated_at: true,
      },
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
