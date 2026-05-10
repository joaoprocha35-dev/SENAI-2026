🎮 Gerenciamento de Games
🔄 Refatoração de Sistema Legado

Sistema web adaptado para uma plataforma de aluguel de games, a partir de um sistema legado de biblioteca, sem alteração no banco de dados.

🚀 Sobre o Projeto

Este é o Projeto 02 da minha galeria.

O foco foi simular um cenário real de mercado:
pegar um sistema legado e adaptá-lo para um novo contexto sem quebrar nada existente.

🏆 **Desafio Técnico**

Você não podia mexer no banco. Só no código.

📌 Restrições:
❌ Proibido alterar tabelas ou colunas
✅ Adaptar backend (rotas e lógica)
✅ Refazer o frontend completamente
💡 Resultado:

Mesmo com o banco ainda sendo:

livros
leitores
emprestimos

👉 O usuário final enxerga:

🎮 Games
🧑 Jogadores
🕹️ Aluguéis

🛠️ **Tech Stack**
💻 Backend

🌐 Frontend
🔄 O que foi refatorado?
🧩 Entidades
📖 Livro → 🎮 Game
👤 Leitor → 🧑 Jogador
🔁 Empréstimo → 🕹️ Aluguel
🔗 Rotas
/listar-games
/alugar-game
/cadastrar-game

Rotas foram renomeadas para refletir a nova regra de negócio.

🎨 **Frontend:**

Interface totalmente refeita
Tema voltado para games 🎮
Bootstrap 5.3
Mantendo compatibilidade com o banco legado
📂 Estrutura do Projeto
projeto-02-biblioteca-games/
├── app.py
├── resources/
│   └── database.py
├── templates/
│   ├── alugar-game.html
│   ├── listar-game.html
│   └── ...
└── static/

▶️ **Como Executar**
📌 Pré-requisitos
Python instalado
MySQL configurado com banco legado
🔧 Instalação
pip install flask mysql-connector-python
▶️**Execução**
python app.py

**Acesse:**

http://127.0.0.1:5000
🧠 Aprendizados

Esse projeto não é sobre CRUD simples — é sobre pensar como dev de verdade:

🔧 Refatoração sem quebrar sistema existente
🧠 Adaptação de regra de negócio
🔗 Desacoplamento entre backend e frontend
🎯 Nomeação estratégica de rotas
🏗️ Trabalhar com limitações reais
🎓 Contexto

Projeto desenvolvido com foco didático no SENAI, simulando manutenção e evolução de sistemas legados.