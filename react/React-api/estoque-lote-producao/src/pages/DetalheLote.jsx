import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSave, FaCheckCircle } from 'react-icons/fa';
import './DetalheLote.css';

export default function DetalheLote() {
  // Captura o ID vindo da URL (ex: /lote/3)
  const { id } = useParams();

  // Hook para navegação entre páginas
  const navigate = useNavigate();

  // Estados da aplicação
  const [lote, setLote] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [erroApi, setErroApi] = useState(false);

  // Buscando dados do lote (GET por ID)
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error('Lote não encontrado no servidor.');
        }
        return resposta.json();
      })
      .then((dados) => {
        setLote(dados);
        setCarregando(false);
      })
      .catch((erro) => {
        console.error('Erro ao buscar prontuário:', erro);
        setErroApi(true);
        setCarregando(false);
      });
  }, [id]);

  // Edição completa de dados (PUT) - Nome corrigido aqui
  const handleSalvarAlteracoes = (e) => {
    e.preventDefault();

    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: lote.id,
        title: lote.title,
        completed: lote.completed,
        userId: lote.userId
      })
    })
      .then((resposta) => resposta.json())
      .then((dadosAtualizados) => {
        setLote(dadosAtualizados);
        setMensagemSucesso('Dados do lote atualizados com sucesso!');
        setTimeout(() => setMensagemSucesso(''), 3000);
      })
      .catch((erro) => console.error('Erro ao atualizar lote:', erro));
  };

  // Tela de Carregando
  if (carregando) {
    return (
      <div className="detalhe-container d-flex justify-content-center align-items-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando dados...</span>
        </div>
      </div>
    );
  }

  // Tratamento amigável para lote não encontrado (Erro 404)
  if (erroApi || !lote || !lote.id) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-warning d-inline-block p-4 shadow-sm">
          <h4>Lote #{id} não encontrado!</h4>
          <p className="text-muted mb-3">
            Na API do JSONPlaceholder, itens novos criados no POST (como o lote rgb(34, 0, 0)) não ficam salvos no servidor real deles.
          </p>
          <button onClick={() => navigate('/')} className="btn btn-primary d-inline-flex align-items-center gap-2">
            <FaArrowLeft /> Voltar ao Painel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="detalhe-container py-4">
      <div className="container">
        
        {/* Botão Voltar ao Painel */}
        <button
          onClick={() => navigate('/')}
          className="btn btn-outline-secondary mb-4 d-inline-flex align-items-center gap-2"
        >
          <FaArrowLeft /> Voltar ao Painel
        </button>

        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            
            {/* Mensagem de confirmação */}
            {mensagemSucesso && (
              <div className="alert alert-success d-flex align-items-center gap-2 mb-3">
                <FaCheckCircle /> {mensagemSucesso}
              </div>
            )}

            {/* Card do Prontuário */}
            <div className="card card-prontuario shadow-sm p-4">
              <h3 className="text-primary fw-bold mb-4">
                Prontuário do Lote #{lote.id}
              </h3>

              <form onSubmit={handleSalvarAlteracoes}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Nome / Descrição do Lote:</label>
                  <input
                    type="text"
                    className="form-control input-edicao"
                    value={lote.title || ''}
                    onChange={(e) => setLote({ ...lote, title: e.target.value })}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold d-block">Status de Inspeção:</label>
                  <span className={`badge fs-6 ${lote.completed ? 'bg-success' : 'bg-warning text-dark'}`}>
                    {lote.completed ? 'Aprovado' : 'Em Inspeção'}
                  </span>
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100 d-flex align-items-center justify-content-center gap-2"
                >
                  <FaSave /> Salvar Alterações (PUT)
                </button>
              </form>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}