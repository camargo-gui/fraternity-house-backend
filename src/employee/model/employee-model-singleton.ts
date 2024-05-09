import { Prisma } from "@prisma/client";

export class EmployeeModelSing {
  private static instance: EmployeeModelSing | null = null;

  private constructor() {}

  public static getInstance(): EmployeeModelSing {
    if (!EmployeeModelSing.instance) {
      EmployeeModelSing.instance = new EmployeeModelSing();
    }
    return EmployeeModelSing.instance;
  }

  getById = (id: number, prisma: Prisma.TransactionClient) => {
    return prisma.employee.findFirst({
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
}
