import { Text } from 'react-native';
import React from "react";
import { View, Alert } from "react-native";
import * as Linking from "expo-linking";
import { Button } from 'react-native-paper';

const TestApi = () => {

    const handleOpenBrowser = async () => {
        const url = "http://10.58.10.61:9099/swagger/index.html";
        try {
          const supported = await Linking.canOpenURL(url);
          if (supported) {
            await Linking.openURL(url);
          } else {
            Alert.alert("Error", "No se puede abrir la URL en este dispositivo.");
          }
        } catch (error) {
          Alert.alert("Error", "Ocurrió un problema al intentar abrir la URL.");
          console.error(error);
        }
      };
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Button mode='outlined' onPress={handleOpenBrowser}>Probar comunicación</Button>
        </View>
    );
};

export default TestApi;