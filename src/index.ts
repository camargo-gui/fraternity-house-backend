// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
import moduleAlias from "module-alias";
moduleAlias.addAliases({ "#": __dirname });

import accompanimentRoutes from "#/accompaniment/routes/accompaniment-routes";
import loginRoutes from "#/employee/routes/employee-login-routes";
import resetPasswordRoutes from "#/employee/routes/employee-reset-password-routes";
import employeeRoutes from "#/employee/routes/employee-routes";
import medicationSheetRoutes from "#/medication-sheet/routes/medication-sheet-routes";
import medicineRoutes from "#/medicine/routes/medicine-routes";
import movimentationSingRoutes from "#/movimentation-singleton/routes/movimentation-singleton-routes";
import notificationsRoutes from "#/notification/routes/notification-routes";
import { scheduleCleanupReadNotifications } from "#/notification/scheduler/notification-clean-up";
import { scheduleHourlyMedicationReminders } from "#/notification/scheduler/notification-reminder-scheduler";
import pharmacologicalFormRoutes from "#/pharmacological-form/routes/pharmacological-form-routes";
import pharmacologicalNameRoutes from "#/pharmacological-name/routes/pharmacological-name-routes";
import prescriptionRoutes from "#/prescription/routes/prescription-routes";
import productRoutes from "#/product/routes/product-routes";
import residentRoutes from "#/resident/routes/resident-routes";
import roleRoutes from "#/role/routes/role-routes";
import illnessesRoutes from "#/screening/routes/illnesses-routes";
import screeningRoutes from "#/screening/routes/screening-routes";
import specialNeedsRoutes from "#/screening/routes/special-needs-routes";
import cors from "cors";
import "dotenv/config";
import express from "express";
import { DateTime } from "luxon";

DateTime.local().setZone("America/Sao_Paulo");

const app = express();

app.use(cors({ origin: "*" }));

app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Hello World");
});

app.use("/resident", residentRoutes);
app.use("/role", roleRoutes);
app.use("/employee", employeeRoutes);
app.use("/medicine", medicineRoutes);
app.use("/login", loginRoutes);
app.use("/pharmacological-name", pharmacologicalNameRoutes);
app.use("/pharmacological-form", pharmacologicalFormRoutes);
app.use("/medication-sheet", medicationSheetRoutes);
app.use("/product", productRoutes);
app.use("/prescription", prescriptionRoutes);
app.use("/reset-password", resetPasswordRoutes);
app.use("/screening", screeningRoutes);
app.use("/accompaniment", accompanimentRoutes);
app.use("/illnesses", illnessesRoutes);
app.use("/movimentation", movimentationSingRoutes);
app.use("/specialNeeds", specialNeedsRoutes);
app.use("/notifications", notificationsRoutes);

scheduleHourlyMedicationReminders();
scheduleCleanupReadNotifications();

app.listen(process.env.PORT || 3344);
