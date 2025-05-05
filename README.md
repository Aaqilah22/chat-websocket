|Keterangan|Terlampir|
|:---------|:--------|
|Nama|Aaqilah Aathirah Sutisna|
|NIM|312310621|
|Kelas|TI.23.A6|
|Mata Kuliah|Pemograman Web 2|

# Langkah 1 : Persiapan 
## Instal Visual Studio Code (VSCode)
## Instal Node.Js
- Kunjungi situs resmi [Node.js](https://nodejs.org) dan instal versi LTS (long Term Support).
- Setelah instalasi, cek apakah Node.js terinstal dengan menjalannkan diterminal atau CMD.
  ```node --version```
## Buka folder chat-websocket di CMD
```cd path/to/chat-websocket``` atau dengan contoh (```cd \xampp\htdocs\chat-websocket```)
## Perintahkan Lagi di CMD : 
```npm init -y```
Maka akan menghasilkan

![image](https://github.com/user-attachments/assets/7b41cf7f-1484-4b8c-88d4-f431711024e8)

## Install WebSocket Librari (ws)
jalankan perintak di CMD untuk menginstal pustaka ```ws``` yang digunakan untuk membuat WebSocket server: ```npm install ws```

![image](https://github.com/user-attachments/assets/f1400124-8027-4bfd-9879-247ef998aaaf)

# Langkah 2 : Membuat Server WebSocket di Node.js
## Buat Folder Proyek 
- Buat folder baru untuk proyek Anda (chat-websocket)
- Buka Folder tersebut di VSCode.
## Buat File Server (```server.js```) di dalam folder proyek, dengan Code:
```
// Import pustaka WebSocket
const WebSocket = require('ws');

// Membuat server WebSocket pada port 8080
const wss = new WebSocket.Server({ port: 8080 });

// Ketika klien terhubung ke server
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
```
## Penjelasan Code :
- ```const WebSocket = require('ws');```: Mengimpor pustaka ws untuk membuat server WebSocket.
- ```const wss = new WebSocket.Server({ port: 8080 });```: Membuat server WebSocket yang berjalan pada port 8080.
- ```wss.on('connection', ...)```: Event yang dipicu ketika klien terhubung ke server WebSocket.
- ```ws.on('message', ...)```: Event yang menangani pesan yang diterima dari klien.
- ```wss.clients.forEach(client => { ... })```: Menyebarkan pesan yang diterima dari satu klien ke semua klien lain yang terhubung.
- ```ws.send('Welcome to the WebSocket server!')```: Mengirimkan pesan sambutan ke klien yang baru terhubung.

## Jalankan Server
- Di CMD, jalankan perintak berikut untuk menjalankan server WebSocket:
  ```node server.js```
- Server WebSocket akan berjalan di ```ws://localhost:8080```

# Langkah 3 : Membuat Klien (Frontend)
## Buat File HTML untuk Klien (```index.html```)
- Buat file ```index.html``` di folder yang sama.
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chat App</title>
  <style>
    #messages {
      width: 100%;
      height: 200px;
      border: 1px solid #ccc;
      margin-bottom: 10px;
      overflow-y: scroll;
    }
    #message-input {
      width: 80%;
      padding: 10px;
    }
    button {
      padding: 10px;
    }
  </style>
</head>
<body>

  <div id="messages"></div>
  <input type="text" id="message-input" placeholder="Type a message" />
  <button onclick="sendMessage()">Send</button>

  <script src="app.js"></script>
</body>
</html>
```
## Penjelasan Code : 
- ```messages```: Div untuk menampilkan pesan chat yang diterima.
- ```message-input```: Input field tempat pengguna mengetik pesan.
- ```button```: Tombol untuk mengirim pesan.

## Buat File JavaScript untuk Klien (```app.js```) di folder yang sama.
```
// Membuat koneksi WebSocket ke server yang berjalan di localhost:8080
const socket = new WebSocket('ws://localhost:8080');

// Ketika koneksi WebSocket berhasil
socket.onopen = () => {
  console.log('Connected to the WebSocket server');
};

// Ketika menerima pesan dari server
socket.onmessage = (event) => {
  const message = event.data;
  console.log('Message from server: ', message);

  // Menampilkan pesan di area chat
  const messagesDiv = document.getElementById('messages');
  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  messagesDiv.appendChild(messageElement);
  messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll otomatis ke bawah
};

// Fungsi untuk mengirim pesan
function sendMessage() {
  const messageInput = document.getElementById('message-input');
  const message = messageInput.value;

  // Mengirim pesan ke server WebSocket jika input tidak kosong
  if (message.trim() !== '') {
    socket.send(message);
    messageInput.value = ''; // Mengosongkan input setelah mengirim pesan
  }
}
```
## Penjelasan Code :
- ```new WebSocket('ws://localhost:8080')```: Membuat koneksi WebSocket ke server yang berjalan di ```ws://localhost:8080```.
- ```socket.onopen```: Event yang dipicu saat koneksi WebSocket berhasil dibuka.
- ```socket.onmessage```: Event yang dipicu ketika menerima pesan dari server dan menampilkannya di area chat.
- ```sendMessage()```: Fungsi untuk mengirim pesan yang dimasukkan oleh pengguna ke server WebSocket.

# Langkah 4 : Uji Aplikasi
## Buka Klien di Browser:
Di VSCode, buka file index.html di browser. Anda bisa melakukannya dengan klik kanan pada file index.html dan pilih Open with Live Server jika sudah menginstal ekstensi Live Server di VSCode. Jika belum, Anda bisa membuka file secara manual di browser.

![image](https://github.com/user-attachments/assets/5681b60d-aa51-46c2-ae6b-f15f2caf7d70)

## Buka Beberapa Tab:
- Buka beberapa tab di browser untuk menguji komunikasi antar tab. Setiap tab akan menjadi klien yang terhubung ke server WebSocket yang sama.

Microsoft (Tab 1)
  
![image](https://github.com/user-attachments/assets/8bf31a0f-5ec2-4219-9c13-03c56fc2a9ed)

Chrome (Tab 2)

![image](https://github.com/user-attachments/assets/63dbb778-6269-469e-8521-27c337b9b248)

## Uji Pengiriman Pesan :

![image](https://github.com/user-attachments/assets/65eb98ea-99d3-4af6-9c6e-6ff7ab0fc387)
