const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.get('/cats', (req, res, next) => {
  res.send('got all cats');
});

app.post('/cats', (req, res, next) => {
  console.log(req.body);
  // Return an error if there is no cat name
  // Return an error if there is no cat color
  // Return an error if there is no cat age
  // return an error if the cat name is not a string
  // return an error if the cat color is not a string
  // return an error if the cat age is not a number
  // return an error if designated owners are not null and not an array
  res.send('posted to all cats');
});

app.get('/cats/:id', (req, res, next) => {
  res.send(`got ${req.params.id} cat`);
});

app.patch('/cats/:id', (req, res, next) => {
  // Return an error if there is no cat name
  // Return an error if there is no cat color
  // Return an error if there is no cat age
  // return an error if the cat name is not a string
  // return an error if the cat color is not a string
  // return an error if the cat age is not a number
  // return an error if designated owners are not null and not an array
  if (!req.body.name) {
    const nameError = new Error('Cat has no name!');
    nameError.status = 400;
    return next(nameError);
  }
  res.send(`patched ${req.params.id} cat`);
});

app.delete('/cats/:id', (req, res, next) => {
  res.send(`deleted ${req.params.id} cat`);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).send({ error: error.message });
});

app.listen(3000, () => {
  console.log('App is listening on port 3000.');
});
