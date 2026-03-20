import { useEffect } from "react";
import { View } from "react-native";
import { useRouter, useSegments } from "expo-router";
import { useAuth } from "@/contexts/Authcontext";
import { colors } from "@/styles/colors";

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const path = segments.join("/");
    const isLanding = path === "" || path === "index";

    if (!isAuthenticated && !isLanding) {
      router.replace("/");
    } else if (isAuthenticated && isLanding) {
      router.replace("/home" as any);
    }
  }, [isAuthenticated, loading, segments]);

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.brown.strong }} />
    );
  }

  return <>{children}</>;
}
