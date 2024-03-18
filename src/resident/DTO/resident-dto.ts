export interface ResidentDTO {
  cpf: string;
  rg: string;
  name: string;
  contact_phone: string;
  birthday: Date;
  id?: number;
  created_a?: Date | null;
  updated_at?: Date | null;
}