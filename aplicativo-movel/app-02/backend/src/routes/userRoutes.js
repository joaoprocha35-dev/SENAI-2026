//-------------Aqui será as rotas relacionadas aos usuários----------------
//fazer conecção web com o express
const express =  require("express");
//Trazer a bibliotec do express para criar as rotas
const router = express.Router();
//Trazer a lógica do meu backend, ou seja, as funções que vão ser chamadas pelos meus endpoints para realizar as operações no banco de dados
const controleusuario = require("../controllers/userController");

//Rota para enviar dados do front para o Banco de dados, ou seja, para criar um novo usuário, ele irá chamar 
//a função criarUsuario que está no meu controleusuario
router.post("/", controleusuario.criarUsuario);
//rota para pegar os dados do bamco e enviar para o front

router.get("/", controleusuario.getUsuarios);

module.exports = router;