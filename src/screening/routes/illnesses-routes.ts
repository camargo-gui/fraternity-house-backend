import { Router } from "express";
import { IllnessesController } from "screening/controller/illnesses-controller";

const routes = Router();
const controller = new IllnessesController();

routes.get("/", controller.getAll);

export default routes;