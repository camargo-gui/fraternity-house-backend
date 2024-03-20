import "dotenv/config";
import loginRoutes from "employee/routes/employee-login-routes";
import employeeRoutes from "employee/routes/employee-routes";
import express from "express";
import { DateTime } from "luxon";
import medicineRoutes from "medicine/routes/medicine-routes";
import residentRoutes from "resident/routes/resident-routes";
import roleRoutes from "role/routes/role-routes";

DateTime.local().setZone("America/Sao_Paulo");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Hello World");
});

app.use("/resident", residentRoutes);
app.use("/role", roleRoutes);
app.use("/employee", employeeRoutes);
app.use("/medicine", medicineRoutes);
app.use("/login", loginRoutes);

app.listen(process.env.PORT || 3344);
