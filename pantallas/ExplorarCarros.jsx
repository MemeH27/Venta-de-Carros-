import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

const ExplorarCarros = ({ navigation }) => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userPublishedCars, setUserPublishedCars] = useState([]); // Estado para carros publicados por el usuario

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(
          'https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getMakes'
        );
        const text = await response.text();

        // Limpieza de JSONP
        const json = JSON.parse(text.replace(/^\?\(/, '').replace(/\);$/, ''));

        if (json.Makes) {
          setCars(json.Makes);
          setFilteredCars(json.Makes); // Inicializar lista filtrada
        } else {
          setError('No se pudieron cargar los carros.');
        }
      } catch (err) {
        console.error(err);
        setError('Error al cargar los carros.');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Simulamos los carros publicados por el usuario
  useEffect(() => {
    const obtenerCarrosPublicados = () => {
      // Aquí puedes obtener los carros de la base de datos o un servicio.
      // Para la demostración, se agregarán carros simulados.
      setUserPublishedCars([
        { make_id: 'toyota', make_display: 'Toyota', make_country: 'Japón' },
        { make_id: 'ford', make_display: 'Ford', make_country: 'EE. UU.' },
      ]);
    };

    obtenerCarrosPublicados();
  }, []);

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = [...cars, ...userPublishedCars].filter((car) =>
      car.make_display.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCars(filtered);
  };

  const handleVerDetalles = (car) => {
    navigation.navigate('DetallesCarro', {
      make: car.make_id,
      model: car.make_display, // En esta API no hay modelos exactos, se usará este parámetro
      year: 2022, // Año predeterminado (puedes ajustar si hay datos más dinámicos)
    });
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando carros...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar por marca..."
        value={searchText}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredCars}
        keyExtractor={(item) => item.make_id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.carCard}
            onPress={() => handleVerDetalles(item)}
          >
            <Text style={styles.carName}>{item.make_display}</Text>
            <Text style={styles.carCountry}>País: {item.make_country}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  carCard: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  carName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  carCountry: {
    fontSize: 14,
    color: '#555',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ExplorarCarros;
