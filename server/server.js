import 'dotenv/config';
import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import { DATABASE } from "./config.js";
import authRoutes from "./routes/auth.js";
import adRoutes from "./routes/ad.js";

const app = express();
app.use(cors());
app.use(express.static('dist'));

// db
mongoose.set("strictQuery", false);
mongoose
  .connect(DATABASE)
  .then(() => console.log("DB connected"))
  .catch((err) => {
    console.error("DB connection error:", err.message);
  });

// middlewares
app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));

app.use(cors({
  origin: ['http://localhost:5173', '']
}));


// routes middleware
app.use("/api", authRoutes);
app.use("/api", adRoutes);

// Testi reitti palvelimessa
app.get("/test", (req, res) => {
  res.send("Test route works!");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

/*netstat -ano | findstr 8000
taskkill /F /PID */
