
const Joi = require("joi");
const mongoose = require("mongoose");

const Genre = mongoose.model("Genre", new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 50 }
  })
);

function validateGenre(genre) {
  const movieSchema = Joi.object({
    name: Joi.string().min(4).max(20).required(),
});
  return movieSchema.validate( genre, { abortEarly: false } );
}
exports.Genre = Genre;
exports.validateGenre = validateGenre
