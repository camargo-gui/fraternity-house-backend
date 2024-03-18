import "dotenv/config";
import residentRoutes from "resident/routes/resident-routes";
import express from "express";
import { DateTime } from "luxon";

DateTime.local().setZone("America/Sao_Paulo");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Hello World");
});

app.use("/resident", residentRoutes);
app.listen(process.env.PORT || 3344);
