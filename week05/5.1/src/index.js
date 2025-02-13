'use strict';

const express = require('express');
const morgan = require('morgan');

const studentRouter = require('./routers/students');
const { errorHandler } = require('./middleware/errors');

const app = express();

app.use(express.json());
app.use(morgan('tiny'));

app.use('/api/students', studentRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, (err) => {
  if (err) {
    console.error('Something went wrong', err);
    return;
  }
  console.log(`Server running at ${PORT}`);
});