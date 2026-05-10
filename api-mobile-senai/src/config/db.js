
//------------------CONFIGURAÇÃO DO BANCO DE DADOS------------------


// mysquel2/promise eles irá fazer conexão com o banco de dados e retornar uma promise, ou seja, ele irá esperar a conexão ser estabelecida para continuar a execução do código
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    //process.env é uma variável de ambiente, ou seja, ela é definida fora do código, geralmente em um arquivo .env, e pode ser acessada em qualquer parte do código através do process.env.NOME_DA_VARIAVEL
host: process.env.DB_HOST,          //Endereço do banco de dados, geralmente é localhost ou 127.0.0.1
user: process.env.DB_USER,          //Usuário do banco de dados, geralmente é root
password: process.env.DB_PASSWORD,  //Senha do banco de dados
database: process.env.DB_NAME,      //Nome da base de dados

//Não é Obrigatorio, mas é recomendado para evitar problemas de 
//conexão, ele define o número máximo de conexões que podem ser abertas ao mesmo tempo, 
//caso o número de conexões atinja esse limite, as novas conexões serão enfileiradas até que uma conexão seja liberada
waitForConnections: true, //Espera por conexões disponíveis em vez de retornar um erro
connectionLimit: 10, //Número máximo de conexões simultâneas
queueLimit: 0 //Número máximo de conexões enfileiradas (0 significa sem limite) /ninguem esperando para conectar, 
//ou seja, não há limite para o número de conexões enfileiradas


})

//exportar esse pool para outros arquivos
module.exports = pool