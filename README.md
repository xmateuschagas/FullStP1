# Chat em Tempo Real com Salas

Aplicação full stack de chat em tempo real. Usuários se cadastram, fazem login, criam salas com nome, descrição e capacidade, e conversam com quem estiver na mesma sala, com mensagens entregues instantaneamente via WebSocket.

Desenvolvida por **Mateus Chagas** ([LinkedIn](https://www.linkedin.com/in/mateusbchagas) · [GitHub](https://github.com/xmateuschagas)).

---

## Demonstração

https://github.com/user-attachments/assets/d8b19b02-d840-445c-ac85-06c5816e5a6f

---

## Problema e proposta de valor

O projeto explora dois desafios comuns em sistemas reais: comunicação em tempo real autenticada e persistência poliglota, usando o banco certo para cada tipo de dado.

- **Usuários** ficam em um banco relacional (MySQL), onde integridade e unicidade de e-mail importam.
- **Salas** ficam em um banco de documentos (MongoDB), com esquema mais flexível.
- A conexão WebSocket só é aceita com um JWT válido, então ninguém entra em uma sala sem estar logado.

---

## Stack tecnológica

| Camada | Tecnologia |
|---|---|
| Backend | Node.js, Express 4 |
| Tempo real | Socket.IO 4 |
| Autenticação | JWT (jsonwebtoken), bcryptjs |
| Banco relacional | MySQL (mysql2) |
| Banco de documentos | MongoDB (Mongoose) |
| Frontend | HTML, CSS e JavaScript |
| Dev | nodemon, dotenv |

---

## Arquitetura

```
Navegador (login.html · salas.html · chat.html)
      │  REST (JWT no header)          │  WebSocket (JWT no handshake)
      ▼                                ▼
┌───────────────────────── Express + Socket.IO ─────────────────────────┐
│  /api/users  ──► UserController ──► UserRepository ──► MySQL (users)  │
│  /api/rooms  ──► auth middleware ──► RoomController ──► MongoDB       │
│  io.use(JWT) ──► join-room / send-chat-message / user-joined          │
└───────────────────────────────────────────────────────────────────────┘
```

```
src/
├── server.js          # HTTP + Socket.IO, middleware JWT do socket
├── config/            # Conexões MongoDB e MySQL
├── controllers/       # Usuários e salas
├── repositories/      # Acesso a dados de usuário (SQL parametrizado)
├── middlewares/       # Validação de JWT nas rotas REST
├── models/            # Schema Mongoose de salas
├── routes/            # Endpoints REST
├── services/          # Lógica de socket
└── static/            # Frontend
```

**Destaques**

- Autenticação aplicada tanto nas rotas REST quanto no handshake do Socket.IO.
- Queries SQL parametrizadas, sem concatenação de strings.
- Eventos por sala (`join-room`, `send-chat-message`, `user-joined`) usando rooms nativas do Socket.IO.

---

## Como rodar

### Pré-requisitos

- Node.js 18 ou superior
- MySQL com uma tabela `users (id, name, email, password)`
- Cluster MongoDB Atlas

### Variáveis de ambiente (`.env`)

```env
PORT=3000
JWT_SECRET=<chave-aleatoria>

# MongoDB Atlas
DB_USER=<usuario>
DB_PASS=<senha>

# MySQL
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=<usuario>
MYSQL_PASSWORD=<senha>
MYSQL_DATABASE=<banco>
```

### Execução

```bash
git clone https://github.com/xmateuschagas/FullStP1.git
cd FullStP1
npm install
npm run dev      # ou: npm start
```

Acesse `http://localhost:3000`.

---

## Próximos passos

- Persistir histórico de mensagens
- Respeitar a capacidade máxima da sala no servidor
- Tornar o host do MongoDB configurável por variável de ambiente
- Docker Compose com MySQL e MongoDB locais

---

## Autor

**Mateus Chagas**, Engenheiro de Software
[LinkedIn](https://www.linkedin.com/in/mateusbchagas) · [GitHub](https://github.com/xmateuschagas)
