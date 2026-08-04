import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// Aqui eu importo o SCSS compilado do Bootstrap customizado
import './styles/custom-bootstrap.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)