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
import { lightThemeRNP, DarkThemeRNP } from "../constants/ColorsRNP";
import { useColorScheme } from "@/hooks/useColorScheme";
import { DataProvider } from "./lib/HistoriContext";
import { AppState, View, ActivityIndicator } from "react-native";
import { fetchWithTimeout } from "./lib/validateAccess";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const appState = useRef(AppState.currentState);
  const [validateAccess, setValidateAccess] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const verifyAccess = async () => {
    setIsLoading(true);
    try {
      const validate = await fetchWithTimeout();
      console.log("Access validation result:", validate);
      setValidateAccess(validate);
    } catch (error) {
      console.log("Error verifying access:", error);
      setValidateAccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleAppStateChange = async (nextAppState: any) => {
      if (appState.current.match(/inactive|background/) && nextAppState === "active") {
        console.log("App is back in foreground, verifying access...");
        verifyAccess();
      }
      appState.current = nextAppState;
    };

    // Listener para cambios en el estado de la app
    const subscription = AppState.addEventListener("change", handleAppStateChange);

    // Primera validación al iniciar la app
    if (appState.current === "active") {
      verifyAccess();
      console.log("App started, verifying access...");
    }

    intervalRef.current = setInterval(verifyAccess, 120000);

    return () => {
      subscription.remove();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
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
    return null;
  }

  if (isLoading) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <ThemedText>Verifying access...</ThemedText>
      </ThemedView>
    );
  }

  if (validateAccess === false) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ThemedText>No connection to the services of this app.</ThemedText>
        <ThemedText>Check with IT support.</ThemedText>
      </ThemedView>
    );
  }

  return (
    <DataProvider>
      <PaperProvider theme={colorScheme === "dark" ? DarkThemeRNP : lightThemeRNP}>
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="sfisdata/index" options={{ title: "SFIS Data", headerShown: true }} />
            <Stack.Screen name="sfisdata/historical" options={{ title: "Historical", headerShown: true }} />
          </Stack>
        </ThemeProvider>
      </PaperProvider>
    </DataProvider>
  );
}
