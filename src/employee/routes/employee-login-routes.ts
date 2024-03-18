import { EmployeeLoginController } from "employee/controller/employee-login-controller";
import { Router } from "express";


const routes = Router();
const controller = new EmployeeLoginController();

routes.post("/", controller.login);

export default routes;