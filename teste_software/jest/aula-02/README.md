# 🧪 Teste de Software — Simulando Escritas e Manipulação de Erros

Projeto desenvolvido durante os estudos de **Teste de Software com JavaScript e Jest**, com foco na criação de testes automatizados, validações e manipulação de erros.

## 📚 Conceito da Aula

Nesta aula foram praticados conceitos de **escrita de testes**, validação de comportamentos esperados e tratamento de situações que podem gerar erros durante a execução da aplicação.

Foram simulados diferentes cenários:

* ✅ Autenticação com sucesso
* ⚠️ Campos obrigatórios
* ⚠️ Usuário com formato inválido
* ⚠️ Senha com poucos caracteres
* ❌ Credenciais inválidas
* 👨‍💼 Validação de usuário administrador

## 📁 Arquivos

* `auth.js` — Contém as validações e regras de autenticação.
* `auth.test.js` — Contém os testes automatizados dos diferentes cenários.

## 🛠️ Tecnologias

* JavaScript
* Node.js
* Jest

## 📦 Instalação

Após clonar o projeto, instale as dependências:

```bash
npm install
```

Para instalar o Jest manualmente em um projeto:

```bash
npm install --save-dev jest
```

## 🧪 Recursos do Jest Utilizados

| Recurso         | Função                                              |
| --------------- | --------------------------------------------------- |
| `test()`        | Cria um cenário de teste.                           |
| `expect()`      | Define o resultado esperado.                        |
| `toBe()`        | Verifica se o valor é exatamente igual ao esperado. |
| `toBeDefined()` | Verifica se o valor foi definido.                   |
| `toThrow()`     | Verifica se uma função lança um erro.               |

## ▶️ Executando os Testes

Com as dependências instaladas, execute:

```bash
npx jest
```

Ou, caso o projeto possua o script configurado no `package.json`:

```bash
npm test
```

### 🎯 Objetivo

Praticar a criação de testes automatizados, validações e **tratamento de erros** durante o desenvolvimento de software.

---

> 🚀 **Estudos de Teste de Software — JavaScript + Jest**
