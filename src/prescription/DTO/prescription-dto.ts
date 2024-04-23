export interface PrescriptionDTO {
  id?: number;
  medicineId: number;
  medicationSheetId: number;
  dosage: string;
  frequency: string;
  startDate: Date;
  endDate: Date;
  firstTime: string;
  createdAt?: Date;
  updatedAt?: Date;
}
