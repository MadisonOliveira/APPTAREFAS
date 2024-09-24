import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

const TaskModal = ({ isVisible, onClose, onAddTask, taskToEdit, onEditTask }) => {
  const [task, setTask] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setTask(taskToEdit.text);
    } else {
      setTask('');
    }
  }, [taskToEdit]);

  const handleSubmit = () => {
    if (taskToEdit) {
      onEditTask(taskToEdit.id, task);
    } else {
      onAddTask(task);
    }
    setTask('');
    onClose();
  };

  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <Text style={styles.title}>{taskToEdit ? 'Editar Tarefa' : 'Adicionar Tarefa'}</Text>
        <TextInput
          style={styles.input}
          value={task}
          onChangeText={setTask}
          placeholder="Descrição da tarefa"
          placeholderTextColor="#888"
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#ff4d4d',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TaskModal;
