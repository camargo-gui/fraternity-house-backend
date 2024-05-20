export interface Resident {
  cpf: string;
  rg: string;
  name: string;
  contact_phone: string;
  birthday: Date;
  url_image: string | null;
  status?: "ACTIVE" | "INACTIVE";
  id?: number;
  created_a?: Date | null;
  updated_at?: Date | null;
}