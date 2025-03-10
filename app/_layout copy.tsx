import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { PaperProvider } from "react-native-paper";
import "react-native-reanimated";
import { lightThemeRNP, DarkThemeRNP } from "../constants/ColorsRNP";
import { useColorScheme } from "@/hooks/useColorScheme";
import { DataProvider } from "./lib/HistoriContext";
import { AppState, Alert, Text, View, ActivityIndicator } from 'react-native';
import { fetchWithTimeout } from "./lib/validateAccess";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const appState = useRef(AppState.currentState);
  const [validateAccess, setValidateAccess] = useState<any>(null); // null: cargando, true: acceso permitido, false: acceso denegado
  const [isLoading, setIsLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const subscription = AppState.addEventListener('change', async (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        console.log('La aplicación está en primer plano');
        setIsLoading(true); // Activar el estado de carga

        try {
          const validate = await fetchWithTimeout();
          setValidateAccess(validate); // Actualizar el estado de acceso
        } catch (error) {
          console.log(error);
          setValidateAccess(false); // En caso de error, denegar el acceso
        } finally {
          setIsLoading(false); // Desactivar el estado de carga
        }
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null; // Esperar a que las fuentes se carguen
  }

  // Renderizar condicionalmente según el estado de acceso y carga
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  if (validateAccess === false) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No tienes acceso para utilizar esta aplicación.</Text>
      </View>
    );
  }

  return (
    <DataProvider>
      <PaperProvider
        theme={colorScheme === "dark" ? DarkThemeRNP : lightThemeRNP}
      >
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen
              name="index"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="sfisdata/index"
              options={{
                title: "SFIS Data",
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="sfisdata/historical"
              options={{
                title: "Historical",
                headerShown: true,
              }}
            />
          </Stack>
        </ThemeProvider>
      </PaperProvider>
    </DataProvider>
  );
}