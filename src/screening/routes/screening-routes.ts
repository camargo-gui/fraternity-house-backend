import { EmployeeAuthMiddleware } from "#/employee/middleware/employee-auth-middleware";
import { ScreeningController } from "#/screening/controller/screening-controller";
import { ScreeningMiddleware } from "#/screening/middleware/screening-middleware";
import { Router } from "express";

const routes: Router = Router();
const controller = new ScreeningController();
const authMiddleware = new EmployeeAuthMiddleware();
const screeningMiddleware = new ScreeningMiddleware();

routes.post("/", authMiddleware.execute, screeningMiddleware.execute, controller.create);
routes.put("/", authMiddleware.execute, screeningMiddleware.execute, controller.update);
routes.get("/:id_resident", authMiddleware.execute, controller.getByResident);

export default routes;