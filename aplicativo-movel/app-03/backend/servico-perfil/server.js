require('dotenv').config();


const express = require('express');
const cors = require('cors');
const db = require('./db'); // Importamos nossa conexão com o banco
const app = express();

app.use(cors());
app.use(express.json());

// --- ENDPOINTS (Rotas da API) ---

// GET /perfil (Consultar dados do operador)
app.get('/perfil/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [linhas] = await db.query('SELECT id, nome, email, setor, turno FROM operadores WHERE id = ?', [id]);
    if (linhas.length > 0) {
      res.status(200).json(linhas[0]);
    } else {
      res.status(404).json({ error: "Operador não encontrado." });
    }
  } catch (erro) {
    res.status(500).json({ error: "Erro ao consultar banco." });
  }
});

// PUT /perfil (Atualizar dados do operador)
app.put('/perfil', (req, res) => {
  const { setor, turno } = req.body;
  console.log(`[PERFIL] Atualizando setor para ${setor} e turno para ${turno}`);
  
  res.status(200).json({ message: "Dados atualizados com sucesso!" });
});

//GET /status (Consultar status da fábrica)
app.get('/status', (req, res) => {
    console.log(`[PERFL] Consulta de status da fábrica solicitada.`);
    
    //Retorna o Status HTTP 200 com as informações operacionais da fábrica
    res.status(200).json({
        fabrica: "Unidade SENAI - Indústria 4.0",
        status: "Operacional",
        turnosAtivos: ["Manhã", "Tarde", "Noite"]
    });

});

// DELETE /perfil (Remover operador do sistema)
app.delete('/perfil', (req, res) => {
  console.log(`[PERFIL] Solicitação de exclusão de conta recebida.`);
  
  res.status(200).json({ message: "Operador removido do sistema corporativo." });
});

// Iniciando o servidor na Porta 3002
const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Serviço de Perfil rodando na porta ${PORT}`);
});