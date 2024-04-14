import { prismaClient } from "client/prisma-client";
import { PharmacologicalFormDTO } from "pharmacological-form/DTO/pharmacological-form-dto";

export class PharmacologicalFormModel {
  create = (pharmacologicalForm: PharmacologicalFormDTO) => {
    return prismaClient.pharmacologicalForm.create({
      data: pharmacologicalForm,
    });
  };

  getAll = () => {
    return prismaClient.pharmacologicalForm.findMany();
  };

  getById = (id: number) => {
    return prismaClient.pharmacologicalForm.findFirst({
      where: {
        id: id,
      },
    });
  };

  update = (pharmacologicalName: PharmacologicalFormDTO) => {
    return prismaClient.pharmacologicalForm.update({
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
