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

app.listen(5001, () => {
  console.log('Server started on port 5001')
})