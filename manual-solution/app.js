const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.get('/cats', (req, res, next) => {
  res.send('got all cats');
});

function isCorrectType(actual, expected) {
  if (expected === 'array') {
    return Array.isArray(actual);
  } else if (expected === 'null') {
    return actual === null;
  }
  return typeof actual === expected;
}

app.post('/cats', (req, res, next) => {
  const required = { name: 0, color: 0, age: 0 };
  const optional = { designated_humans: 0 };

  // check for bad attributes
  for (let key in req.body) {
    if (!required.hasOwnProperty(key) && !optional.hasOwnProperty(key)) {
      const extraKeyErr = new Error(`'${key}' is not a valid cat attribute!`);
      extraKeyErr.status = 400;
      return next(extraKeyErr);
    } else if (required.hasOwnProperty(key)) {
      required[key]++;
    } else if (optional.hasOwnProperty(key)) {
      optional[key]++;
    }
  }

  // check for required keys
  for (let key in required) {
    if (required[key] === 0) {
      const extraKeyErr = new Error(`'${key}' is required for all cats!`);
      extraKeyErr.status = 400;
      return next(extraKeyErr);
    }
  }

  // validate types
  if (!isCorrectType(req.body.name, 'string')) {
    const wrongTypeError = new Error(`Name must be a string!`);
    wrongTypeError.status = 400;
    return next(wrongTypeError);
  } else if (!isCorrectType(req.body.color, 'string')) {
    const wrongTypeError = new Error(`Color must be a string!`);
    wrongTypeError.status = 400;
    return next(wrongTypeError);
  } else if (!isCorrectType(req.body.age, 'number')) {
    const wrongTypeError = new Error(`Age must be a number!`);
    wrongTypeError.status = 400;
    return next(wrongTypeError);
  } else if (
    req.body.designated_humans &&
    !isCorrectType(req.body.designated_humans, 'array')
  ) {
    const wrongTypeError = new Error(
      `Designated Owners must be an array if you include it!`
    );
    wrongTypeError.status = 400;
    return next(wrongTypeError);
  }
  res.send('posted to all cats');
});

app.get('/cats/:id', (req, res, next) => {
  res.send(`got ${req.params.id} cat`);
});

app.patch('/cats/:id', (req, res, next) => {
  const optional = { name: 0, color: 0, age: 0, designated_humans: 0 };

  // check for bad attributes
  for (let key in req.body) {
    if (!optional.hasOwnProperty(key)) {
      const extraKeyErr = new Error(`'${key}' is not a valid cat attribute!`);
      extraKeyErr.status = 400;
      return next(extraKeyErr);
    } else if (optional.hasOwnProperty(key)) {
      optional[key]++;
    } else if (optional.hasOwnProperty(key)) {
      optional[key]++;
    }
  }
  // check types
  if (req.body.name && !isCorrectType(req.body.name, 'string')) {
    const wrongTypeError = new Error(`Name must be a string!`);
    wrongTypeError.status = 400;
    return next(wrongTypeError);
  } else if (req.body.color && !isCorrectType(req.body.color, 'string')) {
    const wrongTypeError = new Error(`Color must be a string!`);
    wrongTypeError.status = 400;
    return next(wrongTypeError);
  } else if (req.body.age && !isCorrectType(req.body.age, 'number')) {
    const wrongTypeError = new Error(`Age must be a number!`);
    wrongTypeError.status = 400;
    return next(wrongTypeError);
  } else if (
    req.body.designated_humans &&
    !isCorrectType(req.body.designated_humans, 'array')
  ) {
    const wrongTypeError = new Error(
      `Designated Owners must be an array if you include it!`
    );
    wrongTypeError.status = 400;
    return next(wrongTypeError);
  }
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
