🔐 Vault Pass
📁 Gestão de Acesso com JSON

Sistema de autenticação e gerenciamento de usuários utilizando arquivos JSON como base de dados, sem dependência de banco SQL.

🚀 Sobre o Projeto

Este é o Projeto 03 da minha galeria.

Diferente dos anteriores, aqui o foco foi trabalhar com:

📁 Persistência de dados em JSON
🔐 Sistema de autenticação completo
🧠 Manipulação direta de estruturas de dados
🛠️ Tech Stack

💻 Backend
🌐 Frontend

🔐 Funcionalidades

🔑 Autenticação
Login com CPF + senha.

Validação direta via arquivo JSON.

Feedback com flash messages.

🧾 CRUD de Usuários:

➕ Create:
Cadastro com verificação de CPF duplicado.

📖 Read:
Listagem dinâmica de usuários.

✏️ Update:
Edição de dados do perfil

❌ Delete
Remoção de registros via manipulação de lista.

📂 Estrutura de Dados (JSON):
{
  "nome": "João Rocha",
  "nascimento": "2000-01-01",
  "cpf": "12345678910",
  "email": "joao@email.com",
  "senha": "..."
}
📁 Estrutura do Projeto:

projeto-03-vault-pass/
├── app.py
├── data/               # Armazena os arquivos JSON
├── templates/          # HTML (Jinja2)
└── static/             # CSS / JS

▶️ Como Executar:

📌 Pré-requisitos
Python instalado

📦 Instalação
pip install flask
📁 Preparação

Crie a pasta:

data/

▶️ Execução
python app.py

🧠 Aprendizados

Esse projeto foca em fundamentos que muita gente pula:

📁 Manipulação de arquivos JSON
🔄 Leitura e escrita de dados estruturados
🔐 Lógica de autenticação sem banco
⚠️ Validação de dados manual
🧩 Controle de fluxo com listas e índices
🎯 Diferencial do Projeto

👉 Sem banco de dados
👉 Sem ORM
👉 Sem abstração

Tudo feito “na mão” para consolidar base sólida.

🛠️ Guia de Inicialização Rápida
Se você acabou de clonar o projeto e quer ver o Vault Pass em ação, siga estes passos:

1. Preparando o Ambiente
Recomenda-se o uso de um ambiente virtual para manter as dependências isoladas:

Bash
# Criar o ambiente virtual
python -m venv venv

# Ativar o ambiente (Windows)
.\venv\Scripts\activate

# Ativar o ambiente (Linux/Mac)
source venv/bin/activate
2. Instalação das Dependências
Com o ambiente ativo, instale o Flask:

Bash
pip install flask
3. Executando o Servidor
Para garantir que o Python utilize o interpretador correto e carregue todas as variáveis:

Bash
python app.py
Nota: O sistema estará disponível em http://127.0.0.1:5000