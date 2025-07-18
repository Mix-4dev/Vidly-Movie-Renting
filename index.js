// Common JS require function
const home = require("./routes/home");
const genres = require("./routes/genres");
const movies = require("./routes/movies");
const customers = require("./routes/customers");
const credentials = require("./middleware/credentials");
const express = require('express');
const mongoose = require("mongoose");
const morgan = require("morgan");
const app = express();

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/movies", movies);
app.use("/api/customers", customers);
app.use("/", home);
app.use(credentials);

if (app.get('env') === "development") {
  app.use(morgan("dev"));
  console.log('Morgan is enables');
}

mongoose.connect("mongodb://localhost/vidly") // equivalent to -> `use vidly` in mongoDB shell
.then(result => console.log("Connected to MongoDB"))
.catch(error => console.error(error.message))

const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}`));