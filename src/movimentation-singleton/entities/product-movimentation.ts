import { Movimentation } from "movimentation-singleton/entities/movimentation";
import { Product } from "product/DTO/product";

export class ProductMovimentation {
  id?: number;
  product: Product;
  quantity: number;
  movimentation: Movimentation;

  private constructor(
    product: Product,
    quantity: number,
    movimentation: Movimentation
  ) {
    this.product = product;
    this.quantity = quantity;
    this.movimentation = movimentation;
  }

  public static createOrUpdate(
    product: Product,
    quantity: number,
    movimentation: Movimentation
  ): ProductMovimentation {
    let productMov = movimentation.findProductMovimentation(product.id);
    
    if (!productMov) {
      productMov = new ProductMovimentation(product, quantity, movimentation);
      movimentation.addProductMovimentation(productMov);
    } else {
      productMov.quantity += quantity;
    }

    return productMov;
  }
}
