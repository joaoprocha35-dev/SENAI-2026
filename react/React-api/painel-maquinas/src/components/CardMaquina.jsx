import { useState } from 'react';
import './CardMaquina.css';

function CardMaquina({ nome, index = 0, onRemover }) {
  // 1. Estado local para o status da máquina
  const [status, setStatus] = useState('Desligada');

  // 2. Função para alternar o status 
  const alternarStatus = () => {
    if (status === 'Desligada') {
      setStatus('Ligada');
    } else {
      setStatus('Desligada');
    }
  };

  // Variável CSS inline para o delay da animação em cascata
  const cascadeDelay = { '--delay': `${index * 0.15}s` };

  return (
    <div 
      className="card p-3 my-2 mx-auto card-maquina-container" 
      style={cascadeDelay}
    >
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="maquina-titulo m-0">Máquina: {nome}</h5>
        
        {/* BOTÃO DE REMOVER/EXCLUIR */}
        <button 
          className="btn-deletar-maquina" 
          onClick={onRemover}
          title="Remover máquina"
        >
          🗑️ Excluir
        </button>
      </div>
      
      <p className="my-2 maquina-status-texto">
        Status Atual: 
        <span className={`ms-2 maquina-badge ${status === 'Ligada' ? 'badge-ligada' : 'badge-desligada'}`}>
          {status}
        </span>
      </p>

      <button 
        className={`maquina-btn ${status === 'Ligada' ? 'btn-desligar' : 'btn-ligar'}`}
        onClick={alternarStatus}
      >
        {status === 'Ligada' ? 'Desligar Máquina' : 'Ligar Máquina'}
      </button>
    </div>
  );
}

export default CardMaquina;