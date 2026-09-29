import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {

  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');
  const [carregando, setCarregando] = useState(true);

  //1.GET - Buscar tarefas iniciais da API 
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then((res) => res.json())
      .then((dados) => {
        setTarefas(dados);
        setCarregando(false);
      });
  }, []);

  //2.POST - Cadastrar Nova Tarefa
  const lidarComSubmitPost = (e) => {
    e.preventDefault();
    if (!novaTarefa.trim()) return;

    fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: novaTarefa, completed: false, userId: 1 })
    })
      .then((res) => res.json())
      .then((dadoCriado) => {
        setTarefas([dadoCriado, ...tarefas]);
        setNovaTarefa('');
      });
  };

  //3.FUNCÃO PATCH (Alteração Parcial)
  const alternarStatusPatch = (id, statusAtual) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !statusAtual })
    })
      .then((res) => res.json())
      .then(() => {
        setTarefas(
          tarefas.map((item) => item.id === id ? { ...item, completed: !statusAtual } : item)
        );
      });
  };

  //4.FUNCAO PUT (Substituição Total)
  const editarTituloPut = (itemOriginal) => {
    const novoTitulo = prompt('Digite o novo nome da tarefa: ', itemOriginal.title);
    if (!novoTitulo) return;
    fetch(`https://jsonplaceholder.typicode.com/todos/${itemOriginal.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: itemOriginal.id,
        title: novoTitulo,
        completed: itemOriginal.completed,
        userId: itemOriginal.userId
      })
    })
      .then((res) => res.json())
      .then((dadosAtualizado) => {
        setTarefas(
          tarefas.map((item) => item.id === itemOriginal.id ? dadosAtualizado : item)
        );
      });
  };

  //5.DELETE - Remover a tarefa
  const deletarTarefa = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'DELETE'
    }).then((res) => {
      if (res.ok) {
        setTarefas(tarefas.filter((item) => item.id !== id));
      }
    });
  };

  return (
    <div className="container mt-4">
      <div className="card p-4">
        <h2>Gestão de Tarefas da Fábrica</h2>
        <p className="text-muted">Atualização de dados via PATCH e PUT</p>

        <form onSubmit={lidarComSubmitPost} className='input-group mb-4'>
          <input
            type="text"
            className='form-control'
            placeholder='Nova tarefa de manutenção...'
            value={novaTarefa}
            onChange={(e) => setNovaTarefa(e.target.value)}
          />
          <button className="btn btn-primary" type='submit'>Cadastrar (POST)</button>
        </form>

        <ul className="list-group">
          {tarefas.map((item) => (
            <li key={item.id} className='list-group-item align-items-center'>

              {/* TEXTO DA TAREFA */}
              <span
                style={{ textDecoration: item.completed ? 'line-through' : 'none', cursor: 'pointer' }}
                onClick={() => alternarStatusPatch(item.id, item.completed)}
              >
                {item.title}{' '}
                <small className='text-muted'>
                  [{item.completed ? 'Concluída' : 'Pendente'}]
                </small>
              </span>

              {/* GRUPO DE BOTÕES DE AÇÃO */}
              <div className="d-flex justify-content-end">

                {/* BOTÃO PATCH */}
                <button
                  className={`btn btn-sm me-1 ${item.completed ? 'btn-warning' : 'btn-success'}`}
                  onClick={() => alternarStatusPatch(item.id, item.completed)}
                >
                  {item.completed ? 'Refazer' : 'Concluir'} (PATCH)
                </button>

                {/* BOTÃO PUT */}
                <button
                  className='btn btn-outline-secondary btn-sm me-1'
                  onClick={() => editarTituloPut(item)}
                >
                  Editar (PUT)
                </button>

                {/* BOTÃO DELETE */}
                <button
                  className='btn btn-danger btn-sm'
                  onClick={() => deletarTarefa(item.id)}
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App