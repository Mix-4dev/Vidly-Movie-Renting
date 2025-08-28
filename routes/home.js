const express = require('express');
const homeRouter = express.Router();
// Home page
homeRouter.get('/', (request, response) =>
  response.send('Welcome to Vidly for Renting Movies')
);
module.exports = homeRouter;
