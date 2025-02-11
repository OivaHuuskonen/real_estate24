// controllers/geocode.js
import axios from 'axios';

export const getGeocode = async (req, res) => {
  try {  
    const { place_id } = req.query;
    if (!place_id) return res.status(400).json({ error: "place_id is required" });

    const apiKey = process.env.GOOGLE_GEOCODE_API_KEY;
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
      params: { 
        place_id, 
        key: apiKey 
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error("Geocoding error:", error.message);
    res.status(500).json({ error: "Google Geocoding request failed" });
  }
};