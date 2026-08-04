import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Inicio from './pages/inicio.jsx';
import Sobre from './pages/sobre.jsx';
import Portfolio from './pages/portfolio.jsx';

function App() {
  // Aqui eu gerencio o estado do tema (dark por padrão)
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Aqui eu aplico o tema escolhido diretamente no atributo do elemento raiz
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Função simples para alternar entre dark e light mode
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <Router>
      <div className="min-vh-100 d-flex flex-column position-relative">
        {/* Navbar minimalista e flutuante sem caixa de container */}
        <header className="position-fixed top-0 end-0 p-4 z-3 d-flex align-items-center gap-3">
          <nav className="d-flex gap-2">
            <NavLink
              to="/"
              className={({ isActive }) => `clean-nav-link ${isActive ? 'active' : ''}`}
            >
              Início
            </NavLink>
            <NavLink
              to="/sobre"
              className={({ isActive }) => `clean-nav-link ${isActive ? 'active' : ''}`}
            >
              Sobre mim
            </NavLink>
            <NavLink
              to="/portfolio"
              className={({ isActive }) => `clean-nav-link ${isActive ? 'active' : ''}`}
            >
              Projetos
            </NavLink>
          </nav>

          {/* Botão de alternância de tema */}
          <button
            onClick={toggleTheme}
            className="btn btn-outline-success btn-sm rounded-circle ms-2"
            title="Mudar Tema"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </header>

        {/* Área onde as páginas/rotas são renderizadas */}
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/portfolio" element={<Portfolio />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;