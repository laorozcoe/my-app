import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';
import {lightThemeRNP, DarkThemeRNP} from '../constants/ColorsRNP';
import { useColorScheme } from '@/hooks/useColorScheme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider theme={colorScheme === 'dark' ? DarkThemeRNP : lightThemeRNP}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false, // Mostrar el header
        }}
        />

      {/* Stack 2: Ocultar el título */}
      <Stack.Screen
        name="sfisdata/index"
        options={{
          title: 'SFIS Data', // Título que aparecerá en la barra superior
          headerShown: true, // Ocultar el header
        }}
      />
      <Stack.Screen
        name="sfisdata/historical"
        options={{
          title: 'SFIS Data', // Título que aparecerá en la barra superior
          headerShown: true, // Ocultar el header
        }}
      />
      </Stack>
      </ThemeProvider>
    </PaperProvider>
  );
}
