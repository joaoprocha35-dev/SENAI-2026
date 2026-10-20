import { useState } from 'react';
import CardMaquina from './components/CardMaquina';
import FormNovaMaquina from './components/FormNovaMaquina';

function App() {
  // Lista inicial de máquinas
  const [maquinas, setMaquinas] = useState(['Torno CNC #01', 'Prensa Hidráulica']);

  // Função para adicionar nova máquina
  const adicionarMaquina = (novoNome) => {
    setMaquinas([...maquinas, novoNome]);
  };

  // 1. FUNÇÃO PARA REMOVER MÁQUINA PELO ÍNDICE
  const removerMaquina = (indexParaRemover) => {
    const listaAtualizada = maquinas.filter((_, index) => index !== indexParaRemover);
    setMaquinas(listaAtualizada);
  };

  return (
    <div className="container py-4" style={{ maxWidth: '500px' }}>
      <h3 className="text-center mb-4">Controle de Maquinário SENAI</h3>
      
      {/* Formulário de cadastro */}
      <FormNovaMaquina onAddMaquina={adicionarMaquina} />

      <h5 className="mt-4">Máquinas Monitoradas ({maquinas.length})</h5>
      
      {/* 2. MENSAGEM DE PAINEL VAZIO OU LISTA DE MÁQUINAS */}
      {maquinas.length === 0 ? (
        <div className="empty-state-container text-center my-4 p-4">
          <div className="empty-state-icon mb-2">⚠️</div>
          <p className="empty-state-texto m-0">
            Nenhuma máquina cadastrada no momento.
          </p>

        </div>
      ) : (
        <div className="d-flex flex-column gap-2 mt-3">
          {maquinas.map((nomeMaquina, index) => (
            <CardMaquina 
              key={index} 
              nome={nomeMaquina} 
              index={index} 
              onRemover={() => removerMaquina(index)} /* Passa a função de remoção com o índice atual */
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;