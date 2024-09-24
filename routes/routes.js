import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../app/Login';
import Home from '../app/Home';
import CompletedTasksScreen from '../app/TaskComplete';
import RegisteredTasksScreen from '../app/TaskRegister';

const Stack = createStackNavigator();



const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login}  options={{title: "Página de Login"}}/>
        <Stack.Screen name="Home" component={Home} options={{title: "Página de Principal"}}/>
        <Stack.Screen name="CompletedTasks" component={CompletedTasksScreen} options={{title: "Tarefas Completas"}}/>
        <Stack.Screen name="RegisteredTasksScreen" component={RegisteredTasksScreen} options={{title: "Tarefas Cadastradas"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
