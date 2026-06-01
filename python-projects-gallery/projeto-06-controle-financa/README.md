# 💰 Controle de Finanças Pessoais

Um mini projeto **Full-Stack** desenvolvido como parte do cronograma prático do **SENAI (2026)**. A aplicação consiste em um gerenciador financeiro dinâmico onde o usuário pode cadastrar, visualizar, editar e excluir transações de entrada e saída, com cálculo de saldo em tempo real e interface responsiva com animações nativas.

---

## 🚀 Tecnologias Utilizadas

### Backend & Banco de Dados
* **Python 3.14** — Linguagem principal do servidor.
* **Flask** — Micro-framework web para construção das rotas e lógica de negócio.
* **Flask-SQLAlchemy** — ORM para mapeamento e manipulação de tabelas SQL como objetos Python.
* **PyMySQL** — Driver de conexão entre o Flask e o servidor MySQL.
* **MySQL Workbench** — Sistema de Gerenciamento de Banco de Dados (SGBD) utilizado para persistência dos dados.

### Frontend
* **HTML5** — Estruturação semântica das páginas e formulários utilizando o motor de renderização Jinja2.
* **CSS3** — Customização estética moderna (variáveis globais, layout em Grid/Flexbox e estados dinâmicos).
* **Vanilla JavaScript** — Lógica interativa para efeito de digitação automática (*typing effect*) e animações de surgimento (*fade-in-up*) em cascata.

---

## 📂 Estrutura de Pastas do Projeto

O projeto segue a arquitetura padrão exigida pelo framework Flask:

```text
projeto-06-controle-financas/
├── app.py               # Arquivo principal (servidor Flask e modelos ORM)
├── templates/           # Arquivo de visualização (HTML)
│   ├── index.html       # Tela principal do histórico e cadastro
│   └── editar.html      # Tela de modificação de registros
└── static/              # Arquivos estáticos de estilo e comportamento
    ├── style.css        # Estilização visual completa do sistema
    └── script.js        # Efeitos de animação e interação nativa