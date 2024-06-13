import { IllnessesController } from "#/screening/controller/illnesses-controller";
import { Router } from "express";

const routes: Router = Router();
const controller = new IllnessesController();

routes.get("/", controller.getAll);

export default routes;