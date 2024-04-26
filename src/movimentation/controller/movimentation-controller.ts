import { prismaClient } from "client/prisma-client";
import { AuthRequest } from "common/entities/auth-request";
import { EmployeeModel } from "employee/model/employee-model";
import { Request, Response } from "express";
import { MovimentationType } from "movimentation/DTO/movimentation-dto";
import { MovimentationModel } from "movimentation/model/movimentation-model";
import { ProductMovimentationModel } from "movimentation/model/product-movimentation-model";
import { ProductDTO } from "product/DTO/product-dto";
import { ProductModel } from "product/model/product-model";

export class MovimentationController {
  
  private movimentationModel = new MovimentationModel();

  private productModel = new ProductModel();

  private productMovimentationModel = new ProductMovimentationModel();

  private employeeModel = new EmployeeModel();

  create = async (req: AuthRequest, res: Response) => {
    const type: MovimentationType = req.body.type;
    const id_employee = req.id ?? 0;
    const products: ProductDTO[] = req.body.products;

    if(!type || !products || products.length === 0) {
      return res.status(400).json({ message: ["Campos obrigatórios não preenchidos"] });
    }

    try {
      await prismaClient.$transaction(async (prisma) => {
        const movimentation = await this.movimentationModel.create(prisma, {type, id_employee});
        const promises = products.map(async (product) => {
          if(!product.id || !product.quantity || product.quantity <= 0) {
            return res.status(400).json({ message: ["Produto no formato incorreto"] });
          }

          if (type === MovimentationType.OUTPUT) {
            const currentProduct = await this.productModel.getById(product.id);
            if (!currentProduct || currentProduct.quantity < product.quantity) {
              return res.status(400).send({message: [`Estoque insuficiente para o produto ID: ${product.id}`]});
            }
          }

          const createProductMovimentation = this.productMovimentationModel
            .create(prisma,movimentation.id, product.id, product.quantity);
          const updateProductStock = this.productModel.updateStock(prisma, product.id, product.quantity, type);
  
          return Promise.all([createProductMovimentation, updateProductStock]);
        });
  
        return await Promise.all(promises);
      });
  
      return res.status(201).send();
    } catch (error) {
      console.error("Transaction failed:", error);
      return res.status(500).send();
    }
  }; 
  

  getMovimentations = async (req: Request, res: Response) => {
    try {
      const movimentations = await this.movimentationModel.getMovimentations();
      const detailedMovimentations = await Promise.all(movimentations.map(async (mov) => {
        const products = await this.productMovimentationModel.getMovimentations(mov.id);
        const productsNamed = await Promise.all(products.map(async (product) => {
          const productData = await this.productModel.getById(product.id_product);
          return {
            ...product,
            name: productData?.name,
            measurement: productData?.measurement
          };
        }));
        const employee = await this.employeeModel.getById(mov.id_employee);
        return {
          ...mov,
          products: productsNamed,
          employee_name: employee?.name
        };
      }));
      return res.status(200).send(detailedMovimentations);
    } catch (error) {
      return res.status(500).send({message: ["Erro ao buscar movimentações"]});
    }
  };
}