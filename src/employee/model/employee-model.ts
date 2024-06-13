import { prismaClient } from "#/client/prisma-client";
import { Password } from "#/common/entities/password";
import { EmployeeDTO } from "#/employee/DTO/employee-dto";
import { AccountStatus } from "@prisma/client";

export class EmployeeModel {
  create = (employee: EmployeeDTO) => {
    return prismaClient.employee.create({
      data: {
        ...employee,
        role_id: Number(employee.role_id),
        password: new Password(employee.password).createHash(),
      },
      select: {
        id: true,
        document: true,
        name: true,
        email: true,
        phone: true,
        url_image: true,
        created_at: true,
        updated_at: true,
        role_id: true,
      },
    });
  };

  getAll = () => {
    return prismaClient.employee.findMany({
      where: {
        status: AccountStatus.ACTIVE,
      },
      select: {
        id: true,
        document: true,
        name: true,
        email: true,
        phone: true,
        url_image: true,
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
        url_image: true,
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
      select: {
        id: true,
        document: true,
        role_id: true,
        password: true,
        name: true,
        email: true,
        phone: true,
        status: true,
        url_image: true,
        created_at: true,
        updated_at: true,
        Role: true,
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
        url_image: true,
      },
      data: {
        ...employee,
        id: Number(employee.id),
        role_id: Number(employee.role_id),
      },
    });
  };

  updatePassword = (id: number, password: string) => {
    return prismaClient.employee.update({
      where: {
        id: id,
      },
      data: {
        password: new Password(password).createHash(),
      },
    });
  };

  deleteByCpf = (cpf: string) => {
    return prismaClient.employee.update({
      where: {
        document: cpf,
      },
      data: {
        status: AccountStatus.INACTIVE,
      }
    });
  };

  undeleteByCpf = (cpf: string) => {
    return prismaClient.employee.update({
      where: {
        document: cpf,
      },
      data: {
        status: AccountStatus.ACTIVE,
      }
    });
  };
}
