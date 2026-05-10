📚 Sistema de Gerenciamento de Biblioteca (Papyro)

Sistema web completo (CRUD) para gestão de bibliotecas, permitindo o controle de livros, usuários e empréstimos.

🚀 Sobre o Projeto

O Papyro é o Projeto 01 da minha galeria em Python.
A aplicação simula o funcionamento real de uma biblioteca, com foco em organização de dados e fluxo de empréstimos.

🛠️ Tech Stack
💻 Backend

🌐 Frontend

⚙️ Funcionalidades
📖 Gestão de Livros
Cadastro por ISBN
Edição de informações
Listagem de acervo
Exclusão lógica (soft delete)

👤 Gestão de Leitores
Cadastro via CPF
Controle de dados pessoais
Listagem de usuários

🔄 Sistema de Empréstimos
Registro de empréstimos
Data de retirada e devolução
Associação entre livro e leitor

🛡️ Exclusão Lógica
Dados não são apagados
Apenas marcados como inativos (ativo = 0)

📂 Estrutura do Projeto

projeto-01-biblioteca-livros/
├── app.py
├── resources/
│   └── database.py
├── templates/
│   ├── index.html
│   ├── listar-livro.html
│   └── ...
└── static/

▶️ Como Executar
📌 Pré-requisitos
Python instalado
MySQL instalado
🔧 Passos
# Instalar dependências
pip install flask mysql-connector-python

# Rodar o projeto
python app.py

Acesse no navegador:

http://127.0.0.1:5000

🧠 Aprendizados

Neste projeto eu pratiquei:

Conexão Python + MySQL (sem ORM)
Uso de métodos GET e POST
Templates dinâmicos com Jinja2
Estruturação de rotas no Flask
Estilização com Bootstrap

🎓 Contexto

Projeto desenvolvido durante as aulas no SENAI, com foco em aplicação prática de backend com integração a banco de dados.