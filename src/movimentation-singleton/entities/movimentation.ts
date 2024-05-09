import { Employee } from "employee/DTO/employee";
import { MovimentationType } from "movimentation/DTO/movimentation-dto";
import { ProductMovimentation } from "./product-movimentation";

export class Movimentation {
  id: number;
  type: MovimentationType;
  employee: Employee;
  private products: ProductMovimentation[];
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
    this.products = products;
    this.created_at = created_at;
  }

  addProductMovimentation(productMov: ProductMovimentation) {
    this.products.push(productMov);
  }

  findProductMovimentation(
    productId: number
  ): ProductMovimentation | undefined {
    return this.products.find((p) => p.product.id === productId);
  }

  getProductMovimentations(): ProductMovimentation[] {
    return this.products;
  }
}
