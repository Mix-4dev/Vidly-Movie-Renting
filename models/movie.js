const Joi = require("joi");
const { default: mongoose } = require("mongoose");
const { genreSchema } = require("./genre");

function validateMovie(movie) {
  const movieSchema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required(),
    genreId: Joi.string().required(),
  });
  return movieSchema.validate(movie, { abortEarly: false });
}

const movieSchema = new mongoose.Schema({
  title: { type: String, required: [true, "Movie title is required"], trim: true, minlength: 5, maxlength: 255 },
  numberInStock: { type: Number, required: true, min: 0, max: 200, },
  dailyRentalRate: { type: Number, required: true, min: 0, max: 50, },
  genre: { type: genreSchema, required: true },
});
const Movie = mongoose.model("movie", movieSchema);

exports.Movie = Movie;
exports.validateMovie = validateMovie;