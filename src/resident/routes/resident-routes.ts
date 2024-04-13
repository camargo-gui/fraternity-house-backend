import { EmployeeAuthMiddleware } from "employee/middleware/employee-auth-middleware";
import { Router } from "express";
import fs from "fs";
import multer from "multer";
import path from "path";
import { ResidentController } from "resident/controller/resident-controller";
import { ValidateResidentMiddlewareAlreadyExists } from "resident/middleware/validate-resident-middleware-already-exists";
import { ValidateResidentMiddlewareNotFound } from "resident/middleware/validate-resident-middleware-not-found";
import { ValidateResidentMiddlewareRequiredFields } from "resident/middleware/validate-resident-middleware-required-fields";

const routes = Router();

const tempDir = path.join(__dirname, "/temp");

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const controller = new ResidentController();
const middlewareRequiredFields = new ValidateResidentMiddlewareRequiredFields();
const middlewareAlreadyExists = new ValidateResidentMiddlewareAlreadyExists();
const middlewareNotFound = new ValidateResidentMiddlewareNotFound();
const authMiddleware = new EmployeeAuthMiddleware();

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
  middlewareNotFound.execute,
  middlewareRequiredFields.execute,
  controller.update
);
routes.delete(
  "/",
  authMiddleware.execute,
  middlewareNotFound.execute,
  controller.delete
);
routes.get("/:cpf", authMiddleware.execute, controller.getByCpf);
routes.get("/", authMiddleware.execute, controller.getAll);

export default routes;
