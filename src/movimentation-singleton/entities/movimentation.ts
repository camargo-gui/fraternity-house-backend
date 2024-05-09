import { MovimentationType } from "movimentation/DTO/movimentation-dto";
import { ProductMovimentation } from "./product-movimentation";
import { Employee } from "employee/DTO/employee";

export class Movimentation {
  id: number;
  type: MovimentationType;
  employee: Employee;
  private products: Map<number, ProductMovimentation>;
  created_at: Date;

  constructor(
    id: number,
    type: MovimentationType,
    employee: Employee,
    products: ProductMovimentation[],
    created_at: Date
  ) {
    this.id = id;
    this.type = type;
    this.employee = employee;
    this.products = new Map();
    this.created_at = created_at;
    products.forEach((prod) => this.addProduct(prod));
  }

  addProduct(product: ProductMovimentation) {
    const existingProduct = this.products.get(product.product.id);
    if (existingProduct) {
      existingProduct.quantity += product.quantity;
    } else {
      this.products.set(product.product.id, product);
    }
  }

  getProductList(): ProductMovimentation[] {
    return Array.from(this.products.values());
  }
}
