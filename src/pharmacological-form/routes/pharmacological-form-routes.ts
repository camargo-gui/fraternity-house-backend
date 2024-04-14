import { EmployeeAuthMiddleware } from "employee/middleware/employee-auth-middleware";
import { Router } from "express";
import { PharmacologicalFormController } from "pharmacological-form/controller/pharmacological-form-controller";
import { ValidatePharmacologicalFormDataMiddleware } from "pharmacological-form/middlewares/validate-pharmacological-form-data-middleware";

const routes = Router();
const controller = new PharmacologicalFormController();
const middleware = new ValidatePharmacologicalFormDataMiddleware();
const authMiddleware = new EmployeeAuthMiddleware();

routes.post("/", authMiddleware.execute, middleware.execute, controller.create);
routes.get("/", authMiddleware.execute, controller.getAll);
routes.put("/", authMiddleware.execute, middleware.execute, controller.update);
routes.delete("/:id", authMiddleware.execute, controller.delete);

export default routes;
