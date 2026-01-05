const net = require('net');
const { v4: uuidv4 } = require('uuid');
const notificationsTemplate = require('./mock-notifications.json');

const clients = new Map();

const PORT = 3001;

const createNotification = (template) => {
  const timestamp = new Date().toISOString();
  return {
    ...template,
    event_id: uuidv4(),
    timestamp
  };
};

let currentIndex = 0;

setInterval(() => {
  const template = notificationsTemplate[currentIndex];
  const notification = createNotification(template);
  currentIndex = (currentIndex + 1) % notificationsTemplate.length;

  clients.forEach((socket, connectionId) => {
    if (socket.writable) {
      socket.write(JSON.stringify(notification) + '\n');
      console.log(`📤 Sent ${JSON.stringify(notification)} to connection ${connectionId}`);
    }
  });
}, 10000);

const server = net.createServer((socket) => {
  const connectionId = uuidv4();
  clients.set(connectionId, socket);
  console.log(`✅ New client connected: ${connectionId}`);

  socket.on('end', () => {
    clients.delete(connectionId);
    console.log(`❌ Client disconnected: ${connectionId}`);
  });

  socket.on('error', (err) => {
    console.error(`❌ Socket error (${connectionId}):`, err.message);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 TCP Server running on port ${PORT}`);
});
