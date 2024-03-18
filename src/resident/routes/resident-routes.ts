import { Router } from "express";
import { ResidentController } from "resident/controller/resident-controller";
import { ResidentExistsMiddleware } from "resident/middleware/resident-exists-middleware";

const routes = Router();
const controller = new ResidentController();
const middleware = new ResidentExistsMiddleware();

routes.post("/", controller.create);
routes.put("/", middleware.execute, controller.update);
routes.delete("/:cpf", middleware.execute, controller.delete);
routes.get("/:cpf", controller.getByCpf);
routes.get("/", controller.getAll);

export default routes;