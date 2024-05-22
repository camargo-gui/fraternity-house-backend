import { Request, Response } from "express";
import { ProductModel } from "product/model/product-model";

export class ProductController {

  private model = new ProductModel();

  create = async (req: Request, res: Response) => {
    try {
      const product = req.body;
      if(!product.name || !product.measurement) {
        return res.status(400).json({ message: ["Campos obrigatórios não preenchidos"] });
      }
      const createdProduct = await this.model.create(product);
      res.status(201).json(createdProduct);
    }
    catch (error) {
      res.status(500).send({message: ["Erro ao criar produto"]});
    }
  };

  getAllProducts = async (req: Request, res: Response) => {
    try {
      const products = await this.model.getAll();
      return res.status(200).json(products);
    }
    catch (error) {
      return res.status(500).send();
    }
  };

  getStock = async (req: Request, res: Response) => {
    try {
      const stock = await this.model.getStock();
      return res.status(200).json(stock);
    }
    catch (error) {
      return res.status(500).send();
    }
  };

}