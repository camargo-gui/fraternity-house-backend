import { EmployeeAuthMiddleware } from "#/employee/middleware/employee-auth-middleware";
import { PrescriptionController } from "#/prescription/controller/prescription-controller";
import { ValidatePrescriptionDataMiddleware } from "#/prescription/middlewares/validate-prescription-data-middleware";
import { Router } from "express";

const routes: Router = Router();
const control = new PrescriptionController();
const middleware = new ValidatePrescriptionDataMiddleware();
const authMiddleware = new EmployeeAuthMiddleware();

routes.post("/", authMiddleware.execute, middleware.execute, control.create);
routes.put("/", authMiddleware.execute, middleware.execute, control.update);
routes.delete("/:id", authMiddleware.execute, control.delete);

export default routes;
