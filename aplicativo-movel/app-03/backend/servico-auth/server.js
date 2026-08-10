// A primeira linha DEVE ser a importação do dotenv
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./db'); // Importamos nossa conexão com o banco

const app = express();
app.use(cors());
app.use(express.json());

// --- ENDPOINTS (Rotas da API) ---

// POST /cadastro (Gravar no Banco)
app.post('/cadastro', async (req, res) => {
  const { nome, email, senha, setor } = req.body;

  try {
    const query = 'INSERT INTO operadores (nome, email, senha, setor) VALUES (?, ?, ?, ?)';
    const [resultado] = await db.query(query, [nome, email, senha, setor]);

    console.log(`[AUTH] Operador cadastrado com ID: ${resultado.insertId}`);
    res.status(201).json({ message: "Operador cadastrado com sucesso!", id: resultado.insertId });
  } catch (erro) {
    console.error(erro);
    if (erro.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ error: "Este e-mail corporativo já está em uso." });
    } else {
      res.status(500).json({ error: "Erro interno no servidor." });
    }
  }
});

// POST /login (Ler do Banco)
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const query = 'SELECT * FROM operadores WHERE email = ? AND senha = ?';
    const [linhas] = await db.query(query, [email, senha]);

    if (linhas.length > 0) {
      console.log(`[AUTH] Login autorizado: ${email}`);
      res.status(200).json({ message: "Login autorizado!", usuario: linhas[0] });
    } else {
      console.log(`[AUTH] Login falhou: ${email}`);
      res.status(401).json({ error: "E-mail ou senha incorretos." });
    }
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
});

// Rota para abrir chamados de suporte
app.post('/suporte', async (req, res) => {
  const { operador, setor, descricao } = req.body;

  if (!operador || !setor || !descricao) {
    return res.status(400).json({ error: 'Preencha todos os campos.' });
  }

  try {
    const query = 'INSERT INTO chamados (operador, setor, descricao) VALUES (?, ?, ?)';
    await db.query(query, [operador, setor, descricao]);

    console.log('Chamada enviada com sucesso!');
    
    return res.status(201).json({ message: 'Chamado aberto com sucesso!' });
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ error: 'Erro ao salvar o chamado no banco.' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serviço de Autenticação rodando na porta ${PORT}`);
});