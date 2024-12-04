import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const Perfil = ({ navigation }) => {
  const [name, setName] = useState('Elmer'); // Nombre del usuario
  const [email, setEmail] = useState('yayirobe2305@gmail.com'); // Email del usuario
  const [password, setPassword] = useState('Meme'); // Contraseña del usuario
  const [profileImage, setProfileImage] = useState(null); // Imagen del perfil

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permisos denegados', 'Necesitamos acceso a tus fotos para cambiar la imagen de perfil.');
      }
    };

    requestPermissions();
  }, []);

  const handleEditProfile = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'El nombre no puede estar vacío.');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Error', 'La contraseña no puede estar vacía.');
      return;
    }

    console.log('Perfil actualizado');
    Alert.alert('Éxito', 'Tu perfil ha sido actualizado.');
  };

  const handleImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        allowsEditing: true,
        aspect: [1, 1], // Mantén la imagen cuadrada
      });

      // Verifica si el usuario canceló la selección
      if (result.canceled) {
        Alert.alert('Operación cancelada', 'No se seleccionó ninguna imagen.');
        return;
      }

      // Valida que la imagen tenga una URI válida
      if (result.assets && result.assets.length > 0) {
        setProfileImage(result.assets[0].uri); // Actualiza la URI de la imagen seleccionada
      } else {
        Alert.alert('Error', 'No se pudo cargar la imagen seleccionada.');
      }
    } catch (error) {
      console.error('Error al seleccionar la imagen:', error);
      Alert.alert('Error', 'Hubo un problema al seleccionar la imagen. Intenta nuevamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Perfil</Text>

      {/* Imagen de perfil */}
      <TouchableOpacity onPress={handleImagePicker}>
        <Image
          style={styles.profileImage}
          source={profileImage ? { uri: profileImage } : require('../assets/usuario.png')}
        />
      </TouchableOpacity>
      <Text style={styles.editText}>Toca la imagen para cambiarla</Text>

      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Correo</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        editable={false} // No editable, solo para mostrar
      />

      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Actualizar Perfil" onPress={handleEditProfile} />
      <TouchableOpacity onPress={() => navigation.navigate('Inicio')} style={styles.link}>
        <Text style={styles.linkText}>Volver al Inicio</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#0044cc',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
  },
  editText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  link: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: '#0044cc',
    textDecorationLine: 'underline',
  },
});

export default Perfil;