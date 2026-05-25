import axios from "axios";

const api = axios.create({
  baseURL: "http://10.90.194.181:3000", // Substitua pela URL do seu backend
  //Opcional: Adicione headers ou outras configurações aqui, se necessário
  timeout: 5000, // Tempo limite para as requisições (5 segundos)
  
  //Obrigatório: passar o tipo do dado | configurar o tipo de dado que é o json
  headers: {
    "Content-Type": "application/json"
  }
}); 
export default api