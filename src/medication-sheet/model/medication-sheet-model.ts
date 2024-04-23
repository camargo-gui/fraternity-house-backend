import { Prisma, PrismaClient } from "@prisma/client";
import { MedicationSheetDTO } from "medication-sheet/DTO/medication-sheet-dto";

export class MedicationSheetModel {
  private prismaClient = new PrismaClient();

  create = (
    { residentId, createdBy, observations }: MedicationSheetDTO,
    prisma: Prisma.TransactionClient
  ) => {
    return prisma.medicationSheet.create({
      data: {
        residentId,
        createdBy,
        observations,
      },
      select: {
        id: true,
        Resident: {
          select: {
            id: true,
            name: true,
            birthday: true,
            cpf: true,
          },
        },
        Employee: {
          select: {
            id: true,
            name: true,
            document: true,
            email: true,
            phone: true,
          },
        },
        prescriptions: true,
        createdAt: true,
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
              }
            },
            firstTime: true,
            dosage: true,
            frequency: true,
            startDate: true,
            endDate: true,
          },
        
        },
        createdAt: true,
      },
    });
  };
}
