// pantallas/Inicio.jsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Inicio = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bienvenido a VentaDeCarros</Text>
      <Button title="Comprar un carro" onPress={() => { /* Lógica para comprar */ }} />
      <Button title="Publicar un carro" onPress={() => { /* Lógica para publicar */ }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Inicio;
