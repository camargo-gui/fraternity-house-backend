import { EmployeeAuthMiddleware } from "#/employee/middleware/employee-auth-middleware";
import { PharmacologicalNameController } from "#/pharmacological-name/controller/pharmacological-name-controller";
import { ValidatePharmacologicalNameDataMiddleware } from "#/pharmacological-name/middlewares/validate-pharmacological-name-data-middleware";
import { Router } from "express";

const routes: Router = Router();
const controller = new PharmacologicalNameController();
const middleware = new ValidatePharmacologicalNameDataMiddleware();
const authMiddleware = new EmployeeAuthMiddleware();

routes.post("/", authMiddleware.execute, middleware.execute, controller.create);
routes.get("/", authMiddleware.execute, controller.getAll);
routes.put("/", authMiddleware.execute, middleware.execute, controller.update);
routes.delete("/:id", authMiddleware.execute, controller.delete);

export default routes;
