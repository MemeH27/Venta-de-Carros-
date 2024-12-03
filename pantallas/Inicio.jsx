import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Inicio = ({ navigation }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        setUserData(JSON.parse(user));
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    navigation.navigate('Login');
  };

  const handleProfileEdit = () => {
    navigation.navigate('Perfil');
  };

  const renderInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '';
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/fondo.jpg')} style={styles.backgroundImage} />
      <View style={styles.overlay}></View>

      <View style={styles.profileHeader}>
        <View style={styles.profileImageContainer}>
          {userData?.profilePicture ? (
            <Image source={{ uri: userData.profilePicture }} style={styles.profileImage} />
          ) : (
            <Text style={styles.profileImage}>{renderInitial(userData?.name)}</Text>
          )}
        </View>
        <Text style={styles.username}>{userData?.name || 'Usuario'}</Text>
        <TouchableOpacity style={styles.editProfileButton} onPress={handleProfileEdit}>
          <Text style={styles.buttonText}>Editar Perfil</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mainContent}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BuscarCarro')}>
          <Icon name="car" size={20} color="#0044cc" />
          <Text style={styles.buttonText}>Comprar un carro</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ExplorarCarros')}>
          <Icon name="search" size={20} color="#0044cc" />
          <Text style={styles.buttonText}>Explorar carros</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
          <Icon name="sign-out" size={20} color="#0044cc" />
          <Text style={styles.menuText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>

      {/* Botón flotante para publicar carro */}
      <TouchableOpacity style={styles.floatingButton} onPress={() => navigation.navigate('PublicarCarro')}>
        <Icon name="plus" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.5,
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  profileHeader: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#0044cc',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    fontSize: 30,
    lineHeight: 80,
    color: '#0044cc',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  editProfileButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#0044cc',
    marginLeft: 10,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 15,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  menu: {
    backgroundColor: '#fff',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  menuText: {
    fontSize: 16,
    color: '#0044cc',
    marginLeft: 10,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#0044cc',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default Inicio;
