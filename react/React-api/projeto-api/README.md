# 📋 Lista de Tarefas (GET API) - Atividade SENAI

Atividade desenvolvida no curso do SENAI para praticar a busca e renderização de dados assíncronos usando a **Fetch API** em um componente React.

## 🚀 Tecnologias Utilizadas
- **React** (`useState`, `useEffect`)
- **Bootstrap** (card, badges, spinner e list groups)
- **Fetch API** (requisição do tipo `GET`)
- **JSONPlaceholder** (API pública utilizada para listar tarefas/To-Dos)

## 🎯 Funcionalidades
- **Consumo de API (`GET`):** Busca automática dos dados da API ao carregar o componente via `useEffect`.
- **Indicador de Carregamento:** Exibição de spinner (loading) enquanto os dados estão sendo buscados.
- **Renderização Dinâmica:** Listagem de tarefas com tratamento do status (badges visuais para "Concluída" e "Pendente").