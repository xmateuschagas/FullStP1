



https://github.com/user-attachments/assets/d8b19b02-d840-445c-ac85-06c5816e5a6f







FullStP1
Autor: Mateus Chagas

Descrição
O projeto FullStP1 é uma aplicação de chat em tempo real com autenticação JWT e Socket.IO. Ele permite que usuários criem salas de bate-papo, participem dessas salas e interajam em tempo real. A autenticação via JSON Web Token (JWT) garante que apenas usuários autenticados possam criar ou acessar salas. O sistema utiliza Node.js para o backend, MongoDB para gerenciar as salas de chat, e MySQL para armazenar as informações dos usuários.

Funcionalidades
Autenticação e Registro de Usuários:

Os usuários podem se registrar e fazer login no sistema.
A senha dos usuários é criptografada utilizando bcryptjs para garantir a segurança.
Após o login, um token JWT é gerado para o usuário, permitindo que ele acesse as rotas protegidas.
Criação de Salas de Bate-papo:

Usuários autenticados podem criar novas salas de bate-papo informando o nome da sala, descrição e capacidade máxima.
As salas são armazenadas no MongoDB, com um identificador único para cada sala.
Listagem de Salas Disponíveis:

Os usuários podem ver todas as salas criadas e ativas após o login.
Ao clicar em uma sala, eles são redirecionados para o bate-papo da sala selecionada.
Chat em Tempo Real:

A comunicação dentro das salas de bate-papo é feita em tempo real através de Socket.IO.
As mensagens enviadas por um usuário são exibidas para todos os participantes da sala.
Quando um usuário entra em uma sala, uma notificação é exibida informando sua entrada.
Proteção por JWT:

Apenas usuários autenticados podem acessar as rotas de criação de salas e participação nas salas de bate-papo.
O token JWT é verificado em cada requisição para garantir a segurança das rotas.
Tecnologias Utilizadas
Node.js: Plataforma para o backend da aplicação.
Express: Framework para o gerenciamento de rotas e middlewares.
MongoDB: Banco de dados NoSQL utilizado para armazenar as informações das salas de bate-papo.
MySQL: Banco de dados relacional utilizado para armazenar os dados dos usuários.
JWT (JSON Web Token): Para autenticação de usuários e proteção das rotas.
Socket.IO: Para comunicação em tempo real no bate-papo.
HTML/CSS/JavaScript: Para construção das páginas front-end da aplicação.
bcryptjs: Para criptografar as senhas dos usuários antes de armazená-las no banco de dados.
Como Funciona
Autenticação:

O usuário se registra ou faz login no sistema.
Ao fazer login, o usuário recebe um token JWT que será utilizado para acessar rotas protegidas, como a criação e participação em salas de bate-papo.
Criação de Salas:

Após logar, o usuário pode criar uma sala de bate-papo, informando o nome, a descrição e a capacidade.
A sala é armazenada no MongoDB e exibida na lista de salas disponíveis.
Participação nas Salas:

Os usuários podem selecionar uma sala da lista para participar.
Ao entrar, o usuário vê o nome da sala em destaque e recebe uma notificação sobre quem está na sala.
Bate-papo em Tempo Real:

Os usuários trocam mensagens em tempo real dentro da sala, com as mensagens sendo atualizadas instantaneamente para todos os participantes.
Como Rodar o Projeto
Clone o Repositório: Baixe o código do repositório Git.
Instale as Dependências: Use npm install para instalar todas as dependências do Node.js.
Configure o .env: Crie um arquivo .env com as variáveis de ambiente necessárias, como detalhes do MongoDB, MySQL e JWT.
Inicie o Servidor: Use npm start para rodar a aplicação.
Acesse a Aplicação: Acesse http://localhost:3000 no navegador para interagir com a aplicação.
