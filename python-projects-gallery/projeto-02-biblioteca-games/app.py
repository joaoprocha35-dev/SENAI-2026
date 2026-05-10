# Importação de bibliotecas.
from flask import Flask
from flask import render_template
from flask import request
from flask import redirect
from flask import url_for
import resources.database_connection as database_connection

# Configuração do Flask.
app = Flask(__name__)

# Chave secreta de proteção contra CSRF (Cross-Site Request Forgery).
app.config['SECRET_KEY'] = 'Senai@791'

# Rota para o INDEX do website.
@app.route('/')
def inicio ():
    
    return render_template('index.html')

# Rota para o CADASTRAR LIVRO do website.
@app.route('/cadastrar-game', methods=['GET', 'POST'])
def cadastrar_game():

    # Verifica se o método da requisição é o POST.
    if (request.method == 'POST'):

        # Recebe os dados do formulário via POST.
        isbn = request.form['isbn']
        titulo = request.form['titulo']
        autor = request.form['autor']
        editora = request.form['editora']
        ano = request.form['ano']
        genero = request.form['genero']
        edicao = request.form['edicao']

        # Faz a conexão com o banco de dados.
        connection = database_connection.open_connection()
        cursor = connection.cursor()

        # Monta a instrução SQL e insere os dados no banco de dados.
        SQL = "INSERT INTO livros (isbn, titulo, autor, editora, ano_publicacao, edicao, genero) VALUES (%s, %s, %s, %s, %s, %s, %s);"
        values = (isbn, titulo, autor, editora, ano, edicao, genero)
        cursor.execute(SQL, values)
        connection.commit()

        # Fecha a conexão com o banco de dados.
        cursor.close()
        connection.close()

        # Redireciona para a tela de livros novamente.
        return redirect(url_for('listar_game'))
    else:

        # Redireciona para a página de cadastro de livro.
        return render_template('cadastrar-game.html')
    
# Rota para o LISTAR game do website.
@app.route('/listar-games')
def listar_game():

    # Faz a conexão com o banco de dados.
    connection = database_connection.open_connection()
    cursor = connection.cursor()

    # Monta a instrução SQL de seleção dos livros.
    SQL = "SELECT isbn, titulo, genero FROM livros WHERE ativo = 1;"

    # Executa a consulta SQL.
    cursor.execute(SQL)

    # Cria um vetor com os resultados da consulta.
    livros = cursor.fetchall()

    # Fecha a conexão com o banco de dados.
    cursor.close()
    connection.close()

    # Retorna a página HTML com os dados dos livros.
    return render_template('listar-game.html', livros=livros)

# Rota para o EXCLUIR LIVRO do website.
@app.route('/excluir-game/<isbn>')
def excluir_game (isbn):

    # Faz a conexão com o banco de dados.
    connection = database_connection.open_connection()
    cursor = connection.cursor()

    # Monta a instrução SQL para excluir logicamente o livro.
    SQL = "UPDATE livros SET ativo = 0 WHERE isbn = %s;"
    cursor.execute(SQL, (isbn,))
    connection.commit()

    # Fecha a conexão com o banco de dados.
    cursor.close()
    connection.close()

    # Redireciona para a tela de listagem de livros.
    return redirect(url_for('listar_game'))

# Rota para o EDITAR LIVRO do website.
@app.route('/editar-game', methods=['POST'])
@app.route('/editar-game/<isbn>', methods=['GET'])
def editar_game (isbn=None):

    # Verifica se o método de requisição é POST ou GET.
    if (request.method == 'POST'):

        # Recebe os dados do formulário via POST.
        isbn = request.form['isbn']
        titulo = request.form['titulo']
        autor = request.form['autor']
        editora = request.form['editora']
        ano = request.form['ano']
        genero = request.form['genero']
        edicao = request.form['edicao']

        # Faz a conexão com o banco de dados.
        connection = database_connection.open_connection()
        cursor = connection.cursor()

        # Monta a instrução SQL para atualização dos dados do livro.
        SQL = "UPDATE livros SET titulo = %s, autor = %s, editora = %s, ano_publicacao = %s, genero = %s, edicao = %s WHERE isbn = %s;"
        values = (titulo, autor, editora, ano, genero, edicao, isbn)
        cursor.execute(SQL, values)
        connection.commit()

        # Fecha a conexão com o banco de dados.
        cursor.close()
        connection.close()

        # Redireciona para a tela de livros novamente.
        return redirect(url_for('listar_game'))
    
    else:

        # Faz a conexão com o banco de dados.
        connection = database_connection.open_connection()
        cursor = connection.cursor()

        # Monta a instrução SQL para trazer os dados do livro.
        SQL = "SELECT isbn, titulo, autor, editora, ano_publicacao, genero, edicao FROM livros WHERE isbn = %s;"
        cursor.execute(SQL, (isbn,))
        livro = cursor.fetchone()

        # Fecha a conexão com o banco de dados.
        cursor.close()
        connection.close()

        # Redireciona para a tela de edição do livro.
        return render_template('editar-game.html', livro=livro)

# Rota para o CADASTRAR JOGADOR do website.
@app.route('/cadastrar-jogador', methods=['GET', 'POST'])
def cadastrar_jogador ():

    # Verifica se o método da requisição é o POST.
    if (request.method == 'POST'):

        # Recebe os dados do formulário via POST.
        cpf = request.form['cpf']
        nome = request.form['nome']
        endereco = request.form['endereco']
        telefone = request.form['telefone']
        email = request.form['email']

        # Faz a conexão com o banco de dados.
        connection = database_connection.open_connection()
        cursor = connection.cursor()

        # Monta a instrução SQL e insere os dados no banco de dados.
        SQL = "INSERT INTO leitores (cpf, nome, endereco, telefone, email) VALUES (%s, %s, %s, %s, %s);"
        values = (cpf, nome, endereco, telefone, email)
        cursor.execute(SQL, values)
        connection.commit()

        # Fecha a conexão com o banco de dados.
        cursor.close()
        connection.close()

        # Redireciona para a tela de leitores novamente.
        return redirect(url_for('listar_jogador'))
    else:
         
        # Redireciona para a página de cadastro de leitor.
        return render_template('cadastrar-jogador.html')

# Rota para o LISTAR JOGADOR do website.
@app.route('/listar-jogador')
def listar_jogador():

    # Faz a conexão com o banco de dados.
    connection = database_connection.open_connection()
    cursor = connection.cursor()

    # Monta a instrução SQL de seleção dos leitores.
    SQL = "SELECT cpf, nome, email FROM leitores WHERE ativo = 1;"

    # Executa a consulta SQL.
    cursor.execute(SQL)

    # Cria um vetor com os resultados da consulta.
    jogadores = cursor.fetchall()

    # Fecha a conexão com o banco de dados.
    cursor.close()
    connection.close()

    # Retorna a página HTML com os dados dos leitores.
    return render_template('listar-jogador.html', leitores=jogadores)

# Rota para o EXCLUIR LEITOR do website.
@app.route('/excluir-jogador/<cpf>')
def excluir_jogador (cpf):

    # Faz a conexão com o banco de dados.
    connection = database_connection.open_connection()
    cursor = connection.cursor()

    # Monta a instrução SQL para excluir logicamente o leitor.
    SQL = "UPDATE leitores SET ativo = 0 WHERE cpf = %s;"
    cursor.execute(SQL, (cpf,))
    connection.commit()

    # Fecha a conexão com o banco de dados.
    cursor.close()
    connection.close()

    # Redireciona para a tela de listagem de leitores.
    return redirect(url_for('listar_jogador'))

# Rota para o EDITAR JOGADOR do website.
@app.route('/editar-jogador', methods=['POST'])
@app.route('/editar-jogador/<cpf>', methods=['GET'])
def editar_jogador (cpf=None):

    # Verifica se o método de requisição é POST ou GET.
    if (request.method == 'POST'):

        # Recebe os dados do formulário via POST.
        cpf = request.form['cpf']
        nome = request.form['nome']
        endereco = request.form['endereco']
        telefone = request.form['telefone']
        email = request.form['email']

        # Faz a conexão com o banco de dados.
        connection = database_connection.open_connection()
        cursor = connection.cursor()

        # Monta a instrução SQL para atualização dos dados do leitor.
        SQL = "UPDATE leitores SET nome = %s, endereco = %s, telefone = %s, email = %s WHERE cpf = %s;"
        values = (nome, endereco, telefone, email, cpf)
        cursor.execute(SQL, values)
        connection.commit()

        # Fecha a conexão com o banco de dados.
        cursor.close()
        connection.close()

        # Redireciona para a tela de leitores novamente.
        return redirect(url_for('listar_jogador'))
    
    else:

        # Faz a conexão com o banco de dados.
        connection = database_connection.open_connection()
        cursor = connection.cursor()

        # Monta a instrução SQL para trazer os dados do leitor.
        SQL = "SELECT cpf, nome, endereco, telefone, email FROM leitores WHERE cpf = %s;"
        cursor.execute(SQL, (cpf,))
        leitor = cursor.fetchone()

        # Fecha a conexão com o banco de dados.
        cursor.close()
        connection.close()

        # Redireciona para a tela de edição do leitor.
        return render_template('editar-jogador.html', leitor=leitor)

# Rota de ALUGUEL DE GAME (Antigo Empréstimo) do website.
@app.route('/alugar-game', methods=['GET', 'POST'])
def alugar_game(): #nome da funccão atualizado!

    # Verifica se o método da requisição é o POST.
    if (request.method == 'POST'):

        # Recebe os dados do formulário via POST.
        cpf = request.form['cpf']
        isbn = request.form['isbn']
        data_emprestimo = request.form['data-emprestimo']
        data_devolucao = request.form['data-devolucao']

        # Faz a conexão com o banco de dados.
        connection = database_connection.open_connection()
        cursor = connection.cursor()

        # Monta a instrução SQL e insere os dados no banco de dados.
        SQL = "INSERT INTO emprestimos (cpf_leitor, isbn_livro, data_emprestimo, data_devolucao) VALUES (%s, %s, %s, %s);"
        values = (cpf, isbn, data_emprestimo, data_devolucao)
        cursor.execute(SQL, values)
        connection.commit()

        # Fecha a conexão com o banco de dados.
        cursor.close()
        connection.close()

        # Redireciona para a tela de empréstimos novamente.
        return redirect(url_for('listar_aluguel'))
    else:

        # Redireciona para a página de realização de empréstimo.
        return render_template('alugar-game.html')
    
# Rota para o LISTAR ALUGUÉIS do website.

@app.route('/listar-alugueis')
def listar_aluguel ():

    # Faz a conexão com o banco de dados.
    connection = database_connection.open_connection()
    cursor = connection.cursor()

    # Monta a instrução SQL para selecionar os empréstimos.
    SQL = "SELECT id, cpf_leitor, isbn_livro, data_devolucao FROM emprestimos WHERE ativo = 1;"

    # Executa a consulta SQL.
    cursor.execute(SQL)

    # Obtém os resultados da consulta.
    emprestimos = cursor.fetchall()

    # Fecha a conexão com o banco de dados.
    cursor.close()
    connection.close()

    # Retorna a página HTML com os dados dos empréstimos.
    return render_template('listar-aluguel.html', emprestimos=emprestimos)

# Rota para o EXCLUIR EMPRÉSTIMO DO LIVRO do website.
@app.route('/excluir-aluguel/<id>')
def excluir_aluguel(id):

    #  Faz a conexão com o banco de dados.
    connection = database_connection.open_connection()
    cursor = connection.cursor()

    # Monta a instrução SQL para excluir logicamente o empréstimo.
    SQL = "UPDATE emprestimos SET ativo = 0 WHERE id = %s;"
    cursor.execute(SQL, (id,))
    connection.commit()

    # Fecha a conexão com o banco de dados.]
    cursor.close()
    connection.close()

    # Redireciona para a tela de empréstimos novamente.
    return redirect(url_for('listar_aluguel'))

# Rota para o EDITAR ALUGUEL do website.
@app.route('/editar-aluguel', methods=['POST'])
@app.route('/editar-aluguel/<id>', methods=['GET'])
def editar_aluguel (id=None):

    # Verifica se o método de requisição é POST ou GET.
    if (request.method == 'POST'):

        # Recebe os dados do formulário via POST.
        id = request.form['id']
        cpf = request.form['cpf']
        isbn = request.form['isbn']
        data_emprestimo = request.form['data-emprestimo']
        data_devolucao = request.form['data-devolucao']

        # Faz a conexão com o banco de dados.
        connection = database_connection.open_connection()
        cursor = connection.cursor()

        # Monta a instrução SQL para atualização dos dados do empréstimo.
        SQL = "UPDATE emprestimos SET cpf_leitor = %s, isbn_livro = %s, data_emprestimo = %s, data_devolucao = %s WHERE id = %s;"
        values = (cpf, isbn, data_emprestimo, data_devolucao, id)
        cursor.execute(SQL, values)
        connection.commit()

        # Fecha a conexão com o banco de dados.
        cursor.close()
        connection.close()

        # Redireciona para a tela de empréstimos novamente.
        return redirect(url_for('listar_aluguel'))
    
    else:

        # Faz a conexão com o banco de dados.
        connection = database_connection.open_connection()
        cursor = connection.cursor()

        # Monta a instrução SQL para trazer os dados do empréstimo.
        SQL = "SELECT id, cpf_leitor, isbn_livro, data_emprestimo, data_devolucao FROM emprestimos WHERE id = %s;"
        cursor.execute(SQL, (id,))
        emprestimo = cursor.fetchone()

        # Fecha a conexão com o banco de dados.
        cursor.close()
        connection.close()

        # Redireciona para a tela de edição do empréstimo.
        return render_template('editar-aluguel.html', emprestimo=emprestimo)

# Executa o website. 
if __name__ == '__main__':
    app.run(debug=True)