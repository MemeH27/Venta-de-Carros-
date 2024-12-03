import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';

const Perfil = ({ navigation }) => {
  const [name, setName] = useState('Elmer');  // Nombre del usuario
  const [email, setEmail] = useState('yayirobe2305@gmail.com');  // Email del usuario
  const [password, setPassword] = useState('Meme');  // Contraseña del usuario
  const [profileImage, setProfileImage] = useState(null);  // Imagen del perfil

  const handleEditProfile = () => {
    // Lógica para editar el perfil, se puede hacer una solicitud PUT a tu API
    console.log('Perfil actualizado');
  };

  const handleImagePicker = () => {
    // Lógica para elegir una imagen para el perfil
    console.log('Elegir imagen');
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
        editable={false}  // No editable, solo para mostrar
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
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    alignSelf: 'center',
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
