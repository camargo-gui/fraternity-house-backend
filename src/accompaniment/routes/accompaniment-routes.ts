import { AccompanimentController } from "accompaniment/controller/accompaniment-controller";
import { Router } from "express";

const route = Router();

const accompanimentController = AccompanimentController.getInstance();

route.get("/", accompanimentController.get);
route.post("/", accompanimentController.create);

export default route;
