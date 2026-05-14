const express = require('express');
const cors = require('cors');

const app = express();
const feedbacks = [];

app.use(cors());
app.use(express.json());

app.get('/feedbacks', (req, res) => {
  res.json(feedbacks);
});

app.post('/feedbacks', (req, res) => {
  const { title } = req.body;
  const feedback = { id: Date.now(), title };
  feedbacks.push(feedback);
  res.status(201).json(feedback);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
