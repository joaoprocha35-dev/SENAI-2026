// Eu importo o Express para gerenciar minhas rotas
const express = require('express');
const router = express.Router();

// Eu importo o controlador que acabei de criar para saber o que fazer em cada rota
const componenteController = require('../controllers/componenteController');

// Aqui eu defino a rota de cadastro. 
// Quando o App mandar um "POST" para /cadastrar, eu chamo a função cadastrar do meu controller
router.post('/cadastrar', componenteController.cadastrar);

// Aqui eu defino a rota de listagem.
// Quando o App der um "GET" para /listar, eu chamo a função listar do meu controller
router.get('/listar', componenteController.listar);
// Aqui eu defino a rota de exclusão. O ":id" é um parâmetro que eu vou enviar.
router.delete('/deletar/:id', componenteController.deletar);

// Eu exporto essas rotas para que o meu servidor principal (server.js) consiga enxergá-las
module.exports = router;