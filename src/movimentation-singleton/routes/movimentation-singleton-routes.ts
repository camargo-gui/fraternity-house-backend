import { EmployeeAuthMiddleware } from "employee/middleware/employee-auth-middleware";
import { Router } from "express";
import { MovimentationController } from "movimentation-singleton/controller/movimentation-controller";

const router = Router();

const movimentationController = MovimentationController.getInstance();
const authMiddleware = new EmployeeAuthMiddleware();

router.post(
  "/",
  authMiddleware.execute,
  movimentationController.createMovimentation
);

export default router;
