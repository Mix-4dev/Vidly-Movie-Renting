const express = require('express');
const router = express.Router();
const { genreSchema, Genre } = require("../models/genre");
const { Movie, validateMovie } = require("../models/movie");
const { default: mongoose } = require("mongoose");

router.get("/", async (req, res) => {
  const movies = await Movie.find({}, {}).sort("name");
  res.status(200).json(movies);
},);

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(id);
  if (!movie) return res.status(404).json("Resource not found");
  res.status(200).json(movie);
},);

router.post("/", async (req, res) => {
  const { error, value } = validateMovie(req.body);
  if (error) return res.status(400).json("Bad Request", error.details[0].message);

  const genre = await Genre.findById(value.genreId);
  if (!genre) return res.status(400).json("Bad Request, Invalid Genre");

  const movie = new Movie({
    title: value.title,
    genre: {
      _id: genre.id,
      name: genre.name
    },
    numberInStock: value.numberInStock,
    dailyRentalRate: value.dailyRentalRate
  });
  const result = await movie.save();
  console.log(result);
},);

module.exports = router;