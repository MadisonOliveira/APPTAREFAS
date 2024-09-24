import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
const Login = () => {
  const [username, setUsername] = useState('');


  const navigation = useNavigation();



  const fazerLogin = async (username) => {
    const usuario = { nome: username };

    // Salvar o nome do usuário no AsyncStorage
    await AsyncStorage.setItem("usuario", JSON.stringify(usuario));

    // Recuperar e navegar para a próxima tela
    const user = await AsyncStorage.getItem("usuario");

    if (user) {
      navigation.navigate("Home", { usuario: JSON.parse(user).nome });
    } else {
      navigation.navigate("Login");
    }
  };






return (
  <View style={style.container}>

    <Image
      source={require("../../imagem/logo.png")}
    />


    <Text style={style.title}>Bem-Vindo</Text>


    <TextInput
      style={style.inputNameUser}
      placeholder="Digite seu nome"
      placeholderTextColor="#aaa"
      onChangeText={setUsername}
      value={username}
    />


<TouchableOpacity
        style={style.btnEntrar}
        onPress={() => fazerLogin(username)} 
      >
        <Text style={style.btnEntrarText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const style = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 20,
    gap: 20,
  },

  loginIcon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: "#333",
    marginBottom: 10,
  },

  inputNameUser: {
    width: "80%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  btnEntrar: {
    width: "80%",
    backgroundColor: "#4CAF50",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },

  btnEntrarText: {
    fontSize: 21,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
