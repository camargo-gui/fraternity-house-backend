import { EmployeeAuthMiddleware } from "employee/middleware/employee-auth-middleware";
import { Router } from "express";
import { ProductController } from "product/controller/product-controller";

const routes = Router();
const control = new ProductController();
const middleware = new EmployeeAuthMiddleware();

routes.get("/", middleware.execute, control.getAllProducts);
routes.get("/stock", middleware.execute, control.getStock);
routes.post("/", middleware.execute, control.create);

export default routes;