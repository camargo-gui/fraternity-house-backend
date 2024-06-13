import { IllnessesDTO } from "#/screening/DTO/illnesses-dto";
import { ResponsibleDTO } from "#/screening/DTO/responsible-dto";
import { SpecialNeedsDTO } from "#/screening/DTO/special-needs-dto";

export interface ScreeningDTO {
  id?: number;
  religion: string;
  smoking: boolean;
  entry_date: Date;
  father_name: string;
  mother_name: string;
  source_of_income: string;
  income: number;
  health_insurance: string;
  funeral_insurance: string;
  number_of_sibling: number;
  number_of_children: number;
  number_of_grandchildren: number;
  id_resident: number;
  Responsible: ResponsibleDTO;
  Illnesses: IllnessesDTO[];
  SpecialNeeds: SpecialNeedsDTO[];
}