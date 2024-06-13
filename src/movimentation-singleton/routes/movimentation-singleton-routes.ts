import { EmployeeAuthMiddleware } from "#/employee/middleware/employee-auth-middleware";
import { MovimentationController } from "#/movimentation-singleton/controller/movimentation-controller";
import { Router } from "express";

const router: Router = Router();

const movimentationController = MovimentationController.getInstance();
const authMiddleware = new EmployeeAuthMiddleware();

router.post(
  "/",
  authMiddleware.execute,
  movimentationController.createMovimentation
);
router.get(
  "/",
  authMiddleware.execute,
  movimentationController.getMovimentations
);

export default router;
