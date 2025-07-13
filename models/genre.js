
const Joi = require("joi");
const mongoose = require("mongoose");
const genreSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 50 }
}
);
const Genre = mongoose.model("Genre", genreSchema);

function validateGenre(genre) {
  const genreSchema = Joi.object({
    name: Joi.string().min(4).max(20).required(),
});
  return genreSchema.validate( genre, { abortEarly: false } );
}
exports.Genre = Genre;
exports.validateGenre = validateGenre;
exports.genreSchema = genreSchema;
