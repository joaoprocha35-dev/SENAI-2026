const mysql = require('mysql2');
require('dotenv').config();

// Criando o pool de conexão
const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Exporta como promise para usarmos async/await no futuro
module.exports = connection.promise();