import AsyncStorage from '@react-native-async-storage/async-storage';


export const guardarToken = async (token) => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (error) {
    console.error("Error al guardar el token", error);
  }
};


export const verificarAutenticacion = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (error) {
    console.error("Error al verificar la autenticación", error);
  }
};


export const eliminarToken = async () => {
  try {
    await AsyncStorage.removeItem('token');
  } catch (error) {
    console.error("Error al eliminar el token", error);
  }
};
