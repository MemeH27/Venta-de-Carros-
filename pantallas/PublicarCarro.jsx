import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, ActivityIndicator, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';

const PublicarCarro = () => {
  const [carImage, setCarImage] = useState(null);
  const [carName, setCarName] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carYear, setCarYear] = useState('');
  const [loading, setLoading] = useState(false);

  // Solicitar permisos al cargar el componente
  useEffect(() => {
    const requestPermissions = async () => {
      // Permisos para galería
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Acceso denegado', 'Necesitamos acceso a tus fotos para que puedas publicar un carro.');
      }
    };

    requestPermissions();
  }, []);

  const handleSelectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Acceso denegado', 'Se requiere acceso a tus fotos para seleccionar una imagen.');
      return;
    }

    // Selección de imagen
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,  // Permite recortar la imagen
      aspect: [4, 3],       // Aspecto de la imagen (opcional)
    });

    if (!result.cancelled) {
      setCarImage(result.uri); // Guardar la URI de la imagen seleccionada
    }
  };

  const handlePublishCar = () => {
    if (!carName || !carModel || !carYear || !carImage) {
      Alert.alert('Campos incompletos', 'Por favor, completa todos los campos y selecciona una imagen.');
      return;
    }

    setLoading(true);

    // Simulando la publicación en un servidor o base de datos
    setTimeout(() => {
      setLoading(false);
      Alert.alert('¡Carro publicado!', 'Tu carro ha sido publicado exitosamente.');
      setCarImage(null);
      setCarName('');
      setCarModel('');
      setCarYear('');
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Publicar tu Carro</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre del Carro"
        value={carName}
        onChangeText={setCarName}
      />
      <TextInput
        style={styles.input}
        placeholder="Modelo del Carro"
        value={carModel}
        onChangeText={setCarModel}
      />
      <TextInput
        style={styles.input}
        placeholder="Año del Carro"
        value={carYear}
        onChangeText={setCarYear}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.imageSelector} onPress={handleSelectImage}>
        <Text style={styles.imageSelectorText}>
          {carImage ? 'Imagen seleccionada' : 'Selecciona una imagen'}
        </Text>
      </TouchableOpacity>

      {carImage && (
        <View style={styles.imagePreview}>
          <Text>Vista previa:</Text>
          <Image source={{ uri: carImage }} style={styles.image} />
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={handlePublishCar} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Publicar Carro</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 15,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
  },
  imageSelector: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  imageSelectorText: {
    color: '#007BFF',
    fontSize: 16,
  },
  imagePreview: {
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default PublicarCarro;
