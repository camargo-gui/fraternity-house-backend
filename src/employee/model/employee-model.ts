import { prismaClient } from "client/prisma-client";
import { Password } from "common/entities/password";
import { EmployeeDTO } from "employee/dto/employee-dto";

export class EmployeeModel {

  create = (employee: EmployeeDTO) => {
    return prismaClient.employee.create({
      data: {
        ...employee,
        password: new Password(employee.password).createHash(),
      }
    });
  };

  getAll = () => {
    return prismaClient.employee.findMany();
  };

  getById = (id: number) => {
    return prismaClient.employee.findFirst({
      where: {
        id: id
      }
    });
  };

  getByDocument = (document: string) => {
    return prismaClient.employee.findFirst({
      where: {
        document: document
      }
    });
  };

  update = (employee: EmployeeDTO) => {
    return prismaClient.employee.update({
      where: {
        document: employee.document
      },
      data: employee
    });
  };

  delete = (id: number) => {
    return prismaClient.employee.delete({
      where: {
        id: id
      }
    });
  };
}