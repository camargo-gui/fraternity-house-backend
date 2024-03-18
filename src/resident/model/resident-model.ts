
import { prismaClient } from "client/prisma-client";
import { ResidentDTO } from "resident/DTO/resident-dto";

export class ResidentModel{
  create = async (resident: ResidentDTO) => {
    return prismaClient.resident.create({
      data: {...resident}
    });
  };

  update = async (resident: ResidentDTO) => {
    return prismaClient.resident.update({
      where: {
        cpf: resident.cpf
      },
      data: {
        ...resident,
        birthday: new Date(resident.birthday)
      }
    });
  };

  deleteByCpf = async (cpf: string) => {
    return prismaClient.resident.delete({
      where: {
        cpf
      }
    });	
  };

  getByCpf = async (cpf: string): Promise <ResidentDTO | null> => {
    return prismaClient.resident.findFirst({
      where: {
        cpf
      }
    });
  };

  getAll = async(): Promise <ResidentDTO[]> => {
    return prismaClient.resident.findMany();
  };
}