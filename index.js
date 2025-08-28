// Common JS require function
const homeRouter = require('./routes/home');
const genresRouter = require('./routes/genres');
const credentials = require('./middleware/credentials');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use('/', credentials);
app.use('/', bodyParser.json());
app.use('/api/genres', genresRouter);
app.use('/', homeRouter);

// if (app.get('env') === 'development') {
//   app.use(morgan('dev'));
//   console.log('Morgan is enables');
// }

const port = process.env.PORT || 80;
app.listen(port, () => console.log(`http://localhost:${port}`));
