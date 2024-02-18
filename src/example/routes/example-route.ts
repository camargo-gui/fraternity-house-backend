import ExampleController from "example/controller/example-controller";
import { Router } from "express";


const routes = Router();
const controller = new ExampleController();

routes.get("/:id", controller.get);

export default routes;