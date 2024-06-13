import { PharmacologicalFormDTO } from "#/pharmacological-form/DTO/pharmacological-form-dto";
import { PrismaClient } from "@prisma/client";

export class PharmacologicalFormModel {
  private prismaClient = new PrismaClient();

  create = (pharmacologicalForm: PharmacologicalFormDTO) => {
    return this.prismaClient.pharmacologicalForm.create({
      data: pharmacologicalForm,
    });
  };

  getAll = () => {
    return this.prismaClient.pharmacologicalForm.findMany();
  };

  getById = (id: number) => {
    return this.prismaClient.pharmacologicalForm.findFirst({
      where: {
        id: id,
      },
    });
  };

  update = (pharmacologicalName: PharmacologicalFormDTO) => {
    return this.prismaClient.pharmacologicalForm.update({
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
