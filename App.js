import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './pantallas/Login'; 
import Registro from './pantallas/Registro'; 
import Inicio from './pantallas/Inicio'; 
import { verificarAutenticacion } from './utils/auth'; 

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = await verificarAutenticacion(); 
      if (token) {
        setIsLoggedIn(true); 
      }
    };
    checkAuthStatus();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? "Inicio" : "Login"}>
        {/* Si el usuario está autenticado, muestra la pantalla de Inicio */}
        <Stack.Screen 
          name="Inicio" 
          component={Inicio} 
          options={{ headerShown: false }} 
        />
        
        {/* Si el usuario no está autenticado, muestra las pantallas de Login y Registro */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registro" component={Registro} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

