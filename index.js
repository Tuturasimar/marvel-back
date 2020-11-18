const express = require("express");
const axios = require("axios");
const cors = require("cors");
const md5 = require("md5");

const app = express();
app.use(cors());

require("dotenv").config();

api_key = process.env.API_KEY;
api_secret = process.env.API_SECRET;

const date = new Date();
const timestamp = Math.floor(date.getTime() / 1000);

const hash = md5(timestamp + api_secret + api_key);

app.get("/pick", async (req, res) => {
  try {
    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${api_key}&hash=${hash}&limit=100`
    );
    res.status(200).json({ data: response.data });
  } catch (error) {
    res.status().json({ error: error.message });
  }
});

app.get("/hero", async (req, res) => {
  console.log(req.query);
  id = req.query.id;
  try {
    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/characters/${id}?ts=${timestamp}&apikey=${api_key}&hash=${hash}`
    );
    res.status(200).json({ data: response.data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.json("Bienvenue");
});

app.all("*", (req, res) => {
  res.json("Route indisponible");
});

app.listen(process.env.PORT || 3100, () => {
  console.log("Server started");
});
