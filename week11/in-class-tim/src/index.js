'use strict';

require('dotenv/config');
const express = require('express');
const ExpressMongoSanitize = require('express-mongo-sanitize');
const morgan = require('morgan');

const studentRouter = require('./routers/students');
const { errorHandler } = require('./middleware/errors');
const { connect } = require('./models/db');
const sanitizeBody = require('./middleware/sanitizeBody');
const logger = require('./util/logger');

connect();

const app = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use(ExpressMongoSanitize());
app.use(sanitizeBody);

app.use('/api/students', studentRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, (err) => {
  if (err) {
    logger.error('Something went wrong', err);
    return;
  }
  logger.log(`Server running at ${PORT}`);
});
