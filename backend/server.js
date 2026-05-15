require('dotenv').config();
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

app.get('/weather', async (req, res) => {
  const city = req.query.city || 'Paris';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${process.env.OWM_API_KEY}&units=metric&lang=fr`;
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) {
    return res.status(502).json({ error: data.message || 'Erreur météo' });
  }
  res.json({
    city: data.name,
    temperature: Math.round(data.main.temp),
    description: data.weather[0].description,
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
