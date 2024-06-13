import { RoleController } from "#/role/controller/role-controller";
import { RoleExistsMiddleware } from "#/role/middleware/role-exists-middleware";
import { Router } from "express";

const routes: Router = Router();
const controller = new RoleController();
const middleware = new RoleExistsMiddleware();

routes.post("/", middleware.execute, controller.create);
routes.get("/", controller.getAll);

export default routes;
