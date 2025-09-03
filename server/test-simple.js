const express = require('express');
const app = express();

// Middleware básico
app.use(express.json());

// Ruta de prueba
app.get('/test', (req, res) => {
  res.json({ message: 'Test successful' });
});

// Iniciar servidor
const server = app.listen(5001, () => {
  console.log('Test server running on port 5001');
});

module.exports = app; 