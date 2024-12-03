import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DetallesCarro = ({ route }) => {
  const { make, year } = route.params;
  const [carDetails, setCarDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(
          `https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getModels&make=${make}`
        );
        const text = await response.text();

        // Limpieza de JSONP
        const json = JSON.parse(text.replace(/^\?\(/, '').replace(/\);$/, ''));

        if (json.Models.length > 0) {
          const filteredModels = json.Models.filter(
            (car) => car.model_year === year.toString()
          );

          if (filteredModels.length > 0) {
            setCarDetails(filteredModels[0]);
          } else {
            setCarDetails({ error: `No se encontraron detalles para el año ${year}.`, allModels: json.Models });
          }
        } else {
          setError('No se encontraron detalles del carro.');
        }
      } catch (err) {
        console.error(err);
        setError('Error al cargar los detalles del carro.');
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [make, year]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando detalles del carro...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (carDetails && carDetails.error) {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.errorText}>{carDetails.error}</Text>
        <Text style={styles.subtitle}>Modelos disponibles de {make}:</Text>
        {carDetails.allModels.map((model, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate('ModeloDetalles', { model })}
          >
            <View style={styles.detailsContainer}>
              <Text style={styles.detailItem}>Modelo: {model.model_name}</Text>
              <Text style={styles.detailItem}>Año: {model.model_year}</Text>
              <Text style={styles.detailItem}>Tipo de carrocería: {model.model_body || 'No especificado'}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{carDetails.model_name}</Text>
      <Text style={styles.subtitle}>
        Marca: {carDetails.make_display} | Año: {carDetails.model_year}
      </Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailItem}>Tipo de Carro: {carDetails.model_body || 'No especificado'}</Text>
        <Text style={styles.detailItem}>Tipo de Motor: {carDetails.model_engine_position || 'No especificado'}</Text>
        <Text style={styles.detailItem}>Número de Puertas: {carDetails.model_doors || 'No especificado'}</Text>
        <Text style={styles.detailItem}>Tipo de Combustible: {carDetails.model_engine_fuel || 'No especificado'}</Text>
        <Text style={styles.detailItem}>Transmisión: {carDetails.model_transmission_type || 'No especificado'}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#555', marginBottom: 16 },
  detailsContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  detailItem: { fontSize: 14, marginBottom: 8 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 16, color: 'red', marginBottom: 16 },
});

export default DetallesCarro;
