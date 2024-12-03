import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { REACT_APP_API_TOKEN, REACT_APP_API_SECRET } from '@env'; // Asegúrate de usar las variables de entorno

const ExplorarCarros = () => {
  const [carros, setCarros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarros = async () => {
      try {
        // Hacer la solicitud a la API con el token de autenticación
        const response = await axios.get('https://api.carapi.com/cars', {
          headers: {
            'Authorization': `Bearer ${REACT_APP_API_TOKEN}`,
            'x-api-secret': REACT_APP_API_SECRET,
          },
        });

        // Suponiendo que la respuesta contiene un array de carros en `data.cars`
        setCarros(response.data.cars); 
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar los carros:', error);
        setLoading(false);
      }
    };

    fetchCarros();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Cargando carros...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={carros}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.carItem}>
            <Text style={styles.carTitle}>{item.name}</Text>
            <Text style={styles.carDetails}>{item.year} - {item.model}</Text>
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
    backgroundColor: '#f5f5f5',
  },
  carItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  carTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  carDetails: {
    fontSize: 14,
    color: '#888',
  },
});

export default ExplorarCarros;
