import { AccompanimentController } from "accompaniment/controller/accompaniment-controller";
import { Router } from "express";

const route = Router();

const accompanimentController = AccompanimentController.getInstance();

route.post("/", accompanimentController.create);

export default route;
