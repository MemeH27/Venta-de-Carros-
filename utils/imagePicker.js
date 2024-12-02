import * as ImagePicker from 'expo-image-picker';

export const seleccionarImagen = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    return result.assets[0].uri;
  } else {
    return null;
  }
};

export const subirImagen = async (uri) => {
  const formData = new FormData();
  formData.append('file', {
    uri,
    name: 'car-image.jpg',
    type: 'image/jpeg',
  });

  const respuesta = await fetch('https://mi-backend.com/upload', {
    method: 'POST',
    body: formData,
  });

  if (respuesta.ok) {
    const json = await respuesta.json();
    return json.url; 
  } else {
    throw new Error('Error al subir la imagen');
  }
};
