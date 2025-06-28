// Common JS require function
const Joi = require("joi");
const express = require('express');
const app = express();
app.use(express.json());

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Romance" },
  { id: 3, name: "Sci-fi" },
  { id: 4, name: "Comedy" },
];

/*const movies = [

  
  {
    id: 1,
    name: 'The Matrix',
    genre: 'Action/Sci-fi',
    date: 1999,
    rate: 8.7,
    price: 15,
  },
  {
    id: 2,
    name: "The Godfather",
    genre: "Crime/Crime",
    date: 1972,
    rate: 9.2,
    price: 30,
  },
  {
    id: 3,
    name: "The Godfather Part II",
    genre: "Crime/Drama ",
    date: 1974,
    rate: 9,
    price: 20,
  },
  
];*/

// Home page
app.get("/", (request, response) => {
  response.send('Welcome to Vidly for Renting Movies');
});

app.get("/api/genres", (req, res) => {
  res.send(genres);
});

app.get("/api/genres/:id", (req, res) => {
  const parsedID = parseInt(req.params.id);
  const genre = genres.find(ele => ele.id === parsedID);
  if ( isNaN(parsedID) ) return res.status(400).send("Invalid ID");
  else if (!genre) return res.status(404).send("Resource not found");
  res.send(genre);
});

function validateMovie(genre) {
  const movieSchema = Joi.object({
    name: Joi.string().min(4).max(20).required(),
});
  return result = movieSchema.validate( genre, { abortEarly: false } );
}

app.post('/api/genres', (req, res) => {
  const { error, value } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // RESTful convention is to return the added genre
  const newGenre = { id: genres.length + 1, name: value.name, };
  genres.push(newGenre);
  res.send(newGenre);
});

app.put("/api/genres/:id", (req, res) => {
  const parsedID = parseInt(req.params.id);
  const genre = genres.find(ele => ele.id === parsedID);
  if ( isNaN(parsedID) ) return res.status(400).send("Invalid ID");
  else if (!genre) return res.status(404).send("Resource not found");

  const { error, value } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  genre.name = value.name;
  res.send(genre);
});

app.delete("/api/genres/:id", (req, res) => {
  const parsedID = parseInt(req.params.id);
  const genre = genres.find(ele => ele.id === parsedID);
  if ( isNaN(parsedID) ) return res.status(400).send("Invalid ID");
  else if (!genre) return res.status(404).send("Resource not found");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
});

const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}`));
