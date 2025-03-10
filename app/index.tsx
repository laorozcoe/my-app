import { StyleSheet, View,Keyboard } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { Button, TextInput, Text } from 'react-native-paper';
import Scanner from '@/components/Scanner';
import { useState } from 'react';
import { router } from 'expo-router';

export default function HomeScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleDrawer = () => {
    Keyboard.dismiss();
    setIsModalVisible(!isModalVisible);
  }

  const [serial, setSerial] = useState('');

  const searchCode = () =>{
    if (!serial.trim()) {
      alert('Please enter the serial number');
      return;
    }
    router.push(`/sfisdata?serial=${serial}`);
  }

  return (
      <ThemedView style={styles.container}>
        <View style={styles.view}>
          <Text variant="displayMedium">SFIS Mobile</Text>
          <TextInput label='Serial'  value={serial} onChangeText={setSerial}></TextInput>
          <Button icon="file-search" mode="contained" onPress={searchCode}>
            Search
          </Button>
        </View>
        <View>
          <Button mode='contained' icon='camera' onPress={toggleDrawer}>
            Scanner
          </Button>
          <Scanner visible={isModalVisible} setVisible={setIsModalVisible}></Scanner>
        </View>
      </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:"space-between",
    paddingVertical:14,
    paddingHorizontal:10
  },
  view:{
    gap:30,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
