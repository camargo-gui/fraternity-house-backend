import { PrismaClient } from "@prisma/client";
import { ResidentDTO } from "resident/DTO/resident-dto";

export class ResidentModel {
  private client = new PrismaClient();
  
  create = async (resident: ResidentDTO) => {
    return this.client.resident.create({
      data: { ...resident },
    });
  };

  update = async (resident: ResidentDTO) => {
    return this.client.resident.update({
      where: {
        cpf: resident.cpf,
      },
      data: {
        ...resident,
        birthday: new Date(resident.birthday),
      },
    });
  };

  deleteByCpf = async (cpf: string) => {
    return this.client.resident.delete({
      where: {
        cpf,
      },
    });
  };

  getByCpf = async (cpf: string): Promise<ResidentDTO | null> => {
    return this.client.resident.findFirst({
      where: {
        cpf,
      },
    });
  };

  getById = async (id: number): Promise<ResidentDTO | null> => {
    return this.client.resident.findFirst({
      where: {
        id,
      },
    });
  };

  getAll = async (): Promise<ResidentDTO[]> => {
    return this.client.resident.findMany();
  };
}
