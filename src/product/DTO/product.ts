export class Product {
  id: number;
  name: string;
  quantity: number;
  measurement: string;

  constructor(id: number, name: string, quantity: number, measurement: string) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
    this.measurement = measurement;
  }
}
