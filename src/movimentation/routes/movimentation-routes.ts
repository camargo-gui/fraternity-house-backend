import { EmployeeAuthMiddleware } from "employee/middleware/employee-auth-middleware";
import { RoleAuthorizationMiddleware } from "employee/middleware/role-authorization-middleware";
import { Router } from "express";
import { MovimentationController } from "movimentation/controller/movimentation-controller";
import { RoleEnum } from "role/DTO/role-dto";

const routes = Router();
const middleware = new EmployeeAuthMiddleware();
const control = new MovimentationController();
const authAdminAndEmployee = new RoleAuthorizationMiddleware(
  RoleEnum.Administrador,
  RoleEnum.Funcionario
);

routes.post(
  "/",
  middleware.execute,
  authAdminAndEmployee.execute,
  control.create
);
routes.get("/", control.getMovimentations);

export default routes;
