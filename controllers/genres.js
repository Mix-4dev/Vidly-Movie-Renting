const { Genre, validateGenre } = require("../models/genre");

const getGenres = async (req, res) => {
  const genres = await Genre.find({}, {name:1, _id:1}).sort("name");
  res.send(genres);
}

const getGenre = async (req, res) => {
  const genre = await Genre.findById(parsedID);
  if (!genre) return res.status(404).send("Resource not found");
  res.send(genre);
}

const addGenre =  async (req, res) => {
  const { error, value } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // RESTful convention is to return the added genre
  let newGenre = new Genre( { name: value.name, } );
  newGenre = await newGenre.save();
  res.send(newGenre);
}

const updateGenre = async (req, res) => {
  const { error, value } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = await Genre.findByIdAndUpdate(req.params.id,{ $set: {name: value.name} }, {new: true});
  if (!genre) return res.status(404).send("Resource not found");
  res.send(genre);
}

const deleteGenre = async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);
  if (!genre) return res.status(404).send("Resource not found");
  res.send(genre);
}
module.exports = {
  getGenres,
  getGenre,
  addGenre,
  updateGenre,
  deleteGenre,
};