import { Resident, Screening } from "@prisma/client";

export interface ResidentReportDTO extends Resident{
  Screening: Screening | null;
}