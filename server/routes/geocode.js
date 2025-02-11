import express from "express";
import { getGeocode } from "../controllers/geocode.js";

const router = express.Router();

router.get("/geocode", getGeocode);

export default router;



/*import express from "express";
import { GOOGLE_GEOCODER } from "../config.js";
//import NodeGeocoder from 'node-geocoder';

const router = express.Router();*/

/*const options = {
  provider: 'google',
  apiKey: process.env.GOOGLE_API_KEY || 'AIzaSyCc2ET1LOp61DlbrtMjYNOzcQEhc0MzzFs', // Korvaa 'YOUR_GOOGLE_API_KEY' oikealla avaimella
  formatter: null,
};

const GOOGLE_GEOCODER = NodeGeocoder(options);*/

/*router.get("/", async (req, res) => {
  try {
    const { place_id } = req.query;

    console.log("Received place_id:", place_id); // Lisätty lokitus

    if (!place_id) {
      return res.status(400).json({ error: "place_id is required" });
    }

    console.log("Fetching geocode for place_id:", place_id);

    const result = await GOOGLE_GEOCODER.geocode({ placeId: place_id });

    const apiKey = process.env.GOOGLE_API_KEY || "YOUR_HARD_CODED_API_KEY";
    console.log("Using Google API Key:", apiKey);

    console.log("Geocode result:", result); // Lisätty lokitus

    if (!result || result.length === 0) {
      return res.status(404).json({ error: "Location not found" });
    }

    res.json({ results: result });
  } catch (error) {
    console.error("Geocode API error:", error);
    console.error("Error response:", error.response?.data); // Tulostaa API-vastauksen, jos saatavilla
    res.status(500).json({ error: "Google Geocoding request failed", details: error.message });
  }
});

export default router;*/


/*
import express from "express";
import { GOOGLE_GEOCODER } from "../config.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { place_id } = req.query;

    if (!place_id) {
      return res.status(400).json({ error: "place_id is required" });
    }

    console.log("Fetching geocode for place_id:", place_id);

    const result = await GOOGLE_GEOCODER.geocode({ placeId: place_id });

    if (!result || result.length === 0) {
      return res.status(404).json({ error: "Location not found" });
    }

    res.json({ results: result });
  } catch (error) {
    console.error("Geocode API error:", error);
    console.error("Error response:", error.response?.data);
    res.status(500).json({ error: "Google Geocoding request failed", details: error.message });
  }
});

export default router;


import express from "express";
import { GOOGLE_GEOCODER } from "../config.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { place_id } = req.query;

    if (!place_id) {
      return res.status(400).json({ error: "place_id is required" });
    }

    console.log("Fetching geocode for place_id:", place_id);

    const result = await GOOGLE_GEOCODER.geocode({ 
      placeId: place_id // Google API Key haetaan automaattisesti config.js:stä
    });

    if (!result || result.length === 0) {
      return res.status(404).json({ error: "Location not found" });
    }

    res.json({ results: result });
  } catch (error) {
    console.error("Geocode API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Google Geocoding request failed" });
  }
});

export default router;


--------------



import express from "express";
import { GOOGLE_GEOCODER } from "../config.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { place_id } = req.query;

    if (!place_id) {
      return res.status(400).json({ error: "place_id is required" });
    }

    console.log("Geocoding place_id:", place_id); // DEBUG

    const result = await GOOGLE_GEOCODER.geocode({ 
        placeId: place_id,
        key: process.env.GOOGLE_API_KEY // Pakotetaan avain käyttöön
     });

    if (!result || result.length === 0) {
      return res.status(404).json({ error: "Location not found" });
    }

    res.json({ results: result });
  } catch (error) {
    console.error("Geocode API error:", error); // Tämä tulostaa virheen serverin lokiin
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;*/