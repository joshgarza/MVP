const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
  res.json({"users": ["userOne", "userTwo"]})
})

app.get('/api/test', (req, res) => {
  res.status(200).send('testing endpoint')
})

app.get('/api/login/:id', (req, res) => {
  let user = {
    email: req.query.email,
    id: req.query.firebaseId
  }
  res.status(200).send(user)
})
app.get('/api/signup/:id', (req, res) => {
  let user = {
    email: req.query.email,
    id: req.query.firebaseId
  }
  res.status(201).send(user)
})

app.listen(5001, () => {
  console.log('Server started on port 5001')
})