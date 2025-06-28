// Common JS require function
const genres = require("./routes/genres");
const home = require("./routes/home");
const credentials = require("./middleware/credentials");
const morgan = require("morgan");
const express = require('express');
const app = express();

app.use(express.json());
app.use("/api/genres", genres);
app.use("/", home);
app.use(credentials);

if (app.get('env') === "development") {
  app.use(morgan("dev"));
  console.log('Morgan is enables');
}

const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}`));