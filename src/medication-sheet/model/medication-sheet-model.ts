import { Prisma, PrismaClient } from "@prisma/client";
import { MedicationSheetDTO } from "medication-sheet/DTO/medication-sheet-dto";

export class MedicationSheetModel {
  private prismaClient = new PrismaClient();

  create = async (
    { residentId, createdBy, observations }: MedicationSheetDTO,
    prisma: Prisma.TransactionClient
  ) => {
    return prisma.medicationSheet.create({
      data: {
        residentId,
        createdBy,
        observations,
      },
      include: {
        Resident: true,
        Employee: {
          select: {
            id: true,
            name: true,
            document: true,
            email: true,
            phone: true,
            Role: true,
          },
        },
        prescriptions: {
          include: {
            Medicine: true,
          },
        },
      },
    });
  };

  update = (medicationSheet: MedicationSheetDTO) => {
    return this.prismaClient.medicationSheet.update({
      where: { id: medicationSheet.id },
      data: {
        observations: medicationSheet.observations,
      },
    });
  };

  getAll = () => {
    return this.prismaClient.medicationSheet.findMany({
      select: {
        id: true,
        Resident: {
          select: {
            id: true,
            name: true,
            birthday: true,
            cpf: true,
            rg: true,
            contact_phone: true,
          },
        },
        Employee: {
          select: {
            id: true,
            name: true,
            document: true,
            email: true,
            phone: true,
            Role: true,
          },
        },
        prescriptions: {
          select: {
            id: true,
            Medicine: {
              select: {
                PharmacologicalForm: true,
                PharmacologicalName: true,
                name: true,
              },
            },
            firstTime: true,
            dosage: true,
            frequency: true,
            startDate: true,
            endDate: true,
          },
        },
        observations: true,
        createdAt: true,
      },
    });
  };

  getById = async (id: number, prisma: Prisma.TransactionClient) => {
    return prisma.medicationSheet.findFirst({
      where: { id },
      orderBy: { createdAt: "desc" },
      include: {
        Resident: true,
        Employee: {
          select: {
            id: true,
            name: true,
            document: true,
            email: true,
            phone: true,
            Role: true,
          },
        },
        prescriptions: {
          include: {
            Medicine: true,
          },
        },
      },
    });
  };

  getByResidentId = (residentId: number, prisma: Prisma.TransactionClient) => {
    return prisma.medicationSheet.findFirst({
      where: { residentId },
      select: {
        id: true,
        Resident: {
          select: {
            id: true,
            name: true,
            birthday: true,
            cpf: true,
            rg: true,
            contact_phone: true,
          },
        },
        Employee: {
          select: {
            id: true,
            name: true,
            document: true,
            email: true,
            phone: true,
            Role: true,
          },
        },
      },
    });
  };

  delete = (id: number, prisma: Prisma.TransactionClient) => {
    return prisma.medicationSheet.delete({
      where: { id },
    });
  };
}
