import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'
function App() {
  const Inicio = () => (
    <div className="card p-4 shadow-sm">
      <h2>Bem-vindo ao meu Currículo Online</h2>
      <p className="text-muted">Utilize o menu acima para navegar pelas seções.</p>
    </div>
  );

  const Portfolio = () => (
    <div className="card p-4 shadow-sm">
      <h2>Portfólio</h2>
      <p className="text-muted">Confira abaixo os meus projetos mais recentes.</p>
    </div>
  );

  const Contato = () => (
    <div className="card p-4 shadow-sm">
      <h2>Contato</h2>
      <p className="mb-0">Envie uma mensagem para: <strong>aluno@email.com</strong></p>
    </div>
  );

  return (
    <Router>
      <div className="container py-4">
        {/* Navbar adaptada com grid do Bootstrap */}
        <nav className="row bg-light p-3 rounded mb-4 align-items-center shadow-sm">
          <div className="col-md-6 fw-bold fs-5 text-primary">
            <span>Meu Currículo Online</span>
          </div>
          <div className="col-md-6 d-flex justify-content-md-end gap-3 mt-2 mt-md-0">
            <Link to="/" className="btn btn-outline-primary btn-sm">Início</Link>
            <Link to="/portfolio" className="btn btn-outline-primary btn-sm">Portfólio</Link>
            <Link to="/contato" className="btn btn-outline-primary btn-sm">Contato</Link>
          </div>
        </nav>

        {/* Áreas das Páginas em uma coluna centralizada */}
        <div className="row justify-content-center">
          <div className="col-12 col-md-10">
            <Routes>
              <Route path='/' element={<Inicio />} />
              <Route path='/portfolio' element={<Portfolio />} />
              <Route path='/contato' element={<Contato />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;