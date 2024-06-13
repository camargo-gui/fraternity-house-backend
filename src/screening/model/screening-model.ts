import { ScreeningDTO } from "#/screening/DTO/screening-dto";
import { PrismaClient } from "@prisma/client";

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
          connect: screening.Illnesses.map(illness => ({ id: illness.id })),
        },
        SpecialNeeds: {
          connect: screening.SpecialNeeds.map(specialNeed => ({ id: specialNeed.id })),
        },
      },
    });
  };

  update = async (screening: ScreeningDTO) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {id, id_screening, ...responsible} = screening.Responsible;
    return await this.prisma. screening.update({
      where: {
        id: screening.id,
      },
      data: {
        ...screening,
        Responsible: {
          update: responsible,
        },
        Illnesses: {
          set: screening.Illnesses.map(illness => ({ id: illness.id })),
        },
        SpecialNeeds: {
          set: screening.SpecialNeeds.map(specialNeed => ({ id: specialNeed.id })),
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
        Illnesses: {
          select: {
            id: true,
            name: true,
          }
        },
        SpecialNeeds: {
          select: {
            id: true,
            name: true,
          }
        },
      },
    });
  };

  getScreeningWhereResidentsAreWithDeprecatedStatus = async () => {
    return await this.prisma.screening.findMany({
      where: {
        Resident: {
          has_screening: false,
        }
      }
    });
  };

}