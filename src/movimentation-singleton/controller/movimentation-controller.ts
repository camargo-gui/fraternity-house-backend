import { prismaClient } from "#/client/prisma-client";
import { AuthRequest } from "#/common/entities/auth-request";
import { EmployeeModel } from "#/employee/model/employee-model-singleton";
import { ProductMovimentation } from "#/movimentation-singleton/entities/product-movimentation";
import { Product } from "#/product/DTO/product";
import { ProductModel } from "#/product/model/product-model-singleton";
import { Prisma } from "@prisma/client";
import assert from "assert";
import { Request, Response } from "express";
import { Employee } from "../../employee/DTO/employee";
import { Movimentation, MovimentationType } from "../entities/movimentation";
import { MovimentationModel } from "../model/movimentation-model";

export class MovimentationController {
  private movimentationModel: MovimentationModel = new MovimentationModel();
  private employeeModel: EmployeeModel = new EmployeeModel();
  private productModel: ProductModel = new ProductModel();
  private static instance: MovimentationController;

  private constructor() {}

  public static getInstance(): MovimentationController {
    if (!MovimentationController.instance) {
      MovimentationController.instance = new MovimentationController();
    }
    return MovimentationController.instance;
  }

  public createMovimentation = async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const { type, products } = req.body;
      const employeeId = req.id;
      assert(employeeId);

      if(!products || products.length === 0) {
        return res.status(400).json({ message: ["Necessário incluir pelo menos produto para a movimentação"] });
      }

      await prismaClient.$transaction(async (prisma) => {
        const employee = await this.retrieveEmployee(employeeId, prisma);
        const movimentation = this.initializeMovimentation(type, employee);
        await this.processProducts(products, movimentation, type, prisma);
        await this.movimentationModel.create(movimentation, prisma);
      });

      return res.status(201).json({ message: ["Movimentation created successfully"] });
    } catch (error) {
      return res
        .status(500)
        .json({ message: ["Failed to create movimentation", error] });
    }
  };

  public getMovimentations = async (req: Request, res: Response) => {
    try {
      const movimentations = await this.movimentationModel.getMovimentations();
      const movimentationsWithDetails = movimentations.map((mov) => ({
        ...mov,
        products: mov.ProductMovimentations.map((pm) => ({
          ...pm,
          name: pm.Product.name,
          measurement: pm.Product.measurement,
        })),
        employee_name: mov.Employee.name,
      }));

      return res.status(200).send(movimentationsWithDetails);
    } catch (error) {
      const err = error as Error;
      return res
        .status(500)
        .json({ message: ["Erro ao criar movimentação: ", err.message] });
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
        throw new Error("Estoque insuficiente para saída de produto");
      }

      await this.productModel.updateStock(id, quantity, type, prisma);

      ProductMovimentation.createOrUpdate(
        productData,
        quantity,
        movimentation
      );
    }
  };
}
