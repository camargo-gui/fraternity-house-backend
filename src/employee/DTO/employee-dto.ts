import { AccountStatus } from "@prisma/client";

export interface EmployeeDTO {
  id?: number;
  role_id: number;
  document: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  status: AccountStatus;
  created_a?: Date | null;
  updated_at?: Date | null;
  url_image?: string | null;
}