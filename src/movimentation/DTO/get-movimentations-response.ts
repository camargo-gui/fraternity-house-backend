import { MovimentationType } from "movimentation/DTO/movimentation-dto";
import { ProductDTO } from "product/DTO/product-dto";

export interface GetMovimentationsResponse {
  id: number;
  created_at: Date;
  type: MovimentationType;
  products: ProductDTO[];
}