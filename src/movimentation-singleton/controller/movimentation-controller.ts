import { prismaClient } from "client/prisma-client";
import { EmployeeModelSing } from "employee/model/employee-model-singleton";
import { Response } from "express";
import { ProductModelSing } from "product/model/product-model-singleton";
import { Employee } from "../../employee/DTO/employee";
import { Movimentation } from "../entities/movimentation";
import { MovimentationModelSing } from "../model/movimentation-model";
import { ProductMovimentation } from "movimentation-singleton/entities/product-movimentation";
import { Product } from "product/DTO/product";
import { AuthRequest } from "common/entities/auth-request";
import assert from "assert";
import { MovimentationType } from "movimentation/DTO/movimentation-dto";
import { Prisma } from "@prisma/client";

export class MovimentationController {
  private movimentationModel: MovimentationModelSing;
  private employeeModel: EmployeeModelSing;
  private productModel: ProductModelSing;

  constructor(
    movimentationModel: MovimentationModelSing,
    employeeModel: EmployeeModelSing,
    productModel: ProductModelSing
  ) {
    this.movimentationModel = movimentationModel;
    this.employeeModel = employeeModel;
    this.productModel = productModel;
  }

  public createMovimentation = async (
    req: AuthRequest,
    res: Response
  ): Promise<void> => {
    try {
      const { type, products } = req.body;
      const employeeId = req.id;
      assert(employeeId);

      await prismaClient.$transaction(async (prisma) => {
        const employee = await this.retrieveEmployee(employeeId, prisma);
        const movimentation = this.initializeMovimentation(type, employee);
        await this.processProducts(products, movimentation, type, prisma);
        await this.movimentationModel.create(movimentation, prisma);
      });

      res.status(201).json({ message: ["Movimentation created successfully"] });
    } catch (error) {
      res
        .status(500)
        .json({ message: ["Failed to create movimentation", error] });
    }
  };

  private retrieveEmployee = async (
    employeeId: number,
    prisma: Prisma.TransactionClient
  ): Promise<Employee> => {
    const employeeData = await this.employeeModel.getById(employeeId, prisma);
    if (!employeeData) {
      throw new Error("Employee not found");
    }
    return new Employee(
      employeeData.id,
      employeeData.name,
      employeeData.document,
      employeeData.Role.name
    );
  };

  private initializeMovimentation = (
    type: MovimentationType,
    employee: Employee
  ): Movimentation => {
    return new Movimentation(0, type, employee, [], new Date());
  };

  private processProducts = async (
    products: Product[],
    movimentation: Movimentation,
    type: MovimentationType,
    prisma: Prisma.TransactionClient
  ): Promise<void> => {
    for (const { id, quantity } of products) {
      const productData = await this.productModel.getById(id, prisma);

      if (!productData) {
        throw new Error(`Product not found: ID ${id}`);
      }

      if (
        type === MovimentationType.OUTPUT &&
        productData.quantity < quantity
      ) {
        throw new Error("Insufficient stock");
      }

      await this.productModel.updateStock(
        id,
        quantity,
        type,
        prisma
      );

      const productMovimentation = new ProductMovimentation(
        new Product(id, productData.name, quantity, productData.measurement),
        quantity
      );
      movimentation.addProduct(productMovimentation);
    }
  };
}
