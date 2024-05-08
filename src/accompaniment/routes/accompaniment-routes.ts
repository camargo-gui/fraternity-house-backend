import { AccompanimentController } from "accompaniment/controller/accompaniment-controller";
import { Router } from "express";

const route = Router();

const accompanimentController = AccompanimentController.getInstance();

route.get("/", accompanimentController.get);
route.get("/list-residents", accompanimentController.getAllResidentsHasAccompaniments);
route.post("/", accompanimentController.create);
route.put("/:id", accompanimentController.updateAccompaniments);

export default route;
