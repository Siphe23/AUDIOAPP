import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Home = ({ route, navigation }) => {
  const { username } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome, {username}!</Text>
      <Button
        title="Go to Recording App"
        onPress={() => navigation.navigate('RecordingApp')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default Home;
