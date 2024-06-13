import { ScreeningDTO } from "#/screening/DTO/screening-dto";
import { Resident } from "@prisma/client";

export interface ResidentReportDTO extends Resident{
  Screening?: ScreeningDTO | null;
}