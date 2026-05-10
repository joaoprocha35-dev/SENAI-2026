🔙 API - Estudos (Projeto SENAI)
Esta API foi desenvolvida para gerenciar as informações e fornecer suporte ao aplicativo mobile do projeto realizado no SENAI, focando no gerenciamento de perfis e dados de usuários.

🚀 Tecnologias
Node.js (Ambiente de execução)

JavaScript (Linguagem de programação)

🔗 Integração
Este projeto é a parte do Backend (servidor). O código do aplicativo Front-end que consome esta API está disponível em:
👉 https://github.com/joaoprocha35-dev/projeto-mobile-senai

▶️ Como rodar o servidor localmente
Siga os passos abaixo no seu terminal:

Instale as dependências necessárias:

Bash
npm install
Inicie o servidor:

Bash
node server.js
📌 Rotas Disponíveis
GET /usuarios - Retorna a lista de usuários e seus dados (nome, campos de perfil).

PUT /usuarios/:id - Edita as informações de um usuário específico (nome, campos de edição).

GET /usuarios/:id - Busca os detalhes de um usuário para preencher a tela de edição.

📌 Status do Projeto
🚧 Em desenvolvimento (Fase de estudos)

Desenvolvido por João Rocha durante as aulas no SENAI.