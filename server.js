const WebSocket = require('ws');  // Import WebSocket library

// Membuat server WebSocket pada port 8080
const wss = new WebSocket.Server({ port: 8080 });

// Ketika klien terhubung
wss.on('connection', (ws) => {
  console.log('A new client has connected.');

  // Ketika menerima pesan dari klien
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    
    // Mengirim pesan ke semua klien yang terhubung
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Mengirim pesan ke klien setelah terkoneksi
  ws.send('Welcome to the WebSocket server!');
});

console.log('WebSocket server is running on ws://localhost:8080');
