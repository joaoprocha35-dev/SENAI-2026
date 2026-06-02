🚀 Battlestation Hardware Manager

Aplicativo Full Stack para gerenciamento de hardware gamer, desenvolvido com React Native, Node.js e MySQL.

⚙️ Funcionalidades
Cadastro de componentes
Listagem em tempo real
Exclusão de itens
API REST
Interface gamer neon
🛠️ Tecnologias
Front-end
React Native
Expo
TypeScript
Back-end
Node.js
Express
Banco de Dados
MySQL
📡 Rotas da API
Listar itens
GET /api/listar
Cadastrar item
POST /api/cadastrar
Deletar item
DELETE /api/deletar/:id
🛢️ Banco de Dados

Tabela componentes:

nome_item
marca
modelo
categoria
preco
tempo_uso
descricao
▶️ Executar Projeto
Backend
npm install
node server.js
Frontend
npm install
npx expo start
🌐 Configuração

Defina seu IP no Front-end:

const IP_MAC = "SEU_IP";
👨‍💻 Autor

João Pedro 🚀


-- 1. Criar o banco de dados
CREATE DATABASE setup_gamer_db;

-- 2. Usar o banco criado
USE setup_gamer_db;

-- 3. Criar a tabela de hardwares (8 colunas no total)
CREATE TABLE componentes (
    id INT AUTO_INCREMENT PRIMARY KEY, -- 1
    nome_item VARCHAR(100) NOT NULL,    -- 2
    marca VARCHAR(50) NOT NULL,        -- 3
    modelo VARCHAR(100) NOT NULL,      -- 4
    categoria VARCHAR(50) NOT NULL,    -- 5 (Ex: GPU, CPU, RAM)
    preco DECIMAL(10, 2) NOT NULL,     -- 6
    tempo_uso VARCHAR(50) NOT NULL,    -- 7
    descricao TEXT                     -- 8
);# Battlestation Hardware Manager - Full Stack
