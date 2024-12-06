import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

const RecordingApp = () => {
  const [recordings, setRecordings] = useState([]);
  const [recording, setRecording] = useState(null);

  const startRecording = async () => {
    try {
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) {
        alert('Permission to access microphone is required!');
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const newRecording = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );

      setRecording(newRecording);
    } catch (error) {
      console.error('Failed to start recording', error);
    }
  };

  const stopRecording = async () => {
    setRecording((current) => {
      if (current) {
        current.stopAndUnloadAsync();
        setRecordings((prev) => [
          ...prev,
          {
            uri: current.getURI(),
            timestamp: new Date().toISOString(),
          },
        ]);
      }
      return null;
    });
  };

  const playRecording = async (uri) => {
    const { sound } = await Audio.Sound.createAsync({ uri });
    sound.playAsync();
  };

  const deleteRecording = (timestamp) => {
    setRecordings((prev) =>
      prev.filter((recording) => recording.timestamp !== timestamp)
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recording App</Text>
      {recording ? (
        <Button title="Stop Recording" onPress={stopRecording} />
      ) : (
        <Button title="Start Recording" onPress={startRecording} />
      )}
      <FlatList
        data={recordings}
        keyExtractor={(item) => item.timestamp}
        renderItem={({ item }) => (
          <View style={styles.recordingItem}>
            <Text>{item.timestamp}</Text>
            <Button title="Play" onPress={() => playRecording(item.uri)} />
            <Button
              title="Delete"
              onPress={() => deleteRecording(item.timestamp)}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  recordingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default RecordingApp;
