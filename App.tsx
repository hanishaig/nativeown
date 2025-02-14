import { View, Text } from 'react-native';
import React from 'react';
import "./global.css"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splashscreen from "../pro10/components/Splashscreen"
import Main from '../pro10/components/Main';  // Correct import for Main
import ChatScreen from './components/ChatScreen';
const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splashscreen"
          component={Splashscreen}
          options={{ headerShown: false }}  // Optionally hide header for Splashscreen
        />
        <Stack.Screen
          name="Main"
          component={Main}
        />
        <Stack.Screen name="Chat" 
        component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
