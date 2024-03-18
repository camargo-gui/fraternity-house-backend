import "dotenv/config";
import employeeRoutes from "employee/routes/employee-routes";
import roleRoutes from "role/routes/role-routes";
import express from "express";
import { DateTime } from "luxon";

DateTime.local().setZone("America/Sao_Paulo");

const app = express();

app.use(express.json());
app.get("/", (req, res) => {
  return res.send("Hello World");
});

app.use("/role", roleRoutes);
app.use("/employee", employeeRoutes);
app.listen(process.env.PORT || 3344);
