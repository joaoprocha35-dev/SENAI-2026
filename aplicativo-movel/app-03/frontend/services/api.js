import axios from 'axios';


const IP_LOCAL = '10.12.249.50';

// Instância única conectada diretamente à portaria (API Gateway na porta 3000)

const api = axios.create({
  baseURL: `http://${IP_LOCAL}:3000`,
  headers: {
    'Content-Type' : 'application/json',
  }
});

export default api;