const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// O CORS fica na "portaria" para liberar o acesso do celular
app.use(cors());

// ATENÇÃO: Aqui NÃO usamos app.use(express.json()).
// A portaria não abre o pacote (JSON/FormData) para ler, ela apenas repassa a caixa fechada.

// ---------------------------------------------------------
// REGRAS DE ROTEAMENTO (O Recepcionista)
// ---------------------------------------------------------

// Regra 1: Assuntos de Autenticação
// Se a URL do pedido começar com "/api/auth", mande para o Serviço Auth (Porta 3001)
app.use('/api/auth', createProxyMiddleware({ 
    target: 'http://localhost:3001', 
    changeOrigin: true,
    // O pathRewrite apaga o prefixo "/api/auth" antes de entregar ao servico-auth
    pathRewrite: { '^/api/auth': '' } 
}));

// Regra 2: Assuntos do Operador (Perfil)
// Se a URL do pedido começar com "/api/perfil", mande para o Serviço Perfil (Porta 3002)
app.use('/api/perfil', createProxyMiddleware({ 
    target: 'http://localhost:3002', 
    changeOrigin: true,
    pathRewrite: { '^/api/perfil': '' } 
}));

// Iniciando o Gateway na Porta 3000 (A Porta Principal da Fábrica)
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 API Gateway (Portaria) rodando na porta ${PORT}`);
});