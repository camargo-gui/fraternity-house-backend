export class Employee {
  id: number;
  name: string;
  document: string; 
  role: string;

  constructor(id: number, name: string, document: string, role: string) {
    this.id = id;
    this.name = name;
    this.document = document;
    this.role = role;
  }
}
