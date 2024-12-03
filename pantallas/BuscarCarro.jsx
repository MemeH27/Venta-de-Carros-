// pantallas/BuscarCarro.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const BuscarCarro = () => {
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [anio, setAnio] = useState('');
  const [carros, setCarros] = useState([
    // Ejemplo de datos, puedes cargar desde tu servidor o base de datos
    { id: '1', marca: 'Toyota', modelo: 'Tacoma', anio: 2008 },
    { id: '2', marca: 'Honda', modelo: 'Civic', anio: 2019 },
    { id: '3', marca: 'Ford', modelo: 'Focus', anio: 2021 },
  ]);

  const buscarCarros = () => {
    // Lógica para filtrar los carros según los criterios (simulada aquí)
    const resultados = carros.filter(carro => {
      return (
        (marca ? carro.marca.toLowerCase().includes(marca.toLowerCase()) : true) &&
        (modelo ? carro.modelo.toLowerCase().includes(modelo.toLowerCase()) : true) &&
        (anio ? carro.anio.toString().includes(anio) : true)
      );
    });
    setCarros(resultados);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar Carros</Text>

      <TextInput
        style={styles.input}
        placeholder="Marca"
        value={marca}
        onChangeText={setMarca}
      />
      <TextInput
        style={styles.input}
        placeholder="Modelo"
        value={modelo}
        onChangeText={setModelo}
      />
      <TextInput
        style={styles.input}
        placeholder="Año"
        value={anio}
        onChangeText={setAnio}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={buscarCarros}>
        <Icon name="search" size={20} color="#fff" />
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>

      <FlatList
        data={carros}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.carItem}>
            <Text>{item.marca} {item.modelo} ({item.anio})</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#0044cc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 10,
  },
  carItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default BuscarCarro;