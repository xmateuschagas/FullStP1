# FullStP1

Aplicação de Chat com Autenticação JWT e Socket.IO
Descrição
Este projeto é uma aplicação de chat que permite a criação de salas de bate-papo em tempo real. A autenticação é feita via JWT (JSON Web Token), garantindo que apenas usuários autenticados possam acessar as salas, criar novas salas e participar das conversas. A comunicação entre os usuários ocorre em tempo real, utilizando o Socket.IO.

Funcionalidades
Autenticação: Registro e login de usuários com criptografia de senha.
Proteção por JWT: Acesso às rotas de criação, listagem e participação em salas protegido por tokens JWT.
Criação de Salas: Usuários autenticados podem criar salas de bate-papo com nome, descrição e capacidade máxima.
Chat em Tempo Real: Comunicação instantânea entre os usuários nas salas utilizando Socket.IO.
Notificação de entrada: Exibe quando um usuário entra em uma sala e mostra o nome da sala em destaque.
Estrutura do Projeto
plaintext
Copiar código
├── src
│   ├── config
│   │   ├── mongo.js         # Conexão com MongoDB
│   │   └── mysql.js         # Conexão com MySQL
│   ├── controllers
│   │   ├── RoomController.js # Lógica das salas de bate-papo
│   │   └── UserController.js # Lógica de autenticação e registro
│   ├── middlewares
│   │   └── auth.js          # Middleware de autenticação JWT
│   ├── models
│   │   └── Room.js          # Modelo de dados das salas de bate-papo
│   ├── static               # Arquivos estáticos (HTML, CSS, JS)
│   │   ├── chat.html        # Página do chat
│   │   ├── salas.html       # Página de listagem e criação de salas
│   │   ├── login.html       # Página de login
│   │   └── style.css        # Estilos CSS
│   ├── routes
│   │   ├── Room.routes.js   # Rotas para salas
│   │   └── User.Routes.js   # Rotas para autenticação
│   ├── services
│   │   └── socket.js        # Configuração do Socket.IO
│   └── server.js            # Arquivo principal da aplicação
├── .env                     # Variáveis de ambiente (configurações de banco de dados e JWT)
├── package.json             # Dependências e scripts
└── README.md                # Documentação do projeto
Tecnologias Utilizadas
Node.js: Para o servidor backend.
Express: Framework web para criar rotas e middleware.
MongoDB: Para armazenar dados das salas de bate-papo.
MySQL: Para armazenar dados dos usuários (registro e login).
JWT: Para autenticação e proteção das rotas.
Socket.IO: Para comunicação em tempo real entre os usuários nas salas de chat.
HTML/CSS/JavaScript: Para as páginas front-end.
Como rodar o projeto
Clone o repositório:
bash
Copiar código
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
Instale as dependências:
bash
Copiar código
npm install
Configuração do arquivo .env:
Crie um arquivo .env na raiz do projeto com as seguintes variáveis:

bash
Copiar código
PORT=3000
DB_USER=seu-usuario-mongo
DB_PASS=sua-senha-mongo
JWT_SECRET=sua-chave-secreta-jwt

# Configurações do MySQL
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=sua-senha-mysql
MYSQL_DATABASE=nome-do-seu-banco
Iniciar o servidor:
bash
Copiar código
npm start
A aplicação estará disponível em http://localhost:3000.

Autor
Mateus Chagas
