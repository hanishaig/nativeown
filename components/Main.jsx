import React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Main = ({ navigation }) => {
  return (
    <View>
      <Text>Welcome to Main Screen</Text>
      <Button
        title="Go to Chat"
        onPress={() => navigation.navigate("Chat")} // Navigate to ChatScreen
      />
    </View>
  );
};

export default Main;
