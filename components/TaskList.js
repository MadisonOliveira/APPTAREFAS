import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Checkbox } from 'expo-checkbox';

const TaskList = ({ tasks, toggleTaskCompletion, deleteTask, openEditModal }) => {
  const getDaysOpen = (creationDate) => {
    if (!creationDate) {
      console.error("Data de criação é indefinida");
      return 0; // Retorna 0 dias se a data for indefinida
    }
  
    const today = new Date();
    const creationDateObj = new Date(creationDate); // Converte a string de volta para um objeto Date
  
    if (isNaN(creationDateObj.getTime())) {
      console.error("Data de criação inválida:", creationDate);
      return 0; // Retorna 0 dias se a data for inválida
    }
  
    const diffTime = Math.abs(today - creationDateObj);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Converte milissegundos para dias
    return diffDays;
  };
  

  return (
    <View>
      {tasks.map(task => (
        <View key={task.id} style={styles.taskItem}>
          <Checkbox
            value={task.completed}
            onValueChange={() => toggleTaskCompletion(task.id)}
            color={task.completed ? '#4CAF50' : undefined} // Verde se marcado
          />
          <View style={styles.taskDetails}>
            <Text style={{ textDecorationLine: task.completed ? 'line-through' : 'none' }}>
              {task.text}
            </Text>
            <Text style={styles.daysOpenText}>
              {getDaysOpen(task.creationDate)} dias em aberto
            </Text>
          </View>
          <View style={styles.buttonsContainer}>
            <Button title="Editar" onPress={() => openEditModal(task)} />
            <Button title="Deletar" onPress={() => deleteTask(task.id)} color="red" />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  taskDetails: {
    flex: 1,
    paddingLeft: 10,
  },
  daysOpenText: {
    marginTop: 5,
    color: '#666',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default TaskList;
