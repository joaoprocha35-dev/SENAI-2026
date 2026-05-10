//---------------LÓGICA DO MEU BACLEND------------------//
//AQUI VAI FICAR TODA A LÓGICA DO MEU BACKEND, OU SEJA, AS FUNÇÕES QUE VÃO SER CHAMADAS PELOS MEUS 
//ENDPOINTS PARA REALIZAR AS OPERAÇÕES NO BANCO DE DADOS.

const db = require("../config/db")

exports.criarUsuario = async (req,res) => {
//pegando o nome do usuário que foi enviado pelo cliente
    const { nome} = req.body;
    //tentar salvar no banco de dados
    try {
        //realizando a conexão com o banco de dados
        const [resultado] = await db.query("INSERT INTO dadosUsuario (nome) VALUES (?)", [nome]);
        res.status(201).json({ message: "Usuário criado com sucesso", id: resultado.insertId });

    } 
    //Se der erro, ou seja, se não conseguir salvar no banco de dados, ele irá retornar um erro 500 (erro interno do servidor) e uma mensagem de erro
    catch (error) {
        res.status(500).json({ message: "Erro ao criar usuário" });
        console.error("Erro ao criar usúario: ", error);

    }
}
exports.getUsuarios = async (req,res) => {
    //Pegando o id do úsuario que foi enviado pelo Cliente
    try {
        const [usuarios] = await db.query("SELECT * FROM dadosUsuario WHERE ativo = TRUE");
        res.status(200).json(usuarios);
    } 
    //E se der algum erro na hora de pegar os usuários, ele irá retornar um erro 500 (erro interno do servidor) e uma mensagem de erro
    catch (error) {
        res.status(500).json({ message: "Usuario não encontrado"})
        console.error("Erro ao pegar usuários: ", error);   
    }
}