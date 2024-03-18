import { EmployeeController } from "employee/controller/employee-controller";
import { ValidateEmployeeDataMiddleware } from "employee/middleware/validate-employee-data-middleware";
import { Router } from "express";


const routes = Router();
const controller = new EmployeeController();
const middleware = new ValidateEmployeeDataMiddleware();

routes.post("/", middleware.execute, controller.create);
routes.get("/", controller.getAll);

export default routes;