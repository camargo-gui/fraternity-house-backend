import { AccompanimentController } from "accompaniment/controller/accompaniment-controller";
import { EmployeeAuthMiddleware } from "employee/middleware/employee-auth-middleware";
import { Router } from "express";

const route = Router();

const accompanimentController = AccompanimentController.getInstance();
const middleware = new EmployeeAuthMiddleware();

route.get("/", middleware.execute, accompanimentController.get);
route.get(
  "/list-residents",
  middleware.execute,
  accompanimentController.getAllResidentsHasAccompaniments
);
route.post("/", middleware.execute, accompanimentController.create);
route.put(
  "/:id",
  middleware.execute,
  accompanimentController.updateAccompaniments
);

export default route;
