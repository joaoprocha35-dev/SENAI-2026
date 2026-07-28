
import React from "react";
//importar a rota no react
import ReactDOM from 'react-dom/client';
//carregar o bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>

)