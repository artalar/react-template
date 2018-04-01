const express = require('express');
const bodyParser = require('body-parser');

const logger = require('./logger');

const app = express();
const port = process.env.PORT || 4000;

const delay = (ms = 5) => new Promise(r => setTimeout(r, ms));

app.use(bodyParser.json());

app.get('/api/me', async (req, res) => {
  logger('/api/me', '\n', req.body);
  await delay(500);
  res.send({ permissions: ['admin'] });
});

app.listen(port, () => logger(`Start at ${port} port`));
