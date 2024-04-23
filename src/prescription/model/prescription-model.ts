import { Prisma, PrismaClient } from "@prisma/client";
import { PrescriptionDTO } from "prescription/DTO/prescription-dto";

export class PrescriptionModel {
  private prismaClient = new PrismaClient();

  create = (
    prescription: PrescriptionDTO,
    prisma: Prisma.TransactionClient
  ) => {
    return prisma.prescription.create({
      data: prescription,
      select: {
        id: true,
        dosage: true,
        firstTime: true,
        frequency: true,
        MedicationSheet: true,
        Medicine: true,
        startDate: true,
        endDate: true,
        createdAt: true,
      },
    });
  };

  getById = (id: number) => {
    return this.prismaClient.prescription.findUnique({
      where: { id },
      select: {
        id: true,
        dosage: true,
        firstTime: true,
        frequency: true,
        MedicationSheet: true,
        Medicine: true,
        startDate: true,
        endDate: true,
        createdAt: true,
      },
    });
  };

  update = (prescription: PrescriptionDTO) => {
    return this.prismaClient.prescription.update({
      where: { id: prescription.id },
      data: {
        dosage: prescription.dosage,
        endDate: new Date(prescription.endDate),
        firstTime: prescription.firstTime,
        frequency: prescription.frequency,
        startDate: new Date(prescription.startDate),
      },
      select: {
        id: true,
        dosage: true,
        firstTime: true,
        frequency: true,
        MedicationSheet: true,
        Medicine: true,
        startDate: true,
        endDate: true,
        createdAt: true,
      },
    });
  };

  delete = (id: number, prisma: Prisma.TransactionClient) => {
    return prisma.prescription.delete({
      where: { id },
    });
  };

  getAllByMedicationSheetId = (medicationSheetId: number, prisma: Prisma.TransactionClient) => {
    return prisma.prescription.findMany({
      where: { medicationSheetId },
      select: {
        id: true,
        dosage: true,
        firstTime: true,
        frequency: true,
        MedicationSheet: true,
        Medicine: true,
        startDate: true,
        endDate: true,
        createdAt: true,
      },
    });
  };
}
