import { EmployeeAuthMiddleware } from "employee/middleware/employee-auth-middleware";
import { Router } from "express";
import { MovimentationController } from "movimentation/controller/movimentation-controller";

const routes = Router();
const middleware = new EmployeeAuthMiddleware();
const control = new MovimentationController();

routes.post("/", middleware.execute, control.create);
routes.get("/", control.getMovimentations);

export default routes;