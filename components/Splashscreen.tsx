import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';

const Splashscreen = ({ navigation }: any) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Main"); 
    }, 3000);
  }, []); 

  return (
    <View style={styles.container}>
      <Image 
        source={require("../assests/images/applogo.jpg")} 
        style={styles.logo} 
      />
      <Text style={styles.text}>Rethur AI</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75, 
  },
  text: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Splashscreen;
