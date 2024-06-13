import { EmployeeAuthMiddleware } from "#/employee/middleware/employee-auth-middleware";
import { ProductController } from "#/product/controller/product-controller";
import { Router } from "express";

const routes: Router = Router();
const control = new ProductController();
const middleware = new EmployeeAuthMiddleware();

routes.get("/", middleware.execute, control.getAllProducts);
routes.get("/stock", middleware.execute, control.getStock);
routes.post("/", middleware.execute, control.create);

export default routes;