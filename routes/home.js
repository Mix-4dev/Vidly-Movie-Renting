
const express = require('express');
const router = express.Router();

// Home page
router.get("/", (request, response) => {
  response.send('Welcome to Vidly for Renting Movies');
});
module.exports = router;