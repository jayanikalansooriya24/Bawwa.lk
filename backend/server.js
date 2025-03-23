import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API Working");
});

// Use appointment routes
app.use("/api/appointments", appointmentRoutes);

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});
