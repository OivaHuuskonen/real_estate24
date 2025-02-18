import dotenv from 'dotenv';
import 'dotenv/config'; 
import express from "express";
import geocodeRoutes from "./routes/geocode.js";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import { DATABASE } from "./config.js";
import authRoutes from "./routes/auth.js";
import adRoutes from "./routes/ad.js";
import axios from "axios";

dotenv.config();
const app = express();

// CORS-asetukset 
  /*app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'https://real-estate24-huz7.vercel.app'], 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'refresh_token']
}));
app.options("*", cors());*/



// CORS-asetukset
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://real-estate24-huz7.vercel.app',
  'https://real-estate24.vercel.app'
];

// Dynaaminen CORS-käsittelijä, joka sallii kaikki Vercel-domainit
const corsOptions = {
  origin: (origin, callback) => {
    // Salli pyynnöt ilman originia (esim. Postman tai samasta domainista tulevat)
    if (!origin) return callback(null, true);

    // Salli kaikki Vercel-alidomainit
    if (origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }

    // Salli vain sallitut originit
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'refresh_token', 'Accept']
};

app.use(cors(corsOptions));

app.use(express.static('dist'));

  const connectDB = async () => {
    try {
      await mongoose.connect(DATABASE); 
      console.log("✅ MongoDB Connected");
    } catch (error) {
      console.error("❌ MongoDB connection failed:", error);
      process.exit(1); // Sulkee sovelluksen, jos tietokantayhteys epäonnistuu
    }
  };
  
  // Yhdistetään tietokantaan ennen kuin server käynnistyy
  connectDB();

// Middlewares
app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));
//app.use(cors());

// Reitit
app.use("/api", authRoutes);
app.use("/api", adRoutes);
app.use("/api", geocodeRoutes);

// Testi reitti
app.get("/test", (req, res) => {
  res.send("Test route works!");
});

// Palvelimen käynnistys
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



//console.log("MongoDB URI:", process.env.DATABASE);
//console.log("Google API Key from ENV:", process.env.GOOGLE_GEOCODE_API_KEY);

// Geocoding API -reitti Expressin kautta
/*app.get('/geocode', async (req, res) => {
  try {  
    const { place_id } = req.query;
    console.log("Received place_id:", place_id); // Lisätty lokitus
    if (!place_id) return res.status(400).json({ error: "place_id is required" });

   // console.log("Using Google API Key:", apiKey); // Lisätty lokitus
    const apiKey = process.env.GOOGLE_GEOCODE_API_KEY;
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
      params: { place_id, key: apiKey }
    });

    console.log("Google Geocode API response:", response.data); // Lisätty lokitus

    res.json(response.data);
  } catch (error) {
    console.error("Geocoding error:", error.message);
    res.status(500).json({ error: "Google Geocoding request failed" });
  }
});*/
