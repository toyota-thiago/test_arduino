const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

let lastEvent = {
  type: "boot",
  timestamp: new Date().toISOString()
};

// atualiza o JSON a cada 5s
setInterval(() => {
  lastEvent = {
    type: "event",
    timestamp: new Date().toISOString(),
    value: Math.random()
  };
  console.log("📤 Novo evento:", lastEvent);
}, 10000);

// endpoint que o ESP chama
app.get('/event', (req, res) => {
  res.json(lastEvent);
});

app.get('/', (req, res) => {
  res.send("OK");
});

app.listen(PORT, () => {
  console.log(`🚀 HTTP server rodando na porta ${PORT}`);
});
