import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import paymentRoutes from "./routes/Payment.js";  // Import your routes
import accessoryRoutes from "./routes/Accessory.js";

// App config
const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// DB connection
connectDB();

// Register routes (e.g., /api/payment)
app.use("/api", paymentRoutes);
app.use('/api/accessories', accessoryRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API Working");
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
