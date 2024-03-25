import { EmployeeAuthMiddleware } from "employee/middleware/employee-auth-middleware";
import { Router } from "express";
import { ResidentController } from "resident/controller/resident-controller";
import { ValidateResidentMiddlewareAlreadyExists } from "resident/middleware/validate-resident-middleware-already-exists";
import { ValidateResidentMiddlewareNotFound } from "resident/middleware/validate-resident-middleware-not-found";
import { ValidateResidentMiddlewareRequiredFields } from "resident/middleware/validate-resident-middleware-required-fields";

const routes = Router();
const controller = new ResidentController();
const middlewareRequiredFields = new ValidateResidentMiddlewareRequiredFields();
const middlewareAlreadyExists = new ValidateResidentMiddlewareAlreadyExists();
const middlewareNotFound = new ValidateResidentMiddlewareNotFound();
const authMiddleware = new EmployeeAuthMiddleware();

routes.post("/", authMiddleware.execute, middlewareRequiredFields.execute, middlewareAlreadyExists.execute, controller.create);
routes.put("/", authMiddleware.execute, middlewareNotFound.execute, middlewareRequiredFields.execute, controller.update);
routes.delete("/", authMiddleware.execute, middlewareNotFound.execute, controller.delete);
routes.get("/:cpf", authMiddleware.execute, controller.getByCpf);
routes.get("/", authMiddleware.execute, controller.getAll);

export default routes;