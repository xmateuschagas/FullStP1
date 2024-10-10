document.addEventListener('DOMContentLoaded', async () => {
    console.log("DOM completamente carregado!");

    const token = localStorage.getItem('token');
    console.log("Token JWT:", token); 

    if (!token) {
        alert('Você precisa estar logado para acessar as salas.');
        window.location.href = 'login.html';
    }

    try {
        const response = await fetch('/api/rooms', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        console.log("Salas retornadas pelo back-end:", data);

        if (!response.ok) {
            console.error('Erro ao acessar as salas:', data.message);
            alert(data.message || 'Erro ao acessar as salas.');
            return;
        }

        const rooms = data;
        if (Array.isArray(rooms)) {
            const roomList = document.getElementById('room-list');
            rooms.forEach(room => {
                const li = document.createElement('li');
                li.textContent = `${room.name} - Capacidade: ${room.capacity}`;
                li.addEventListener('click', () => {
                    window.location.href = `chat.html?roomId=${room.id}`;
                });
                roomList.appendChild(li);
            });
        }
    } catch (error) {
        console.error('Erro ao buscar as salas:', error);
        alert('Erro ao carregar as salas. Tente novamente mais tarde.');
    }

    const createRoomBtn = document.getElementById('create-room-btn');
    createRoomBtn.addEventListener('click', async () => {
        const roomName = document.getElementById('room-name').value;
        const roomDescription = document.getElementById('room-description').value;
        const roomCapacity = document.getElementById('room-capacity').value;

        if (!roomName || !roomCapacity) {
            alert("Por favor, preencha o nome e a capacidade da sala.");
            return;
        }

        try {
            const response = await fetch('/api/rooms', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: roomName, description: roomDescription, capacity: roomCapacity })
            });

            if (response.ok) {
                alert('Sala criada com sucesso!');
                location.reload(); 
            } else {
                const data = await response.json();
                alert(data.message || 'Erro ao criar a sala.');
            }
        } catch (error) {
            console.error('Erro ao criar a sala:', error);
            alert('Erro ao criar a sala. Tente novamente mais tarde.');
        }
    });
});
