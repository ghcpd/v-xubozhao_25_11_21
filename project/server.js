const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 12345;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/fixed', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index_fixed.html'));
});

app.listen(port, '127.0.0.1', () => console.log(`Server listening on http://127.0.0.1:${port}`));
