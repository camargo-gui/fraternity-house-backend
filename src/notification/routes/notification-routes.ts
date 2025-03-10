import { EmployeeAuthMiddleware } from "#/employee/middleware/employee-auth-middleware";
import { Router } from "express";
import { NotificationController } from "../controller/notification-controller";

const routes: Router = Router();
const controller = new NotificationController();
const authMiddleware = new EmployeeAuthMiddleware();

routes.post("/", authMiddleware.execute, controller.create);
routes.get("/", authMiddleware.execute, controller.getAllByEmployeeId);
routes.put("/markAsRead", authMiddleware.execute, controller.markAsReadByEmployeeId);

export default routes;
