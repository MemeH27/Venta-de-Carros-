import React, { useState } from 'react';
import { View, TextInput, Button, Text, Picker, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { enviarCorreo } from '../utils/email';
import { registrarUsuario } from '../utils/auth';

export default function Registro() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('Cliente'); 
  const navigation = useNavigation();

  const handleRegistro = async () => {
    try {
      
      const usuarioExistente = await registrarUsuario(nombre, correo, contrasena, tipoUsuario);

      if (usuarioExistente) {
        alert('El correo o nombre de usuario ya está en uso');
        return;
      }

      
      await enviarCorreo(correo, 'Bienvenido a la app Venta de Carros', 'Tu cuenta ha sido creada exitosamente.');

      navigation.navigate('Inicio');
    } catch (error) {
      console.error(error);
      alert('Hubo un error al registrarse');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Nombre</Text>
      <TextInput 
        style={styles.input} 
        value={nombre} 
        onChangeText={setNombre} 
        placeholder="Nombre de usuario" 
      />
      
      <Text>Correo Electrónico</Text>
      <TextInput 
        style={styles.input} 
        value={correo} 
        onChangeText={setCorreo} 
        placeholder="Correo electrónico" 
      />
      
      <Text>Contraseña</Text>
      <TextInput 
        style={styles.input} 
        value={contrasena} 
        onChangeText={setContrasena} 
        placeholder="Contraseña" 
        secureTextEntry 
      />

      <Text>Tipo de Usuario</Text>
      <Picker
        selectedValue={tipoUsuario}
        onValueChange={(itemValue) => setTipoUsuario(itemValue)}
      >
        <Picker.Item label="Cliente" value="Cliente" />
        <Picker.Item label="Empleado" value="Empleado" />
        <Picker.Item label="Administrador" value="Administrador" />
      </Picker>

      <Button title="Registrarse" onPress={handleRegistro} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});