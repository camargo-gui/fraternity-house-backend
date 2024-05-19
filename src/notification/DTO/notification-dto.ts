export interface NotificationDTO {
  id?: number;
  residentName: string;
  medicineName: string;
  dosage: string;
  time: string;
  endDate: Date;
  wasRead: boolean;
  employeeId: number;
  createdAt?: Date;
  updatedAt?: Date;
}
