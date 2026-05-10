#Importa o conector do MySQL

import mysql.connector

#Função que faz conexão com o banco de dados Mysql
def open_connection():
    return mysql.connector.connect(
        host = 'localhost',
        user = 'root',
        password = 'dev@2025',
        database = 'papyro'
    )    