import { EmployeeController } from "employee/controller/employee-controller";
import { ValidateEmployeeDataMiddleware } from "employee/middleware/validate-employee-data-middleware";
import { Router } from "express";


const routes = Router();
const controller = new EmployeeController();
const middleware = new ValidateEmployeeDataMiddleware();

routes.post("/", middleware.execute, controller.create);
routes.get("/", middleware.execute, controller.getAll);
routes.delete("/:document", middleware.execute, controller.delete);
routes.put("/", middleware.execute, controller.update);

export default routes;