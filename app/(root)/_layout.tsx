import {
  SourceCodePro_400Regular,
  useFonts,
} from "@expo-google-fonts/source-code-pro";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { RootContainer, SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useColorScheme } from "react-native";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
    SourceCodePro_400Regular,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </>
  );
}

import ErrorToastContainer from "@bacons/expo-metro-runtime/error-overlay";

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <>
      <RootContainer
        theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      />
      <ErrorToastContainer>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        </Stack>
      </ErrorToastContainer>
      <StatusBar />
    </>
  );
}
