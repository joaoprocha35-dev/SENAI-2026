// Importando a conexão com o banco de dados em src/config/db.js
const db = require('../config/db');
/**
 * Este é o meu Controller. Aqui eu defino toda a lógica de como
 * os dados do meu setup gamer serão processados.
 */
const componenteController = {
    /**
     * Nesta função, eu recebo os dados do meu App e salvo no MySQL.
     */
    cadastrar: async (req, res) => {
        try {
            // Aqui eu uso a desestruturação para pegar os 7 campos que eu enviei pelo formulário
            const { nome_item, marca, modelo, categoria, preco, tempo_uso, descricao } = req.body;

            // Eu preparo o comando SQL e uso as "?" para deixar meu banco seguro contra invasores
            const sql = `INSERT INTO componentes (nome_item, marca, modelo, categoria, preco, tempo_uso, descricao) 
                         VALUES (?, ?, ?, ?, ?, ?, ?)`;

            // Eu mando o banco executar o cadastro e espero ele me confirmar o resultado
            const [result] = await db.execute(sql, [nome_item, marca, modelo, categoria, preco, tempo_uso, descricao]);

            // Se tudo deu certo, eu respondo para o App que o item foi criado e mostro o ID dele
            res.status(201).json({ message: 'Componente cadastrado!', id: result.insertId });
        } catch (error) {
            // Se eu cometi algum erro ou o banco falhou, eu capturo o erro aqui e aviso o que aconteceu
            res.status(500).json({ error: 'Erro ao cadastrar', details: error.message });
        }
    },

    /**
     * Nesta função, eu busco todos os itens que eu já cadastrei para mostrar no App.
     */
    listar: async (req, res) => {
        try {
            // Eu peço para o banco selecionar todos os componentes que eu salvei
            const [rows] = await db.execute('SELECT * FROM componentes');
            
            // Eu envio essa lista de volta para o meu front-end em formato JSON
            res.status(200).json(rows);
        } catch (error) {
            // Se eu encontrar um problema na busca, eu retorno essa mensagem de erro
            res.status(500).json({ error: 'Erro ao buscar dados', details: error.message });
        }
    },

/**
     * Nesta função, eu recebo o ID do item e removo ele do meu banco de dados.
     */
    deletar: async (req, res) => {
        try {
            // Eu pego o ID que vem pela URL (ex: /api/deletar/1)
            const { id } = req.params;

            // Eu preparo o comando SQL para deletar apenas o item com o ID específico
            const sql = 'DELETE FROM componentes WHERE id = ?';

            // Eu executo o comando e espero o banco terminar
            await db.execute(sql, [id]);

            // Eu respondo que o item foi removido com sucesso
            res.status(200).json({ message: 'Item removido do meu setup!' });
        } catch (error) {
            // Se algo der errado, eu aviso aqui
            res.status(500).json({ error: 'Erro ao deletar', details: error.message });
        }
    }
};


// Eu exporto o meu controlador para que as minhas rotas consigam usar essas funções
module.exports = componenteController;