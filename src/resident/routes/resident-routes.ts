import { EmployeeAuthMiddleware } from "employee/middleware/employee-auth-middleware";
import { RoleAuthorizationMiddleware } from "employee/middleware/role-authorization-middleware";
import { Router } from "express";
import multer from "multer";
import { ResidentController } from "resident/controller/resident-controller";
import { ValidateResidentMiddlewareAlreadyExists } from "resident/middleware/validate-resident-middleware-already-exists";
import { ValidateResidentMiddlewareNotFound } from "resident/middleware/validate-resident-middleware-not-found";
import { ValidateResidentMiddlewareRequiredFields } from "resident/middleware/validate-resident-middleware-required-fields";
import { RoleEnum } from "role/DTO/role-dto";

const routes = Router();
const upload = multer({ storage: multer.memoryStorage() });

const controller = new ResidentController();
const middlewareRequiredFields = new ValidateResidentMiddlewareRequiredFields();
const middlewareAlreadyExists = new ValidateResidentMiddlewareAlreadyExists();
const middlewareNotFound = new ValidateResidentMiddlewareNotFound();
const authMiddleware = new EmployeeAuthMiddleware();
const adminAuth = new RoleAuthorizationMiddleware(RoleEnum.Administrador);

routes.post(
  "/",
  authMiddleware.execute,
  upload.single("image"),
  middlewareRequiredFields.execute,
  middlewareAlreadyExists.execute,
  controller.create
);

routes.put(
  "/",
  authMiddleware.execute,
  upload.single("image"),
  middlewareNotFound.execute,
  middlewareRequiredFields.execute,
  controller.update
);
routes.delete(
  "/",
  authMiddleware.execute,
  middlewareNotFound.execute,
  adminAuth.execute,
  controller.delete
);
routes.get("/:cpf", authMiddleware.execute, controller.getByCpf);
routes.get("/", authMiddleware.execute, controller.getAll);
routes.post("/report", authMiddleware.execute, controller.sendReport);
routes.put("/restore", authMiddleware.execute, controller.undelete);
routes.put("/update-screening-status", controller.updateResidentsWithDeprecatedScreeningStatus);
export default routes;
