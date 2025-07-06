const validateMovie = require("../validateMovie");
const mongoose = require("mongoose");
const express = require('express');
const router = express.Router();


const Genre = mongoose.model("Genre", new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 50 }
  })
);

router.get("/", async (req, res) => {
  const genres = await Genre.find({}, {name:1, _id:0}).sort("name");
  res.send(genres);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(parsedID);
  if (!genre) return res.status(404).send("Resource not found");
  res.send(genre);
});

router.post('/', async (req, res) => {
  const { error, value } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // RESTful convention is to return the added genre
  let newGenre = new Genre( { name: value.name, } );
  newGenre = await newGenre.save();
  res.send(newGenre);
});

router.put("/:id", async (req, res) => {
  const { error, value } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = await Genre.findByIdAndUpdate(req.params.id,{ $set: {name: value.name} }, {new: true});
  if (!genre) return res.status(404).send("Resource not found");
  res.send(genre);
});

router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);
  if (!genre) return res.status(404).send("Resource not found");
  res.send(genre);
});

module.exports = router;