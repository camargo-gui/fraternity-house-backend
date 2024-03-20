import { prismaClient } from "client/prisma-client";
import { Password } from "common/entities/password";
import { EmployeeDTO } from "employee/dto/employee-dto";

export class EmployeeModel {
  create = (employee: EmployeeDTO) => {
    return prismaClient.employee.create({
      data: {
        ...employee,
        password: new Password(employee.password).createHash(),
      },
      select: {
        id: true,
        document: true,
        name: true,
        email: true,
        phone: true,
        created_at: true,
        updated_at: true,
        Role: true,
      },
    });
  };

  getAll = () => {
    return prismaClient.employee.findMany({
      select: {
        id: true,
        document: true,
        name: true,
        email: true,
        phone: true,
        created_at: true,
        updated_at: true,
        Role: true,
      },
    });
  };

  getById = (id: number) => {
    return prismaClient.employee.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        document: true,
        name: true,
        email: true,
        phone: true,
        created_at: true,
        updated_at: true,
        Role: true,
      },
    });
  };

  getByDocument = (document: string) => {
    return prismaClient.employee.findFirst({
      where: {
        document: document,
      },
    });
  };

  update = (employee: EmployeeDTO) => {
    return prismaClient.employee.update({
      where: {
        document: employee.document,
      },
      select: {
        id: true,
        document: true,
        name: true,
        email: true,
        phone: true,
        created_at: true,
        updated_at: true,
        Role: true,
      },
      data: employee,
    });
  };

  delete = (id: number) => {
    return prismaClient.employee.delete({
      where: {
        id: id,
      },
    });
  };
}
