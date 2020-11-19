const express = require("express");
const axios = require("axios");
const cors = require("cors");
const md5 = require("md5");

const app = express();
app.use(cors());

require("dotenv").config();

const api_key = process.env.API_KEY;
const api_secret = process.env.API_SECRET;

app.get("/pick", async (req, res) => {
  const date = new Date();
  const timestamp = Math.floor(date.getTime() / 1000);

  const hash = md5(timestamp + api_secret + api_key);
  console.log(req.query);
  const offset = req.query.skip;
  try {
    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${api_key}&hash=${hash}&limit=100&offset=${offset}`
    );
    res.status(200).json({ data: response.data });
  } catch (error) {
    console.log(error.response);
    res.status(400).json({ error: error.message });
  }
});

app.get("/comics", async (req, res) => {
  const date = new Date();
  const timestamp = Math.floor(date.getTime() / 1000);

  const hash = md5(timestamp + api_secret + api_key);
  console.log(req.query);
  const offset = req.query.skip;
  try {
    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/comics?orderBy=title&ts=${timestamp}&apikey=${api_key}&hash=${hash}&limit=100&offset=${offset}`
    );
    res.status(200).json({ data: response.data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/research", async (req, res) => {
  const date = new Date();
  const timestamp = Math.floor(date.getTime() / 1000);

  const hash = md5(timestamp + api_secret + api_key);
  const name = req.query.value;
  const offset = req.query.skip;
  console.log(name);

  try {
    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/comics?orderBy=title&titleStartsWith=${name}&ts=${timestamp}&apikey=${api_key}&hash=${hash}&limit=100&offset=${offset}`
    );
    res.status(200).json({ data: response.data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/search", async (req, res) => {
  const date = new Date();
  const timestamp = Math.floor(date.getTime() / 1000);

  const hash = md5(timestamp + api_secret + api_key);
  const name = req.query.value;
  const offset = req.query.skip;
  console.log(name);

  try {
    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${name}&ts=${timestamp}&apikey=${api_key}&hash=${hash}&limit=100&offset=${offset}`
    );
    res.status(200).json({ data: response.data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/hero", async (req, res) => {
  const date = new Date();
  const timestamp = Math.floor(date.getTime() / 1000);

  const hash = md5(timestamp + api_secret + api_key);
  const id = req.query.id;
  try {
    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/characters/${id}?ts=${timestamp}&apikey=${api_key}&hash=${hash}`
    );
    res.status(200).json({ data: response.data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/hero/comics", async (req, res) => {
  const date = new Date();
  const timestamp = Math.floor(date.getTime() / 1000);

  const hash = md5(timestamp + api_secret + api_key);
  console.log(req.query);
  const id = req.query.id;
  try {
    const response = await axios.get(
      `http://gateway.marvel.com/v1/public/characters/${id}/comics?ts=${timestamp}&apikey=${api_key}&hash=${hash}`
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
