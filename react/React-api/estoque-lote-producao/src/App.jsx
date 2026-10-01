import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Importação das nossas páginas
import PainelLotes from './pages/PainelLotes';
import DetalheLote from './pages/DetalheLote';

export default function App() {
  return (
    // 1. O BrowserRouter monitora as mudanças de URL no navegador sem recarregar a página
    <BrowserRouter>
      
      {/* 2. REQUISITO PARTE 1: Menu Superior Fixo com Link para a rota inicial (/) */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow">
        <div className="container">
          <Link className="navbar-brand fw-bold text-uppercase d-flex align-items-center gap-2" to="/">
            🏭 Fábrica - Gestão de Lotes
          </Link>
          <div className="navbar-nav">
            <Link className="nav-link active" to="/">
              Painel Principal
            </Link>
          </div>
        </div>
      </nav>

      {/* 3. Mapeamento das Rotas da Aplicação */}
      <Routes>
        {/* Rota 1: Tela Principal (Lista de Lotes) */}
        <Route path="/" element={<PainelLotes />} />

        {/* Rota 2: Tela Detalhada (Prontuário com ID dinâmico) */}
        <Route path="/lote/:id" element={<DetalheLote />} />
      </Routes>

    </BrowserRouter>
  );
}