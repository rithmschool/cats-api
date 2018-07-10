const express = require('express');
const bodyParser = require('body-parser');
const validate = require('jsonschema').validate;
const catSchema = require('./catSchema');

const app = express();
app.use(bodyParser.json());

app.get('/cats', (req, res, next) => {
  res.send('got all cats');
});

app.post('/cats', (req, res, next) => {
  const validation = validate(req.body, catSchema);
  if (!validation.isValid) {
    return next(validation.errors);
  }
  return res.send('SUCCESS');
});

app.get('/cats/:id', (req, res, next) => {
  res.send(`got ${req.params.id} cat`);
});

app.patch('/cats/:id', (req, res, next) => {
  // TO BE IMPLEMENTED BY YOU
  res.send(`patched ${req.params.id} cat`);
});

app.delete('/cats/:id', (req, res, next) => {
  res.send(`deleted ${req.params.id} cat`);
});

app.use((error, req, res, next) => {
  let message = error.message;
  if (Array.isArray(error)) {
    message = error.map(e => e.stack);
  }
  res.status(error.status || 500).send({ error: message });
});

app.listen(3000, () => {
  console.log('App is listening on port 3000.');
});
