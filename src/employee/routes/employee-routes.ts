import { EmployeeController } from "employee/controller/employee-controller";
import { EmployeeAuthMiddleware } from "employee/middleware/employee-auth-middleware";
import { ValidateEmployeeDataMiddleware } from "employee/middleware/validate-employee-data-middleware";
import { Router } from "express";

const routes = Router();
const controller = new EmployeeController();
const authMiddleware = new EmployeeAuthMiddleware();
const valiidateEmployeeMiddleware = new ValidateEmployeeDataMiddleware();

routes.post(
  "/",
  /*authMiddleware.execute,*/ valiidateEmployeeMiddleware.execute,
  controller.create
);
routes.get("/", authMiddleware.execute, controller.getAll);
routes.delete("/:document", authMiddleware.execute, controller.delete);
routes.put("/", authMiddleware.execute, controller.update);

export default routes;
