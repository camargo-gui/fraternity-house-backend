import { EmployeeAuthMiddleware } from "#/employee/middleware/employee-auth-middleware";
import { SpecialNeedsController } from "#/screening/controller/special-needs-controller";
import { Router } from "express";

const routes: Router = Router();
const controller = new SpecialNeedsController();
const middleware = new EmployeeAuthMiddleware();

routes.get("/", middleware.execute, controller.getAll);

export default routes;