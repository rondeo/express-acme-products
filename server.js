const express = require('express');
const path = require('path');

const port = process.env.PORT || 3000; // uses process.env.PORT in case deployed

const app = express();

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/api/data', (req, res, next) =>{
  res.send({random: Math.random()});
})

app.listen(port, () => console.log(`Listening on port: ${port}`));