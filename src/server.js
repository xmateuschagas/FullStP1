require('dotenv').config(); 
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoConnect = require('./config/mongo'); 
const mysqlConnection = require('./config/mysql'); 
const userRoutes = require('./routes/User.Routes'); 
const roomRoutes = require('./routes/Room.routes'); 
const http = require('http');
const socketIO = require('socket.io');
const jwt = require('jsonwebtoken'); // Adicionado para decodificar o token JWT

// Criação do app Express e configuração do servidor HTTP e Socket.io
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Porta de conexão
const port = process.env.PORT || 3000;

// Servir arquivos estáticos da pasta 'static'
app.use(express.static(path.join(__dirname, 'static')));

// Middleware para processar JSON no corpo das requisições
app.use(bodyParser.json());

// Rota principal para carregar o chat (página HTML)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'chat.html'));
});

// Conexão com MongoDB
mongoConnect();

// Conexão com MySQL
mysqlConnection.connect((err) => {
  if (err) {
    console.error('Erro de conexão no MySQL:', err);
  } else {
    console.log('Conectado ao MySQL!');
  }
});

// Rotas de usuários
app.use('/api/users', userRoutes);

// Rotas de salas (protegidas por JWT)
app.use('/api/rooms', roomRoutes);

// Middleware para verificar o JWT antes de conectar ao Socket.io
io.use((socket, next) => {
  const token = socket.handshake.auth.token;  // Token passado no frontend ao conectar
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userName = decoded.name;  // Decodifica o nome do usuário e o salva no socket
      return next();
    } catch (err) {
      console.error('Token JWT inválido:', err);
      return next(new Error('Autenticação inválida'));
    }
  } else {
    return next(new Error('Autenticação necessária'));
  }
});

// Configuração do Socket.io
io.on('connection', (socket) => {
  console.log('Novo cliente conectado:', socket.userName);

  // Evento para o usuário entrar em uma sala de chat
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(`${socket.userName} entrou na sala ${roomId}`);
    
    // Notifica a todos na sala que um novo usuário entrou
    socket.to(roomId).emit('user-joined', socket.userName);
  });

  // Escutar evento de mensagem de chat e enviar para a sala correspondente
  socket.on('send-chat-message', ({ message, roomId }) => {
    console.log(`Mensagem de ${socket.userName}: ${message}`);
    io.to(roomId).emit('chat-message', { userName: socket.userName, message });
  });

  // Evento de desconexão
  socket.on('disconnect', () => {
    console.log(`${socket.userName} desconectou`);
  });
});

// Inicia o servidor HTTP e Socket.io na porta especificada
server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
