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
  
    if (!type || !products || products.length === 0) {
      return res.status(400).json({ message: ["Campos obrigatórios não preenchidos"] });
    }
  
    try {
      await prismaClient.$transaction(async (prisma) => {
        const movimentation = await this.movimentationModel.create(prisma, {type, id_employee});
  
        for (const product of products) {
          if (!product.id || !product.quantity || product.quantity <= 0) {
            throw new Error(`Produto no formato incorreto: ${product.id}`);
          }
  
          if (type === MovimentationType.OUTPUT) {
            const currentProduct = await this.productModel.getById(product.id);
            if (!currentProduct || currentProduct.quantity < product.quantity) {
              throw new Error(`Estoque insuficiente para o produto: ${product.name}`);
            }
          }
  
          const createProductMovimentation = this.productMovimentationModel
            .create(prisma, movimentation.id, product.id, product.quantity);
          const updateProductStock = this.productModel.updateStock(prisma, product.id, product.quantity, type);
  
          await Promise.all([createProductMovimentation, updateProductStock]);
        }
      });
  
      return res.status(201).send();
    } catch (error) {
      return res.status(400).send({ message:[(error as Error).message] });
    }
  };
  
  

  getMovimentations = async (req: Request, res: Response) => {
    try {
      const movimentations = await this.movimentationModel.getMovimentations();
      const movimentationsWithDetails = movimentations.map((mov) => ({
        ...mov,
        products: mov.ProductMovimentations.map(pm => ({
          ...pm,
          name: pm.Product.name,
          measurement: pm.Product.measurement
        })),
        employee_name: mov.Employee.name
      }));
  
      return res.status(200).send(movimentationsWithDetails);
    } catch (error) {
      return res.status(500).send({ message: ["Erro ao buscar movimentações"] });
    }
  };
}