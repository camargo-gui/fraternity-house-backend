import { PrescriptionDTO } from "prescription/DTO/prescription-dto";

export interface MedicationSheetDTO {
  id?: number;
  residentId: number;
  createdBy: number;
  createdAt?: Date;
  updatedAt?: Date;
  observations?: string;
}

export interface MedicationSheetRequestBody {
  residentId: number;
  observations?: string;
  prescriptions: PrescriptionDTO[];
}
