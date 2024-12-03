// pantallas/PublicarCarro.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Picker } from 'react-native';

const PublicarCarro = () => {
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [año, setAño] = useState('');
  const [precio, setPrecio] = useState('');

  const handleSubmit = () => {
    // Lógica para enviar los datos del carro al backend
    console.log('Carro publicado');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Publicar Carro</Text>

      <Text style={styles.label}>Marca</Text>
      <TextInput
        style={styles.input}
        value={marca}
        onChangeText={setMarca}
      />

      <Text style={styles.label}>Modelo</Text>
      <TextInput
        style={styles.input}
        value={modelo}
        onChangeText={setModelo}
      />

      <Text style={styles.label}>Año</Text>
      <TextInput
        style={styles.input}
        value={año}
        onChangeText={setAño}
      />

      <Text style={styles.label}>Precio</Text>
      <TextInput
        style={styles.input}
        value={precio}
        onChangeText={setPrecio}
      />

      <Button title="Publicar" onPress={handleSubmit} />
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
});

export default PublicarCarro;
