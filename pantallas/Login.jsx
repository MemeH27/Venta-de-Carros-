import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Validaciones de campos
  const validateLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Por favor, ingresa un correo válido.");
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    console.log("Intentando iniciar sesión...");
  
    try {
      const response = await axios.post('http://192.168.1.17:5000/login', {
        email,
        password,
      });
  
      if (response.status === 200) {
        const { token } = response.data;
        console.log("Token recibido:", token);
        
        if (token) {
          // Guardar el token en el almacenamiento seguro, por ejemplo AsyncStorage
          await AsyncStorage.setItem('userToken', token);
          console.log("Token almacenado correctamente.");
          
          // Navegar a la pantalla de inicio
          navigation.navigate('Inicio'); // Asegúrate de usar el nombre correcto de la pantalla
        }
      } else {
        throw new Error("Credenciales incorrectas.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      Alert.alert("Error", "Correo o contraseña incorrectos.");
    }
  };
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Iniciar sesión" onPress={handleLogin} />

      <TouchableOpacity onPress={() => navigation.navigate('Registro')} style={styles.link}>
        <Text style={styles.linkText}>¿No tienes cuenta? Regístrate</Text>
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
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  link: {
    marginTop: 10,
    alignItems: 'center',
  },
  linkText: {
    color: '#0044cc',
    textDecorationLine: 'underline',
  }
});

export default Login;
