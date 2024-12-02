import * as SecureStore from 'expo-secure-store';


export const guardarToken = async (token) => {
  await SecureStore.setItemAsync('usuarioToken', token);
};


export const obtenerToken = async () => {
  return await SecureStore.getItemAsync('usuarioToken');
};


export const estaAutenticado = async () => {
  const token = await obtenerToken();
  return token ? true : false;
};


export const eliminarToken = async () => {
  await SecureStore.deleteItemAsync('usuarioToken');
};
