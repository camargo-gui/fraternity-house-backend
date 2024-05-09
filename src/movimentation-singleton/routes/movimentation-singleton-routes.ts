import { EmployeeAuthMiddleware } from "employee/middleware/employee-auth-middleware";
import { EmployeeModelSing } from "employee/model/employee-model-singleton";
import { Router } from "express";
import { MovimentationController } from "movimentation-singleton/controller/movimentation-controller";
import { MovimentationModelSing } from "movimentation-singleton/model/movimentation-model";
import { ProductModelSing } from "product/model/product-model-singleton";

const router = Router();

const movimentationModel = MovimentationModelSing.getInstance();
const employeeModel = EmployeeModelSing.getInstance();
const productModel = ProductModelSing.getInstance();

const movimentationController = new MovimentationController(
  movimentationModel,
  employeeModel,
  productModel
);
const authMiddleware = new EmployeeAuthMiddleware();

router.post(
  "/",
  authMiddleware.execute,
  movimentationController.createMovimentation
);

export default router;
