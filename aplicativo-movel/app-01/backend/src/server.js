const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Configurações (Middlewares)
app.use(cors()); // Permite que o React Native acesse o Back-end
app.use(express.json()); // Permite receber dados em formato JSON

// Rota de teste
app.get('/', (req, res) => {
    res.send('API do Setup Gamer Rodando! 🚀');
});

// Definição da Porta
const PORT = process.env.PORT || 3000;

app.listen(PORT,'0.0.0.0' ,() => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});

// ... (outros imports)
const componenteRoutes = require('./routes/componenteRoutes'); // 1. Eu importo minhas rotas

// ... (abaixo do app.use(express.json()))
app.use('/api', componenteRoutes); // 2. Eu digo que todas as minhas rotas começam com /api