import { Routes, Route } from "react-router-dom"
import Navbar from "../components/Navbar"
import Cockpit from "../pages/Cockpit"
import GestaoLotes from "../pages/GestaoLotes"
import Prontuario from "../pages/Prontuario"
function App() {

  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Cockpit />} />
          <Route path="/lotes" element={<GestaoLotes />} />
          <Route path="/prontuario/:id" element={<Prontuario />} />
        </Routes>
      </div>
    </>
  )
}

export default App
