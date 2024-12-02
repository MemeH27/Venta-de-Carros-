import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function AgregarCarro({ onAgregarCarro }) {
  const [modelo, setModelo] = useState("");
  const [marca, setMarca] = useState("");
  const [anio, setAnio] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState(null);

  const seleccionarImagen = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Se necesitan permisos para acceder a la galería de imágenes.");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImagen(result.uri);
    }
  };

  const manejarAgregarCarro = () => {
    if (!modelo || !marca || !anio || !precio) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const nuevoCarro = { modelo, marca, anio, precio, imagen };
    onAgregarCarro(nuevoCarro);
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Agregar Carro</Text>

      <Text>Modelo</Text>
      <TextInput
        style={styles.input}
        value={modelo}
        onChangeText={setModelo}
        placeholder="Modelo"
      />

      <Text>Marca</Text>
      <TextInput
        style={styles.input}
        value={marca}
        onChangeText={setMarca}
        placeholder="Marca"
      />

      <Text>Año</Text>
      <TextInput
        style={styles.input}
        value={anio}
        onChangeText={setAnio}
        placeholder="Año"
        keyboardType="numeric"
      />

      <Text>Precio</Text>
      <TextInput
        style={styles.input}
        value={precio}
        onChangeText={setPrecio}
        placeholder="Precio"
        keyboardType="numeric"
      />

      <Button title="Seleccionar Imagen" onPress={seleccionarImagen} />

      {imagen && (
        <Image source={{ uri: imagen }} style={styles.imagen} />
      )}

      <Button title="Agregar Carro" onPress={manejarAgregarCarro} />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  imagen: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});
