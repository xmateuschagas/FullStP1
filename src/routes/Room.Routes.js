const express = require('express');
const { createRoom, listRooms, joinRoom, getRoomById } = require('../controllers/RoomController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/', authMiddleware, createRoom);
router.get('/', authMiddleware, listRooms);
router.post('/join', authMiddleware, joinRoom);

// Rota para buscar informações da sala pelo ID
router.get('/:id', authMiddleware, getRoomById);

module.exports = router;
