import { EmployeeAuthMiddleware } from "employee/middleware/employee-auth-middleware";
import { Router } from "express";
import { SpecialNeedsController } from "screening/controller/special-needs-controller";

const routes = Router();
const controller = new SpecialNeedsController();
const middleware = new EmployeeAuthMiddleware();

routes.get("/", middleware.execute, controller.getAll);

export default routes;