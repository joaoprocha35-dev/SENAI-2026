import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'

function App() {
  // Estado para alternar entre as telas: login e cadastro
  const [tela, setTela] = useState('login')

  // Estados do formulário de cadastro (RF01)
  const [nome, setNome] = useState('')
  const [emailCadastro, setEmailCadastro] = useState('')
  const [senhaCadastro, setSenhaCadastro] = useState('')
  const [setor, setSetor] = useState('Usinagem')

  // Estados do formulário de login (RF02)
  const [emailLogin, setEmailLogin] = useState('')
  const [senhaLogin, setSenhaLogin] = useState('')

  // Estados de feedback visual da API
  const [mensagem, setMensagem] = useState('')
  const [carregando, setCarregando] = useState(false)

  // RF01 -> Cadastro de Operador (POST)
  const lidarCadastro = (e) => {
    e.preventDefault()
    setCarregando(true)
    setMensagem('')

    fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: emailCadastro,
        senha: senhaCadastro,
        nome: nome,
        setor: setor
      })
    })
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error('Erro ao cadastrar, dados inválidos')
        }

        return resposta.json()
      })
      .then((dados) => {
        setMensagem('Operador cadastrado com sucesso!')
        setCarregando(false)
      })
      .catch((erro) => {
        setMensagem(erro.message)
        setCarregando(false)
      })
  }

  // RF02 -> Login do Operador
  const lidarLogin = (e) => {
    e.preventDefault()
    setCarregando(true)
    setMensagem('')

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: emailLogin,
        senha: senhaLogin
      })
    })
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error('Erro ao fazer login, dados inválidos')
        }

        return resposta.json()
      })
      .then((dados) => {
        setMensagem('Login realizado com sucesso!')
        setCarregando(false)
      })
      .catch((erro) => {
        setMensagem(erro.message)
        setCarregando(false)
      })
  }

  return (
    <div className="container mt-5" style={{ maxWidth: '450px' }}>
      <h1 className="text-center mb-4">Sistema do Operador</h1>

      {/* Exibição da mensagem de feedback */}
      {mensagem && (
        <div className="alert alert-info text-center" role="alert">
          {mensagem}
        </div>
      )}

      {/* Tela de Login */}
      {tela === 'login' ? (
        <form onSubmit={lidarLogin} className="card p-4 shadow-sm">
          <h2 className="h4 mb-3 text-center">Acesso ao Sistema</h2>
          
          <div className="mb-3">
            <label className="form-label">E-mail</label>
            <input 
              type="email" 
              className="form-control"
              value={emailLogin} 
              onChange={(e) => setEmailLogin(e.target.value)} 
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Senha</label>
            <input 
              type="password" 
              className="form-control"
              value={senhaLogin} 
              onChange={(e) => setSenhaLogin(e.target.value)} 
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={carregando}>
            {carregando ? 'Autenticando...' : 'Entrar no Sistema'}
          </button>

          <div className="mt-3 text-center">
            <p className="mb-1 text-muted">Novo na Empresa?</p>
            <button 
              type="button" 
              className="btn btn-outline-primary btn-sm" 
              onClick={() => { setTela('cadastro'); setMensagem(''); }}
            >
              Cadastrar Operador
            </button>
          </div>
        </form>
      ) : (
        /* Tela de Cadastro */
        <form onSubmit={lidarCadastro} className="card p-4 shadow-sm">
          <h2 className="h4 mb-3 text-center">Cadastro de Operador</h2>

          <div className="mb-3">
            <label className="form-label">Nome Completo</label>
            <input 
              type="text" 
              className="form-control"
              value={nome} 
              onChange={(e) => setNome(e.target.value)} 
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">E-mail</label>
            <input 
              type="email" 
              className="form-control"
              value={emailCadastro} 
              onChange={(e) => setEmailCadastro(e.target.value)} 
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Senha</label>
            <input 
              type="password" 
              className="form-control"
              value={senhaCadastro} 
              onChange={(e) => setSenhaCadastro(e.target.value)} 
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Setor</label>
            <select 
              className="form-select" 
              value={setor} 
              onChange={(e) => setSetor(e.target.value)}
            >
              <option value="Usinagem">Usinagem</option>
              <option value="Montagem">Montagem</option>
              <option value="Qualidade">Qualidade</option>
              <option value="Manutenção">Manutenção</option>
              <option value="Desenvolvimento">Desenvolvimento</option>
            </select>
          </div>

          <button type="submit" className="btn btn-success w-100" disabled={carregando}>
            {carregando ? 'Cadastrando...' : 'Cadastrar Operador'}
          </button>

          <div className="mt-3 text-center">
            <p className="mb-1 text-muted">Já possui cadastro?</p>
            <button 
              type="button" 
              className="btn btn-outline-primary btn-sm" 
              onClick={() => { setTela('login'); setMensagem(''); }}
            >
              Voltar ao Login
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default App