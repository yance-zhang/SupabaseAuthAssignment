import { Stack, useRouter, useSegments } from "expo-router";
import { PropsWithChildren, useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { AuthProvider, useAuth } from "../../context/AuthContext";

function AuthGuard({ children }: PropsWithChildren) {
  const { session, isLoading } = useAuth();

  const segments = useSegments();

  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inTabGroup = segments[0] === "(tab)";

    const inPublicAuthScreen =
      segments[0] === "login" || segments[0] === "signup";

    if (!session && inTabGroup) router.replace("/login");
    else if (session && inPublicAuthScreen) router.replace("/(tab)/home");
  }, [session, isLoading, segments, router]);

  if (isLoading)
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthGuard>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="signup" />
          <Stack.Screen name="(tab)" />
        </Stack>
      </AuthGuard>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8fafc",
  },
});
