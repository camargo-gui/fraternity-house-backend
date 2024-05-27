import { EmployeeController } from "employee/controller/employee-controller";
import { EmployeeAuthMiddleware } from "employee/middleware/employee-auth-middleware";
import { RoleAuthorizationMiddleware } from "employee/middleware/role-authorization-middleware";
import { ValidateEmployeeDataMiddleware } from "employee/middleware/validate-employee-data-middleware";
import { Router } from "express";
import multer from "multer";
import { RoleEnum } from "role/DTO/role-dto";

const routes = Router();
const upload = multer({ storage: multer.memoryStorage() });
const controller = new EmployeeController();
const authMiddleware = new EmployeeAuthMiddleware();
const validateEmployeeMiddleware = new ValidateEmployeeDataMiddleware();
const adminAuth = new RoleAuthorizationMiddleware(RoleEnum.Administrador);

routes.post(
  "/",
  upload.single("image"),
  authMiddleware.execute,
  adminAuth.execute,
  validateEmployeeMiddleware.validateRequiredFields,
  validateEmployeeMiddleware.validateEmployeeExists,
  controller.create
);
routes.get("/", authMiddleware.execute, controller.getAll);
routes.delete(
  "/:document",
  authMiddleware.execute,
  adminAuth.execute,
  controller.deleteByCpf
);
routes.put("/restore", authMiddleware.execute, adminAuth.execute, controller.undeleteByCpf);
routes.put("/", upload.single("image"), authMiddleware.execute, adminAuth.execute, controller.update);
routes.get("/employee", authMiddleware.execute, controller.getById);

export default routes;
