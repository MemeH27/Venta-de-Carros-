import React, { useState } from "react";
import { View, Text, Button, StyleSheet, FlatList, Alert } from "react-native";

const carrosSimulados = [
  { id: "1", modelo: "Toyota Tacoma", precio: "$30,000", imagen: "url_imagen_1", disponible: true },
  { id: "2", modelo: "Honda CR-V", precio: "$25,000", imagen: "url_imagen_2", disponible: true },
  { id: "3", modelo: "Ford Mustang", precio: "$45,000", imagen: "url_imagen_3", disponible: true },
];

const Inicio = ({ usuario, onAgregarCarro, onEditarCarro, onEliminarCarro }) => {
  const esAdministradorOEmpleado = usuario.tipoUsuario === "administrador" || usuario.tipoUsuario === "empleado";
  const esCliente = usuario.tipoUsuario === "cliente";

  const comprarCarro = (id) => {
    Alert.alert("Confirmar compra", "¿Estás seguro de que quieres comprar este carro?", [
      {
        text: "Cancelar",
      },
      {
        text: "Comprar",
        onPress: () => {
          
          alert("Carro comprado exitosamente");
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.carro}>
      <Text style={styles.carroTexto}>{item.modelo}</Text>
      <Text>{item.precio}</Text>
      {esAdministradorOEmpleado && (
        <View style={styles.botones}>
          <Button title="Editar" onPress={() => onEditarCarro(item.id)} />
          <Button title="Eliminar" onPress={() => onEliminarCarro(item.id)} />
        </View>
      )}
      {esCliente && item.disponible && (
        <Button title="Comprar" onPress={() => comprarCarro(item.id)} />
      )}
    </View>
  );

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Carros Disponibles</Text>

      <FlatList
        data={carrosSimulados}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      {esAdministradorOEmpleado && (
        <Button title="Agregar Carro" onPress={onAgregarCarro} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 20,
  },
  carro: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    width: "100%",
    maxWidth: 400,
  },
  carroTexto: {
    fontSize: 18,
    fontWeight: "bold",
  },
  botones: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default Inicio;
