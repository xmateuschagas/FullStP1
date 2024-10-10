const socketIO = require('socket.io');

let io;

const initializeSocket = (server) => {
  io = socketIO(server);

  io.on('connection', (socket) => {
    console.log('Novo cliente conectado:', socket.id);

    socket.on('join-room', (roomId) => {
      socket.join(roomId);
      socket.to(roomId).emit('user-connected', socket.id);
    });

    socket.on('signal', (data) => {
      const { roomId, signal } = data;
      socket.to(roomId).emit('signal', signal);
    });

    socket.on('disconnect', () => {
      console.log(`Usuário ${socket.id} desconectado`);
      io.emit('user-disconnected', socket.id);
    });
  });
};

module.exports = { initializeSocket };