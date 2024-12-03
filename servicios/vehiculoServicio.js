import axios from 'axios';

const API_URL = 'https://api.auto-data.net/'; // URL base de la API

const obtenerCarrosPorMarca = async (marca) => {
  try {
    const response = await axios.get(`${API_URL}?code=YOUR_CODE&format=json&brands=${marca}`);
    return response.data;  // Devuelve la lista de carros de la marca solicitada
  } catch (error) {
    console.error('Error al obtener carros:', error);
    throw error;
  }
};

const obtenerDetallesCarro = async (modeloId) => {
  try {
    const response = await axios.get(`${API_URL}?code=YOUR_CODE&format=json&brands=Audi`);
    return response.data;  // Devuelve los detalles del carro solicitado
  } catch (error) {
    console.error('Error al obtener detalles del carro:', error);
    throw error;
  }
};

export { obtenerCarrosPorMarca, obtenerDetallesCarro };

let carrosPublicados = []; // Aquí se guardan los carros publicados localmente

const guardarCarroPublicado = (carro) => {
  carrosPublicados.push(carro); // Agrega el carro a la lista local
};

const obtenerCarrosPublicados = () => {
  return carrosPublicados; // Devuelve los carros publicados
};

const obtenerCarrosDeAPI = async (marca) => {
  try {
    const response = await axios.get(`https://api.auto-data.net/?code=YOUR_CODE&format=json&brands=${marca}`);
    return response.data; // Devuelve la lista de carros obtenida de la API
  } catch (error) {
    console.error('Error al obtener carros de la API:', error);
    return [];
  }
};

export { guardarCarroPublicado, obtenerCarrosPublicados, obtenerCarrosDeAPI };
