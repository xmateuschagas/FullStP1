document.addEventListener('DOMContentLoaded', async () => {
    const socket = io();

    // Obtém o roomId a partir da URL
    const urlParams = new URLSearchParams(window.location.search);
    const roomId = urlParams.get('roomId');
    const roomNameElement = document.getElementById('room-name');
    const messagesElement = document.getElementById('messages');
    const messageForm = document.getElementById('message-form');
    const messageInput = document.getElementById('message-input');

    // Busca o nome da sala usando o roomId
    try {
        const response = await fetch(`/api/rooms/${roomId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Erro ao buscar a sala:', data.message);
            return;
        }

        // Exibe o nome da sala na interface
        roomNameElement.textContent = `Sala: ${data.name}`;
    } catch (error) {
        console.error('Erro ao buscar o nome da sala:', error);
    }

    // Notificar entrada na sala
    socket.emit('join-room', roomId);

    socket.on('user-joined', (userId) => {
        const message = document.createElement('div');
        message.textContent = `${userId} entrou na sala.`;
        messagesElement.appendChild(message);
    });

    socket.on('chat-message', (data) => {
        const message = document.createElement('div');
        message.textContent = `${data.user}: ${data.message}`;
        messagesElement.appendChild(message);
    });

    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = messageInput.value;
        socket.emit('send-chat-message', message, roomId);
        messageInput.value = '';
    });
});
