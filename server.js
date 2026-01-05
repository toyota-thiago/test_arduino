import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: process.env.PORT || 3000 });

wss.on("connection", (ws) => {
  console.log("✅ ESP conectado via WebSocket");

  // envia evento a cada 10s (exemplo)
  const interval = setInterval(() => {
    const msg = JSON.stringify({
      event: "vibrate",
      ts: Date.now()
    });
    ws.send(msg);
    console.log("📤 Evento enviado");
  }, 10000);

  ws.on("close", () => {
    console.log("❌ ESP desconectado");
    clearInterval(interval);
  });
});