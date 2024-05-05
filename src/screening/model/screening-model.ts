import { PrismaClient } from "@prisma/client";
import { ScreeningDTO } from "screening/DTO/screening-dto";

export class ScreeningModel {
  private prisma = new PrismaClient();

  create = async (screening: ScreeningDTO) => {
    return await this.prisma.screening.create({
      data: {
        ...screening,
        Responsible: {
          create: screening.Responsible,
        },
        Illnesses: {
          create: screening.Illnesses,
        },
        SpecialNeeds: {
          create: screening.SpecialNeeds,
        },
      },
    });
  };

  getByResident = async (id_resident: number) => {
    return await this.prisma.screening.findFirst({
      where: {
        id_resident,
      },
      include: {
        Responsible: true,
        Illnesses: true,
        SpecialNeeds: true,
      },
    });
  };

}