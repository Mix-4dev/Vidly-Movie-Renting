const express = require('express');
const router = express.Router();
const { genreSchema, Genre } = require("../models/genre");
const { Movie, validateMovie } = require("../models/movie");
const { default: mongoose } = require("mongoose");
const { getMovies, getMovie, addMovie } = require('../controllers/movies');

router.get("/", getMovies);

router.get("/:id", getMovie);

router.post("/", addMovie);

module.exports = router;