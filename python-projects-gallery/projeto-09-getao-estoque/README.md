📦 Inventory Management Dashboard
Sistema Web de Gestão de Estoque com Integração em Tempo Real entre MySQL, Flask e Excel

📖 Sobre o Projeto

O Inventory Management Dashboard é uma aplicação web desenvolvida para gerenciamento inteligente de estoque, permitindo o controle completo de produtos através de uma interface moderna e intuitiva.

O sistema foi construído utilizando uma arquitetura cliente-servidor baseada em Python Flask, integrada a um banco de dados MySQL e com sincronização automatizada para planilhas Excel através da biblioteca OpenPyXL.

Além das operações de gerenciamento, o projeto disponibiliza uma camada visual analítica utilizando gráficos dinâmicos para acompanhamento em tempo real do volume de estoque.

✨ Principais Funcionalidades
📋 Gestão Completa de Produtos (CRUD)
Cadastro de novos produtos
Consulta em tempo real
Atualização rápida de estoque e preços
Exclusão segura de registros
Persistência automática no banco de dados
📊 Dashboard Analítico
Visualização gráfica dos produtos cadastrados
Atualização dinâmica dos dados
Integração com Chart.js
Monitoramento visual do estoque
📁 Exportação Inteligente para Excel
Sincronização direta entre MySQL e Excel
Limpeza automática de registros antigos
Preservação dos cabeçalhos originais
Geração de planilha pronta para análise corporativa
🎨 Interface SaaS
Design moderno e responsivo
Layout baseado em Grid e Flexbox
Experiência otimizada para desktop e dispositivos móveis
Componentização visual limpa e organizada
🏗️ Arquitetura da Aplicação
Usuário
   │
   ▼
Frontend (HTML + CSS + JavaScript)
   │
   ▼
Flask Application Server
   │
   ├── CRUD de Produtos
   ├── API de Dados
   ├── Integração Excel
   └── Regras de Negócio
   │
   ▼
MySQL Database
🛠️ Tecnologias Utilizadas
Back-end
Python 3
Flask
PyMySQL
OpenPyXL
Front-end
HTML5
CSS3
JavaScript ES6
Banco de Dados
MySQL
Visualização de Dados
Chart.js
Ferramentas
VS Code
Git
GitHub
📂 Estrutura do Projeto
inventory-management-dashboard/
│
├── app.py
├── pasta2.xlsx
│
├── templates/
│   └── index.html
│
├── static/
│   ├── css/
│   ├── js/
│   └── assets/
│
└── README.md
⚙️ Configuração do Banco de Dados
CREATE DATABASE gestao_estoque;

USE gestao_estoque;

CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10,2) NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

🚀 Instalação e Execução
1. Clonar o Repositório
git clone https://github.com/seu-usuario/seu-repositorio.git
2. Instalar Dependências
pip install flask pymysql openpyxl
3. Executar o Projeto
python app.py