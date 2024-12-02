import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import Login from "./pantallas/Login";
import Registro from "./pantallas/Registro";
import Inicio from "./pantallas/Inicio";
import AgregarCarro from "./pantallas/AgregarCarro"; 

const Stack = createNativeStackNavigator(); 

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [registrando, setRegistrando] = useState(false);
  const [agregandoCarro, setAgregandoCarro] = useState(false);

  const manejarLogin = (datosUsuario) => {
    setUsuario(datosUsuario);
  };

  const manejarRegistro = (nuevoUsuario) => {
    setUsuario(nuevoUsuario);
    setRegistrando(false);
  };

  const manejarAgregarCarro = (nuevoCarro) => {
    console.log("Carro agregado:", nuevoCarro);
    setAgregandoCarro(false);
  };

  return (
    <NavigationContainer> {/* Envolvemos nuestra app en NavigationContainer */}
      <Stack.Navigator>
        {usuario ? (
          <Stack.Screen name="Inicio" options={{ title: 'Inicio' }}>
            {(props) => (
              <Inicio
                {...props}
                usuario={usuario}
                onAgregarCarro={() => setAgregandoCarro(true)}
                onEditarCarro={(id) => alert("Funcionalidad para editar carro " + id)}
                onEliminarCarro={(id) => alert("Funcionalidad para eliminar carro " + id)}
              />
            )}
          </Stack.Screen>
        ) : registrando ? (
          <Stack.Screen name="Registro" options={{ title: 'Registro' }}>
            {(props) => <Registro {...props} onRegister={manejarRegistro} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Login" options={{ title: 'Login' }}>
            {(props) => <Login {...props} onLogin={manejarLogin} />}
          </Stack.Screen>
        )}

        {agregandoCarro && (
          <Stack.Screen name="AgregarCarro" options={{ title: 'Agregar Carro' }}>
            {(props) => <AgregarCarro {...props} onAgregarCarro={manejarAgregarCarro} />}
          </Stack.Screen>
        )}

        {!registrando && !usuario && (
          <Stack.Screen name="RegistroLink" options={{ headerShown: false }}>
            {(props) => (
              <View style={styles.linkContainer}>
                <Text
                  style={styles.link}
                  onPress={() => setRegistrando(true)}
                >
                  ¿No tienes una cuenta? Regístrate aquí.
                </Text>
              </View>
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  link: {
    marginTop: 20,
    color: "blue",
    textDecorationLine: "underline",
    marginBottom: 30,
  },
  linkContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
