const validateMovie = require("../validateMovie");
const express = require('express');
const router = express.Router();

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Romance" },
  { id: 3, name: "Sci-fi" },
  { id: 4, name: "Comedy" },
];

router.get("/", (req, res) => {
  res.send(genres);
});

router.get("/:id", (req, res) => {
  const parsedID = parseInt(req.params.id);
  const genre = genres.find(ele => ele.id === parsedID);
  if ( isNaN(parsedID) ) return res.status(400).send("Invalid ID");
  else if (!genre) return res.status(404).send("Resource not found");
  res.send(genre);
});

router.post('/', (req, res) => {
  const { error, value } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // RESTful convention is to return the added genre
  const newGenre = { id: genres.length + 1, name: value.name, };
  genres.push(newGenre);
  res.send(newGenre);
});

router.put("/:id", (req, res) => {
  const parsedID = parseInt(req.params.id);
  const genre = genres.find(ele => ele.id === parsedID);
  if ( isNaN(parsedID) ) return res.status(400).send("Invalid ID");
  else if (!genre) return res.status(404).send("Resource not found");

  const { error, value } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  genre.name = value.name;
  res.send(genre);
});

router.delete("/:id", (req, res) => {
  const parsedID = parseInt(req.params.id);
  const genre = genres.find(ele => ele.id === parsedID);
  if ( isNaN(parsedID) ) return res.status(400).send("Invalid ID");
  else if (!genre) return res.status(404).send("Resource not found");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
});
module.exports = router;