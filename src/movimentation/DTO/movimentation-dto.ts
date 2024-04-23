export interface MovimentationDTO {
  id?: number;
  type: MovimentationType;
  id_employee: number;
}

export enum MovimentationType {
  INPUT = "INPUT",
  OUTPUT = "OUTPUT",
}