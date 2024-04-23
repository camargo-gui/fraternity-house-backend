import { Prisma } from "@prisma/client";
import { PrescriptionDTO } from "medication-sheet/DTO/prescription-dto";

export class PrescriptionModel {
  create = (
    prescription: PrescriptionDTO,
    prisma: Prisma.TransactionClient
  ) => {
    return prisma.prescription.create({
      data:prescription,
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
