export interface EmployeeDTO {
  id?: number;
  role_id: number;
  document: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  created_a?: Date | null;
  updated_at?: Date | null;
}