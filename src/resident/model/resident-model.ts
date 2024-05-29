import { AccountStatus, PrismaClient } from "@prisma/client";
import { Resident } from "resident/DTO/resident-dto";
import { ResidentToUpdate } from "resident/DTO/update-resident-dto";
export class ResidentModel {
  private client = new PrismaClient();

  create = async (resident: Resident) => {
    return this.client.resident.create({
      data: { ...resident },
    });
  };

  update = async (resident: ResidentToUpdate) => {
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

  registerScreening = async (id: number) => {
    return this.client.resident.update({
      where: {
        id: id,
      },
      data: {
        has_screening: true,
      },
    });
  };

  deleteByCpf = async (cpf: string) => {
    return this.client.resident.update({
      where: {
        cpf,
      },
      data: {
        status: AccountStatus.INACTIVE,
      },
    });
  };

  undeleteByCpf = async (cpf: string) => {
    return this.client.resident.update({
      where: {
        cpf,
      },
      data: {
        status: AccountStatus.ACTIVE,
      },
    });
  };

  getByCpf = async (cpf: string): Promise<Resident | null> => {
    return this.client.resident.findFirst({
      where: {
        cpf,
      },
    });
  };

  getById = async (id: number): Promise<Resident | null> => {
    return this.client.resident.findFirst({
      where: {
        id,
      },
    });
  };

  getAll = async (): Promise<Resident[]> => {
    return this.client.resident.findMany({
      where: {
        status: AccountStatus.ACTIVE,
      },
      orderBy: {
        name: "asc",
      },
    });
  };

  getResidentsWithScreening = async () => {
    return this.client.resident.findMany({
      include: {
        Screening: {
          include: {
            Responsible: true,
            Illnesses: true,
            SpecialNeeds: true,
          },
        },
      },
      where: {
        status: AccountStatus.ACTIVE,
      },
    });
  };
}
