import { Prisma, PrismaClient } from "@prisma/client";
import { MedicationSheetDTO } from "medication-sheet/DTO/medication-sheet-dto";

export class MedicationSheetModel {
  private prismaClient = new PrismaClient();

  async getOrCreateSheet(
    { residentId, createdBy, observations }: MedicationSheetDTO,
    prisma: Prisma.TransactionClient
  ) {
    let createMedicationSheet = false;
    let sheet = await prisma.medicationSheet.findFirst({
      where: { residentId },
      orderBy: { createdAt: "desc" },
    });

    if (sheet == null) {
      createMedicationSheet = true;
      sheet = await prisma.medicationSheet.create({
        data: {
          residentId,
          createdBy,
          observations,
        },
      });
    }

    return { ...sheet, medicationWasCreated: createMedicationSheet };
  }

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

  getById = (id: number) => {
    return this.prismaClient.medicationSheet.findUnique({
      where: { id },
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
