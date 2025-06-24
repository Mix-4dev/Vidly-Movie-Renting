// Common JS require function
const express = require('express');
const app = express();

const movies = [
  {
    name: 'The Matrix',
    genre: 'Action/Sci-fi',
    date: 1999,
    rate: 8.7,
    price: 15,
  },
];
// Home page
app.get('/vidly.com', (req, res) => {
  res.send('Welcome to Vidly for Renting Movies');
});

app.get('/vidly.com/api/movies', (req, res) => {
  res.send(movies);
});

app.post('/vidly.com/api/movies', (req, res) => {
  const newMovie = {
    id: movies.length + 1,
    name: req.body.name
  };
  movies.push(newMovie);
  res.send(movies);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
