import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisteredTasksScreen = ({ route, navigation }) => {
  const { tasks, setTasks } = route.params; // Recebe setTasks como prop para atualizar o estado

  const handleDeleteAll = () => {
    Alert.alert(
      'Remover Todas as Tarefas',
      'Você tem certeza que deseja remover todas as tarefas cadastradas?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'OK', onPress: handleRemoveAllTasks },
      ]
    );
  };

  const handleRemoveAllTasks = async () => {
    Alert.alert(
      'Confirmar',
      'Tem certeza que deseja remover todas as tarefas cadastradas?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Remover',
          onPress: async () => {
            // Remove todas as tarefas
            await AsyncStorage.removeItem('@tasks'); // Remove todas as tarefas do AsyncStorage
            setTasks([]); // Atualiza o estado das tarefas na tela inicial
            navigation.goBack(); // Volta para a tela anterior
          },
        },
      ],
      { cancelable: false }
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskText}>{item.text}</Text>
      {/* Adicione um botão para editar, se necessário */}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tarefas Cadastradas</Text>
      <Text style={styles.countText}>Total: {tasks.length}</Text>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity style={styles.deleteAllButton} onPress={handleDeleteAll}>
        <Text style={styles.deleteAllText}>Remover Todas as Tarefas</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  countText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#666',
  },
  list: {
    paddingBottom: 20,
  },
  taskItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  deleteAllButton: {
    backgroundColor: '#d9534f',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  deleteAllText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RegisteredTasksScreen;
