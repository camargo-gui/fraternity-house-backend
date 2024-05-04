import { EmployeeResetPasswordController } from "employee/controller/employee-reset-password-controller";
import { Router } from "express";

const routes = Router();
const controller = new EmployeeResetPasswordController();

routes.post("/send", controller.sendEmail);
routes.post("/reset", controller.resetPassword);

export default routes;
