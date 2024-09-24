import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import React from 'react';
import { View, Text } from 'react-native';
import Routes from './routes/routes'; 

const App = () => {
  return (
    <Routes /> 
  );
};

registerRootComponent(App);
