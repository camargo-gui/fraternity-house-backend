import { Prisma } from "@prisma/client";
import { MedicationSheetDTO } from "medication-sheet/DTO/medication-sheet-dto";

export class MedicationSheetModel {
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
        Resident: true,
        Employee: true,
        prescriptions: true,
        createdAt: true,
      },
    });
  };
}
