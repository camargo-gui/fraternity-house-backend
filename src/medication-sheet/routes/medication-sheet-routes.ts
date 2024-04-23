import { EmployeeAuthMiddleware } from "employee/middleware/employee-auth-middleware";
import { Router } from "express";
import { MedicationSheetController } from "medication-sheet/controller/medication-sheet-controller";
import { ValidateMedicationSheetDataMiddleware } from "medication-sheet/middlewares/validate-medication-sheet-data-middleware";

const routes = Router();
const control = new MedicationSheetController();
const middleware = new ValidateMedicationSheetDataMiddleware();
const authMiddleware = new EmployeeAuthMiddleware();

routes.post("/", authMiddleware.execute, middleware.execute, control.create);

export default routes;
