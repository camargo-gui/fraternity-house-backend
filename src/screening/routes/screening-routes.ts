import { EmployeeAuthMiddleware } from "employee/middleware/employee-auth-middleware";
import { Router } from "express";
import { ScreeningController } from "screening/controller/screening-controller";
import { ScreeningMiddleware } from "screening/middleware/screening-middleware";

const routes = Router();
const controller = new ScreeningController();
const authMiddleware = new EmployeeAuthMiddleware();
const screeningMiddleware = new ScreeningMiddleware();

routes.post("/", authMiddleware.execute, screeningMiddleware.execute, controller.create);
routes.get("/:id_resident", authMiddleware.execute, controller.getByResident);

export default routes;