import { Resident } from "@prisma/client";
import { ScreeningDTO } from "screening/DTO/screening-dto";

export interface ResidentReportDTO extends Resident{
  Screening?: ScreeningDTO | null;
}