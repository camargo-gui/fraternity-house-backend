import { AccompanimentController } from "accompaniment/controller/accompaniment-controller";
import { EmployeeAuthMiddleware } from "employee/middleware/employee-auth-middleware";
import { RoleAuthorizationMiddleware } from "employee/middleware/role-authorization-middleware";
import { Router } from "express";
import { RoleEnum } from "role/DTO/role-dto";

const route = Router();

const accompanimentController = AccompanimentController.getInstance();
const middleware = new EmployeeAuthMiddleware();
const roleMiddleware = new RoleAuthorizationMiddleware(
  RoleEnum.EducadorFisico,
  RoleEnum.Psicologo,
  RoleEnum.Nutricionista
);

route.get("/", middleware.execute, accompanimentController.get);
route.get(
  "/list-residents",
  middleware.execute,
  accompanimentController.getAllResidentsHasAccompaniments
);
route.post(
  "/",
  middleware.execute,
  roleMiddleware.execute,
  accompanimentController.create
);
route.put(
  "/:id",
  middleware.execute,
  accompanimentController.updateAccompaniments
);

export default route;
