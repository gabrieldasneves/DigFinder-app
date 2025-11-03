import { Stack } from "expo-router";
import { colors } from "../styles/colors";
import {
  useFonts,
  Livvic_400Regular,
  Livvic_500Medium,
  Livvic_600SemiBold,
  Livvic_700Bold,
} from "@expo-google-fonts/livvic";
import { Loading } from "@/components/atoms/loading";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "@/contexts/Authcontext";
import { PrivateRoute } from "@/components/feature/auth/privateRoute";
export default function Layout() {
  const [fontsLoaded] = useFonts({
    Livvic_400Regular,
    Livvic_500Medium,
    Livvic_600SemiBold,
    Livvic_700Bold,
  });

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}
