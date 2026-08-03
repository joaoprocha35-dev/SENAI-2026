# 🏭 Portal do Operador — Indústria 4.0

Sistema de gestão e perfil para operadores fabris desenvolvido durante o curso do SENAI. O projeto é composto por uma aplicação mobile/web em **React Native (Expo)** integrada a uma arquitetura de **microsserviços em Node.js** conectada ao banco de dados **MySQL**.

---

## 🚀 Tecnologias Utilizadas

### **Front-end / Mobile**
- [React Native](https://reactnative.dev/) (v0.81)
- [Expo](https://expo.dev/) (SDK 54)
- [Expo Router](https://docs.expo.dev/router/introduction/) (Navegação baseada em arquivos)
- React 19

### **Back-end (Microsserviços)**
- [Node.js](https://nodejs.org/) & Express
- [MySQL2](https://www.npmjs.com/package/mysql2) (Integração com banco de dados)
- [dotenv](https://www.npmjs.com/package/dotenv) (Variáveis de ambiente)
- [CORS](https://www.npmjs.com/package/cors)

---

## 📂 Estrutura do Projeto

```text
app-03/
├── frontend/             # Aplicação Mobile/Web em Expo
│   ├── app/              # Rotas do Expo Router
│   └── package.json
└── backend/              # Arquitetura de Microsserviços
    ├── servico-auth/     # Serviço de Autenticação (Porta 3001)
    │   ├── db.js
    │   └── server.js
    └── servico-perfil/   # Serviço de Gestão de Perfil (Porta 3002)
        ├── db.js
        └── server.js