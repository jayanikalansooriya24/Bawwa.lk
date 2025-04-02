import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import paymentRoutes from "./routes/Payment.js";
import accessoryRoutes from "./routes/Accessory.js";
import salesRoutes from "./routes/Sales.js";

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

connectDB();

app.use("/api", paymentRoutes);         // /api/process-payment
app.use('/api/accessories', accessoryRoutes); // /api/accessories
app.use('/api/order', salesRoutes);     // /api/order

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});