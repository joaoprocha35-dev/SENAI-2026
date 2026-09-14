import { useState, useEffect } from 'react';

function App() {
  // Estados para guardar as tarefas da API e o status de carregamento
  const [tarefas, settarefas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // useEffect com fetch para buscar as tarefas da API quando o componente é montado
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10') // Utilizado https para evitar bloqueios de segurança
      .then((resposta) => resposta.json())
      .then((dados) => {
        settarefas(dados);
        setCarregando(false);
      });
  }, []);

  return (
    <div className="container my-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white p-3">
          <h2 className="h4 mb-1">Tarefas vindas da API</h2>
          <p className="mb-0 small opacity-75">
            Consumindo dados de JSONPlaceholder via fetch e useState
          </p>
        </div>

        <div className="card-body">
          {carregando ? (
            <div className="d-flex align-items-center justify-content-center my-4 gap-2 text-primary">
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Carregando...</span>
              </div>
              <span>Carregando dados da API...</span>
            </div>
          ) : (
            <ul className="list-group list-group-flush">
              {tarefas.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center py-3"
                >
                  <span className="fw-medium text-secondary">{item.title}</span>
                  <span
                    className={`badge ${
                      item.completed ? 'bg-success' : 'bg-warning text-dark'
                    }`}
                  >
                    {item.completed ? 'Concluída' : 'Pendente'}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;