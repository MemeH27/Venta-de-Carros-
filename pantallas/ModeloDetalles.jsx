import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ModeloDetalles = ({ route, navigation }) => {
  const { model, addToCart, addToSaved } = route.params;
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleLike = () => setLiked(!liked);

  const handleSave = () => {
    setSaved(!saved);
    addToSaved(model);
    Alert.alert('Guardado', 'El modelo ha sido añadido a tus guardados.');
  };

  const handleBuy = () => {
    addToCart(model);
    navigation.navigate('Carrito');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Imagen del carro */}
        <Image
          source={{
            uri: model.model_image
              ? model.model_image
              : 'https://via.placeholder.com/300x200?text=Car+Image',
          }}
          style={styles.image}
        />
        {/* Detalles del carro */}
        <View style={styles.content}>
          <Text style={styles.title}>{model.model_name}</Text>
          <Text style={styles.subtitle}>Año: {model.model_year || 'No especificado'}</Text>
          <Text style={styles.detailItem}>
            Tipo de Carrocería: {model.model_body || 'No especificado'}
          </Text>
          <Text style={styles.detailItem}>
            Combustible: {model.model_engine_fuel || 'No especificado'}
          </Text>
        </View>

        {/* Acciones */}
        <View style={styles.actions}>
          {/* Botón Me gusta */}
          <TouchableOpacity onPress={handleLike} style={styles.actionButton}>
            <Ionicons
              name={liked ? 'heart' : 'heart-outline'}
              size={24}
              color={liked ? 'red' : '#555'}
            />
            <Text style={styles.actionText}>Me gusta</Text>
          </TouchableOpacity>

          {/* Botón Guardar */}
          <TouchableOpacity onPress={handleSave} style={styles.actionButton}>
            <Ionicons
              name={saved ? 'bookmark' : 'bookmark-outline'}
              size={24}
              color={saved ? 'blue' : '#555'}
            />
            <Text style={styles.actionText}>Guardar</Text>
          </TouchableOpacity>

          {/* Botón Comprar */}
          <TouchableOpacity onPress={handleBuy} style={styles.buyButton}>
            <Text style={styles.buyButtonText}>Comprar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f0f8ff' },
  card: {
    backgroundColor: '#007bff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginBottom: 16,
  },
  content: { paddingHorizontal: 16, paddingBottom: 16 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: { fontSize: 18, color: '#ddd', marginBottom: 8 },
  detailItem: { fontSize: 16, color: '#fff', marginBottom: 4 },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#0056b3',
    borderTopWidth: 1,
    borderColor: '#004080',
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: { fontSize: 14, color: '#fff', marginTop: 4 },
  buyButton: {
    backgroundColor: '#ff5722',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buyButtonText: { fontSize: 16, color: '#fff', fontWeight: 'bold' },
});

export default ModeloDetalles;
