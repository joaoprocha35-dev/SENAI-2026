require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// POST /cadastro
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

// POST /login
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

// POST /suporte (Atividade 11)[cite: 13]
app.post('/suporte', async (req, res) => {
  const { operador, setor, descricao } = req.body;

  if (!operador || !setor || !descricao) {
    return res.status(400).json({ error: 'Preencha todos os campos.' });
  }

  try {
    const query = 'INSERT INTO chamados (operador, setor, descricao) VALUES (?, ?, ?)';
    await db.query(query, [operador, setor, descricao]);

    // Exibe a mensagem de confirmação no terminal exigida[cite: 13]
    console.log('Chamada enviada com sucesso!');
    
    return res.status(201).json({ message: 'Chamado aberto na TI!' });
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ error: 'Erro ao salvar o chamado no banco.' });
  }
});

// 1. POST /rh/enviar-notificacao (Painel Web do RH envia notificação para um operador)
app.post('/rh/enviar-notificacao', async (req, res) => {
  const { email, titulo, mensagem } = req.body;
  try {
    // Verifica se o operador existe no banco
    const [user] = await db.query('SELECT id FROM operadores WHERE email = ?', [email]);
    if (user.length === 0) {
      return res.status(404).json({ error: 'Operador não encontrado com este e-mail.' });
    }
    // Insere a notificação pendente
    await db.query(
      'INSERT INTO notificacoes_rh (email_operador, titulo, mensagem) VALUES (?, ?, ?)',
      [email, titulo, mensagem]
    );
    console.log(`[RH] Notificação enviada para: ${email}`);
    res.status(200).json({ message: 'Notificação enviada com sucesso!' });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ error: 'Erro ao registrar notificação.' });
  }
});
// 2. GET /notificacoes/checar/:email (Mobile consulta se há avisos pendentes)
app.get('/notificacoes/checar/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const [notificacoes] = await db.query(
      "SELECT * FROM notificacoes_rh WHERE email_operador = ? AND status = 'PENDENTE' ORDER BY id DESC LIMIT 1",
      [email]
    );
    if (notificacoes.length > 0) {
      const aviso = notificacoes[0];
      // Marca como LIDO para não disparar a mesma notificação repetidamente
      await db.query("UPDATE notificacoes_rh SET status = 'LIDO' WHERE id = ?", [aviso.id]);
      return res.json({
        temNotificacao: true,
        titulo: aviso.titulo,
        mensagem: aviso.mensagem
      });
    }
    res.json({ temNotificacao: false });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ error: 'Erro ao buscar notificações.' });
  }
});
// Serve a pasta de arquivos estáticos do RH
app.use(express.static('public'));

// POST /recuperar (Recuperação de Senha)
app.post('/recuperar', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Informe o e-mail corporativo.' });
  }

  try {
    const query = 'SELECT * FROM operadores WHERE email = ?';
    const [linhas] = await db.query(query, [email]);

    if (linhas.length === 0) {
      return res.status(404).json({ error: 'E-mail não encontrado no sistema.' });
    }

    console.log(`[AUTH] Solicitação de redefinição enviada para: ${email}`);
    return res.status(200).json({ message: 'Instruções enviadas para o e-mail!' });
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({ error: 'Erro interno no servidor.' });
  }
});



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serviço de Autenticação rodando na porta ${PORT}`);
});