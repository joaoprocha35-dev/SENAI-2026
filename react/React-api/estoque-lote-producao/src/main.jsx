import React from 'react'
import ReactDOM from 'react-dom/client' // <-- Esta linha estava faltando
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)