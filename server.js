const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  console.log("📥 ESP32 bateu no servidor");
  res.status(200).send("OK");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 HTTP server rodando na porta ${PORT}`);
});
