import { Stack } from "expo-router";
import { useEffect } from "react";
import { ImageBackground, View } from "react-native";
import * as SystemUI from "expo-system-ui";
import { colors } from "../styles/colors";
import {
  useFonts,
  Livvic_400Regular,
  Livvic_500Medium,
  Livvic_600SemiBold,
  Livvic_700Bold,
} from "@expo-google-fonts/livvic";
import * as ExpoSplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "@/contexts/Authcontext";
import { PrivateRoute } from "@/components/feature/auth/privateRoute";
import { useStatusBar } from "@/hooks/useStatusBar";

ExpoSplashScreen.preventAutoHideAsync();

const splashBrown = colors.brown.strong;

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Livvic_400Regular,
    Livvic_500Medium,
    Livvic_600SemiBold,
    Livvic_700Bold,
  });

  useStatusBar(fontsLoaded ? "dark" : "light");

  useEffect(() => {
    void SystemUI.setBackgroundColorAsync(splashBrown);
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      ExpoSplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <ImageBackground
        source={require("../../assets/images/splash-background.png")}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <View style={{ flex: 1 }} />
      </ImageBackground>
    );
  }

  return (
    <AuthProvider>
      <SafeAreaProvider>
        <PrivateRoute>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: colors.gray[100] },
              }}
            />
          </GestureHandlerRootView>
        </PrivateRoute>
      </SafeAreaProvider>
    </AuthProvider>
  );
}
