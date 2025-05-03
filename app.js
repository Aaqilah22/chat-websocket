// Membuat koneksi ke server WebSocket
const socket = new WebSocket('ws://localhost:8080');

// Ketika koneksi WebSocket terbuka
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
  messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll ke bawah otomatis
};

// Fungsi untuk mengirim pesan
function sendMessage() {
  const messageInput = document.getElementById('message-input');
  const message = messageInput.value;

  // Mengirim pesan ke server WebSocket
  if (message.trim() !== '') {
    socket.send(message);
    messageInput.value = ''; // Mengosongkan input setelah mengirim pesan
  }
}
