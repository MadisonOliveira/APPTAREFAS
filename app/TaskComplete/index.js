import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CompletedTasksScreen = ({ route, navigation }) => {
  const { tasks } = route.params; // Recebe as tarefas do parâmetro da rota
  const completedTasks = tasks.filter(task => task.completed); // Filtra as tarefas concluídas

  const handleRemoveAllTasks = async () => {
    Alert.alert(
      'Confirmar',
      'Tem certeza que deseja remover todas as tarefas concluídas?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Remover',
          onPress: async () => {
            // Remove as tarefas concluídas
            const updatedTasks = tasks.filter(task => !task.completed);
            await AsyncStorage.setItem('@tasks', JSON.stringify(updatedTasks)); // Atualiza AsyncStorage
            navigation.goBack(); // Volta para a tela anterior
          },
        },
      ],
      { cancelable: false }
    );
  };

  const renderTask = ({ item }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tarefas Concluídas</Text>
      <Text style={styles.countText}>Total: {completedTasks.length}</Text>

      <FlatList
        data={completedTasks}
        renderItem={renderTask}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />

      <TouchableOpacity style={styles.removeButton} onPress={handleRemoveAllTasks}>
        <Text style={styles.buttonText}>Remover Todas as Tarefas Concluídas</Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  countText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  taskItem: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  taskText: {
    color: '#fff',
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: '#ff4d4d',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CompletedTasksScreen;
