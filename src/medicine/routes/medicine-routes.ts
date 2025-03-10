import { EmployeeAuthMiddleware } from "#/employee/middleware/employee-auth-middleware";
import { MedicineController } from "#/medicine/controller/medicine-controller";
import { ValidateMedicineDataMiddleware } from "#/medicine/middlewares/validate-medicine-data-middleware";
import { Router } from "express";

const routes: Router = Router();
const controller = new MedicineController();
const middleware = new ValidateMedicineDataMiddleware();
const authMiddleware = new EmployeeAuthMiddleware();

routes.post("/", authMiddleware.execute, middleware.execute, controller.create);
routes.get("/", authMiddleware.execute, controller.getAll);
routes.put("/", authMiddleware.execute, middleware.execute, controller.update);
routes.delete("/:id", authMiddleware.execute, controller.delete);

export default routes;
