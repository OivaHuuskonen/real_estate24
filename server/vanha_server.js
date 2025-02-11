import { ServerSideEncryption } from "@aws-sdk/client-s3"

/*import 'dotenv/config';
import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import { DATABASE } from "./config.js";
import authRoutes from "./routes/auth.js";
import adRoutes from "./routes/ad.js";
import axios from "axios"; // Axios tarvitaan Geocoding API -kutsuja varten

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
  origin: ['http://localhost:5173', 'https://real-estate0824.onrender.com']
}));


// routes middleware
app.use("/api", authRoutes);
app.use("/api", adRoutes);*/

// Geocoding API -reitti
/*  console.log("Request received for /geocode");
  console.log("Query parameters:", req.query);
  const { address } = req.query;

  if (!address) {
    return res.status(400).json({ error: "Address is required" });
  }

  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address,
        key: process.env.GOOGLE_API_KEY,
      },
    });

    if (response.data.status !== "OK") {
      return res.status(400).json({ error: response.data.error_message || "Geocoding failed" });
    }

    res.json(response.data);
  } catch (err) {
    console.error("Geocoding API error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.use('/api', router);*/

// Testi reitti palvelimessa
/*app.get("/test", (req, res) => {
  res.send("Test route works!");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

netstat -ano | findstr 8000
taskkill /F /PID 768759*/
