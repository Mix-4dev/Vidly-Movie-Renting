const Joi = require('joi');
const validateMovie = (genre) => {
  const movieSchema = Joi.object({
    name: Joi.string().min(4).max(20).required(),
  });
  return (result = movieSchema.validate(genre, { abortEarly: false }));
};
module.exports = validateMovie;
