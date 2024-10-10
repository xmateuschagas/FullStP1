const Room = require('../models/Room');

// Criação de uma nova sala
exports.createRoom = async (req, res) => {
  const { name, description, capacity } = req.body;

  try {
    const room = new Room({ name, description, capacity });
    await room.save();
    res.status(201).json({ message: 'Sala criada com sucesso!', room });
  } catch (err) {
    console.error('Erro ao criar sala:', err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

// Listagem de salas ativas
exports.listRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isActive: true });
    res.json(rooms);
  } catch (err) {
    console.error('Erro ao listar salas:', err);
    res.status(500).json({ message: 'Erro no servidor ao listar as salas' });
  }
};

// Participação em uma sala
exports.joinRoom = async (req, res) => {
  const { roomId } = req.body;

  try {
    const room = await Room.findOne({ id: roomId });
    if (!room) {
      return res.status(404).json({ message: 'Sala não encontrada' });
    }

    res.json({ message: 'Você entrou na sala com sucesso!', room });
  } catch (err) {
    console.error('Erro ao entrar na sala:', err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

// Buscar informações de uma sala pelo ID
exports.getRoomById = async (req, res) => {
  const { id } = req.params;

  try {
    const room = await Room.findOne({ id });
    if (!room) {
      return res.status(404).json({ message: 'Sala não encontrada' });
    }

    res.json(room);  // Retorna a sala encontrada
  } catch (err) {
    console.error('Erro ao buscar a sala:', err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};
