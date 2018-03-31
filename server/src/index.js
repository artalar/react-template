const express = require('express');
const bodyParser = require('body-parser');

const logger = require('./logger');

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());

app.get('/api/me', (req, res) => {
  logger('/api/me', '\n', req.body);
  res.send({ permissions: ['admin'] });
});

app.listen(port, () => logger(`Start at ${port} port`));