//---------------Configurar o Servidor------------------

//Chamar o dotenv para ler as variáveis de ambiente do arquivo .env
require("dotenv").config();
//Trazer a biblioteca do express para criar o servidor
const express = require("express");
//cors é uma biblioteca que permite que o servidor aceite requisições de outros domínios, ou seja,
//ele permite que o front-end (que geralmente roda em um domínio diferente do back-end) possa se comunicar 
//com o back-end sem problemas de segurança relacionados ao CORS (Cross-Origin Resource Sharing)
const cors = require("cors");
//Criar uma instância do express para configurar o servidor
const rotasUsuarios = require("./src/routes/userRoutes");
//Criar uma instância do express para configurar o servidor
const app = express();
app.use(cors());
//Configurar o servidor para aceitar requisições com corpo em formato JSON, ou seja, 
//ele irá converter o corpo da requisição para um objeto JavaScript que pode ser acessado através do req.body
app.use(express.json());
//Configurar as rotas para os usuários, ou seja, todas as requisições que começarem com /usuarios serão 
//direcionadas para as rotas definidas no arquivo userRoutes.js
app.use("/usuarios", rotasUsuarios);
//Configurar o servidor para ouvir na porta definida na variável de ambiente PORT, ou seja, 
//ele irá iniciar o servidor e ficar ouvindo as requisições que chegarem nessa porta
const PORT = process.env.PORT || 3001;

//Quando o servidor iniciar(conectar), ele irá 
// imprimir no console a mensagem "Servidor rodando na porta 3001" 
// (ou a porta definida na variável de ambiente PORT)
app.listen(PORT, () => { 
    console.log(`🚀Servidor rodando na porta ${PORT}`);

});

