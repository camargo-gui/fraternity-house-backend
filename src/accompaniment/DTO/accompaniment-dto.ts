export interface AccompanimentDTO {
  id?: number;
  date?: Date;
  description: string;
  employeeId: number;
  residentId: number;
  type: "PSYCHOLOGIST" | "PHYSIOTHERAPIST" | "NUTRITIONIST";
}
