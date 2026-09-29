import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaSyncAlt, FaPlus } from 'react-icons/fa';
import './PainelLotes.css';

export default function PainelLotes() {
  // =========================================================================
  // 1. ESTADOS (useState)
  // =========================================================================
  // Guarda a lista de lotes trazida da API
  const [lotes, setLotes] = useState([]);
  
  // Guarda o texto digitado no campo de cadastro do novo lote
  const [novoTitulo, setNovoTitulo] = useState('');

  // =========================================================================
  // 2. CICLO DE VIDA (useEffect + GET)
  // =========================================================================
  // Este hook é executado assim que o componente é montado no ecrã
  useEffect(() => {
    // Requisito 1: Buscar os 8 primeiros registos da API
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=8')
      .then((resposta) => resposta.json())
      .then((dados) => {
        // Guarda os 8 itens recebidos no estado 'lotes'
        setLotes(dados);
      })
      .catch((erro) => console.error('Erro ao buscar lotes:', erro));
  }, []); // Array vazio [] garante que a requisição só roda 1 vez na abertura
  // =========================================================================
  // 3. REQUISITO PARTE 2: Cadastrar Novo Lote (POST)
  // =========================================================================
  const handleCadastrarLote = (e) => {
    e.preventDefault(); // Impede o recarregamento padrão da página

    // Validação simples: não cadastra se o campo estiver vazio
    if (!novoTitulo.trim()) return;

    // Dispara a requisição POST para a API
    fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: novoTitulo,
        completed: false // Regra do negócio: novo lote nasce como pendente/false
      })
    })
      .then((resposta) => resposta.json())
      .then((novoLoteCriado) => {
        // A API mockada simula e devolve o item com um ID gerado (ex: id: 201)
        // Atualizamos o estado local colocando o novo item no INÍCIO da lista
        setLotes([novoLoteCriado, ...lotes]);

        // Limpa o campo de texto do formulário
        setNovoTitulo('');
      })
      .catch((erro) => console.error('Erro ao cadastrar lote:', erro));
  };

  // =========================================================================
  // 4. REQUISITO PARTE 2: Alternar Status (PATCH)
  // =========================================================================
  const handleAlternarStatus = (id, statusAtual) => {
    const novoStatus = !statusAtual; // Inverte o valor booleano (true vira false e vice-versa)

    // Dispara requisição PATCH enviando apenas o atributo alterado
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: novoStatus })
    })
      .then((resposta) => resposta.json())
      .then(() => {
        // Atualiza a lista local trocando apenas o status do item clicado
        const listaAtualizada = lotes.map((lote) => {
          if (lote.id === id) {
            return { ...lote, completed: novoStatus };
          }
          return lote;
        });

        // Atualiza o estado para redesenhar a tela instantaneamente
        setLotes(listaAtualizada);
      })
      .catch((erro) => console.error('Erro ao alternar status:', erro));
  };

  // =========================================================================
  // 5. INTERFACE DO COMPONENTE (JSX)
  // =========================================================================
  return (
    <div className="painel-container py-4">
      <div className="container">
        
        {/* Cabeçalho */}
        <div className="row mb-4">
          <div className="col-12">
            <h2 className="text-primary fw-bold">Estoque de Lotes de Produção</h2>
            <p className="text-muted">Painel geral de auditoria e controle</p>
          </div>
        </div>

        {/* Formulário de Cadastro (POST) */}
        <div className="row mb-4">
          <div className="col-12">
            <form onSubmit={handleCadastrarLote} className="card form-cadastro-box p-3 shadow-sm">
              <h5 className="card-title mb-3">Cadastrar Novo Lote</h5>
              <div className="row g-2">
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Digite o nome/código do lote..."
                    value={novoTitulo}
                    onChange={(e) => setNovoTitulo(e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <button type="submit" className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2">
                    <FaPlus /> Cadastrar Lote (POST)
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Grid de Cards dos Lotes (GET) */}
        <div className="row g-3">
          {lotes.map((lote) => (
            <div key={lote.id} className="col-12 col-md-6 col-lg-3">
              <div className="card lote-card h-100 p-3 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-bold text-secondary">Lote #{lote.id}</span>
                    
                    {/* Badge dinâmica condicional */}
                    <span className={`badge ${lote.completed ? 'badge-aprovado' : 'badge-inspecao'}`}>
                      {lote.completed ? 'Aprovado' : 'Em Inspeção'}
                    </span>
                  </div>
                  
                  <h6 className="card-title text-truncate mb-3" title={lote.title}>
                    {lote.title}
                  </h6>
                </div>

                {/* Botões de Ação */}
                <div className="d-flex flex-column gap-2 mt-3">
                  <button
                    onClick={() => handleAlternarStatus(lote.id, lote.completed)}
                    className="btn btn-outline-secondary btn-sm d-flex align-items-center justify-content-center gap-1"
                  >
                    <FaSyncAlt /> Alternar Status (PATCH)
                  </button>

                  <Link
                    to={`/lote/${lote.id}`}
                    className="btn btn-primary btn-sm d-flex align-items-center justify-content-center gap-1"
                  >
                    <FaEye /> Ver Prontuário
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}