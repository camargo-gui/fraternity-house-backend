import { Router } from "express";
import { RoleController } from "role/controller/role-controller";
import { RoleExistsMiddleware } from "role/middleware/role-exists-middleware";


const routes = Router();
const controller = new RoleController();
const middleware = new RoleExistsMiddleware();

routes.post("/", middleware.execute, controller.create);
routes.get("/", controller.getAll);

export default routes;