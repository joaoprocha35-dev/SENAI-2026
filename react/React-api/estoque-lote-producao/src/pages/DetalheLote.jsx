import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSave, FaCheckCircle } from 'react-icons/fa';
import './DetalheLote.css';

export default function DetalheLote(){

    //captura de parâmetros ':id' vindo da URL (ex: em /lote/3, o id será '3')
    const {id} = useParams();

    //Hook para podermos navegar programaticamente de volta à página inicial
    const navigate = useNavigate();

    //Guarda os dados do lote trazidos pela api
    const [lote, setLote] = useState(null);

    //Controla a exibição de 'Carregando...' enquanto a requisição não termina
    const [carregando, setCarregando] = useState(true);

    //exibi a mensagem de confirmação após salvar via put
    const [mensagemSucesso, setMensagemSucesso] = useState('');

    //Buscando dados exclusivos do lote (get por id)
    useEffect(()=> {
        setCarregando(true);

        //Faz a requisição na rota específica do item
        fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then((resposta)=> resposta.json())
        .then((dados)=> {
            setLote(dados);
            setCarregando(false);
        })
        .catch((error) => {
            console.error('Erro ao buscar prontuário:', erro);
            setCarregando(false);
        });
    }, [id]); //Executa sempre que o parâmetro da URL mudar

    //Edição completa de dados (PUT)
    const handleAlterarAlteracoes = (e) => {
    e.preventDefault();

    //Dispara a requqisição PUT substituindo os dados do item no servidor
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
        // Atualiza o estado local com a resposta confirmada da API
        setLote(dadosAtualizados);

        // Exibe a mensagem de confirmação solicitada no requisito
        setMensagemSucesso('Dados do lote atualizados com sucesso!');

        // Remove a mensagem após 3 segundos
        setTimeout(() => setMensagemSucesso(''), 3000);
      })
      .catch((erro) => console.error('Erro ao atualizar lote:', erro));
  };

  // Se a API ainda estiver a responder, mostra um indicador simples
  if (carregando) {
    return (
      <div className="detalhe-container d-flex justify-content-center align-items-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando dados...</span>
        </div>
      </div>
    );
  }

  // Se não encontrar o lote
  if (!lote) {
    return (
      <div className="container py-5 text-center">
        <h4>Lote não encontrado!</h4>
        <button onClick={() => navigate('/')} className="btn btn-primary mt-3">
          Voltar ao Painel
        </button>
      </div>
    );
  }

  // =========================================================================
  // 5. INTERFACE DO COMPONENTE (JSX)
  // =========================================================================
  return (
    <div className="detalhe-container py-4">
      <div className="container">
        
        {/* REQUISITO PARTE 1: Botão Voltar ao Painel usando useNavigate */}
        <button
          onClick={() => navigate('/')}
          className="btn btn-outline-secondary mb-4 d-inline-flex align-items-center gap-2"
        >
          <FaArrowLeft /> ← Voltar ao Painel
        </button>

        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            
            {/* Feedback visual de Sucesso (PUT) */}
            {mensagemSucesso && (
              <div className="alert alert-success d-flex align-items-center gap-2 mb-3">
                <FaCheckCircle /> {mensagemSucesso}
              </div>
            )}

            {/* Card do Prontuário do Lote */}
            <div className="card card-prontuario shadow-sm p-4">
              <h3 className="text-primary fw-bold mb-4">
                Prontuário do Lote #{lote.id}
              </h3>

              <form onSubmit={handleSalvarAlteracoes}>
                {/* REQUISITO PARTE 2: Input editável para o Nome do Lote */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Nome / Descrição do Lote:</label>
                  <input
                    type="text"
                    className="form-control input-edicao"
                    value={lote.title}
                    onChange={(e) => setLote({ ...lote, title: e.target.value })}
                  />
                </div>

                {/* Status de Inspeção */}
                <div className="mb-4">
                  <label className="form-label fw-bold d-block">Status de Inspeção:</label>
                  <span className={`badge fs-6 ${lote.completed ? 'bg-success' : 'bg-warning text-dark'}`}>
                    {lote.completed ? 'Aprovado' : 'Em Inspeção'}
                  </span>
                </div>

                {/* REQUISITO PARTE 2: Botão para disparar o PUT */}
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
