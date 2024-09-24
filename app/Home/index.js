import React, { useEffect, useState } from 'react';
import { View, Button, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskList from '../../components/TaskList';
import TaskModal from '../../components/TaskModal';
import { useNavigation } from '@react-navigation/native';

const STORAGE_KEY = '@tasks';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [username, setUsername] = useState("");
  const [completedTasks, setCompletedTasks] = useState(0);
  const navigation = useNavigation();

  // Recupera o nome de usuário
  const fetchUserData = async () => {
    try {
      const user = await AsyncStorage.getItem("usuario");
      if (user) {
        const { nome } = JSON.parse(user);
        setUsername(nome);
      }
    } catch (error) {
      console.log("Erro ao recuperar nome de usuário:", error);
    }
  };

  // Carrega as tarefas do AsyncStorage
  const loadTasks = async () => {
    try {
      const jsonTasks = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonTasks) {
        const taskList = JSON.parse(jsonTasks);
        const validatedTasks = taskList.map(task => ({
          ...task,
          creationDate: task.creationDate || new Date().toISOString()
        }));
        setTasks(validatedTasks);
        const completedCount = validatedTasks.filter(task => task.completed).length;
        setCompletedTasks(completedCount);
      }
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
    }
  };

  useEffect(() => {
    loadTasks();
    fetchUserData();
  }, []);

  // Salva as tarefas no AsyncStorage
  const saveTasks = async (tasks) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error(error);
    }
  };

  // Adiciona uma nova tarefa
  const addTask = (task) => {
    const newTasks = [...tasks, { 
      id: Date.now().toString(), 
      text: task, 
      completed: false,
      creationDate: new Date().toISOString() 
    }];
    setTasks(newTasks);
    saveTasks(newTasks);
    setModalVisible(false);
  };

  // Alterna o status de conclusão da tarefa
  const toggleTaskCompletion = (id) => {
    const newTasks = tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task));
    setTasks(newTasks);
    saveTasks(newTasks);
    const completedCount = newTasks.filter(task => task.completed).length;
    setCompletedTasks(completedCount);
  };

  // Remove uma tarefa
  const deleteTask = (id) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  // Abre o modal de edição
  const openEditModal = (task) => {
    setTaskToEdit(task);
    setModalVisible(true);
  };

  // Edita uma tarefa
  const editTask = (id, updatedText) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, text: updatedText } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setTaskToEdit(null); // Limpa a tarefa a ser editada
  };

  return (
    <View style={styles.container}>
      <View style={styles.taskSummary}>
        <TouchableOpacity style={styles.summaryCardCadastradas} onPress={() => navigation.navigate('RegisteredTasksScreen', { tasks, setTasks })}>
          <Text style={styles.summaryText}>Tarefas Cadastradas</Text>
          <Text style={styles.summaryCount}>{tasks.length}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.summaryCard} onPress={() => navigation.navigate('CompletedTasks', { tasks })}>
          <Text style={styles.summaryText}>Tarefas Concluídas</Text>
          <Text style={styles.summaryCount}>{completedTasks}</Text>
        </TouchableOpacity>
      </View>

      <Button title="Adicionar Tarefa" onPress={() => setModalVisible(true)} />
      
      <TaskList 
        tasks={tasks} 
        toggleTaskCompletion={toggleTaskCompletion} 
        deleteTask={deleteTask} 
        openEditModal={openEditModal} 
      />
      
      <TaskModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onAddTask={addTask}
        onEditTask={editTask} // Passando a função de edição
        taskToEdit={taskToEdit}
      />
      
      <Text style={styles.usernameText}>Olá, {username}!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  taskSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  summaryCard: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  summaryCardCadastradas: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  summaryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  summaryCount: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 5,
  },
  usernameText: {
    marginTop: 20,
    fontSize: 18,
    color: '#333',
  },
});

export default Home;
