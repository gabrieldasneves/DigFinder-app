import { useEffect } from "react";
import { useRouter, useSegments } from "expo-router";
import { useAuth } from "@/contexts/Authcontext";
import { Loading } from "@/components/atoms/loading";

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "auth";
    const currentPath = segments.join("/");

    if (!isAuthenticated && !inAuthGroup && currentPath !== "") {
      router.replace("/");
    } else if (isAuthenticated && inAuthGroup) {
      router.replace("/home" as any);
    }
  }, [isAuthenticated, loading, segments]);

  if (loading) {
    return <Loading />;
  }

  return <>{children}</>;
}
