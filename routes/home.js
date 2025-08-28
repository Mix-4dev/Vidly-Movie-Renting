const express = require('express');
const homeRouter = express.Router();

// Home page
homeRouter.get('/', (req, res) =>
  res.send('Welcome to Vidly for Renting Movies')
);
module.exports = homeRouter;
