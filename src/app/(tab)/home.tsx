import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useAuth } from "../../../context/AuthContext";

export default function HomeScreen() {
  const { user, signOut } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsSigningOut(true);
      await signOut();
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Campus Hub</Text>
      <Text style={styles.caption}>Signed in as</Text>
      {user?.email && <Text style={styles.email}>{user.email}</Text>}
      <Text style={styles.id}>User ID: {user?.id}</Text>
      <Pressable
        style={[styles.button, isSigningOut && styles.buttonDisabled]}
        disabled={isSigningOut}
        onPress={handleLogout}
      >
        {isSigningOut ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Logout</Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#f8fafc",
  },
  title: { fontSize: 30, fontWeight: "700", color: "#0f172a" },
  caption: { marginTop: 16, color: "#64748b" },
  email: { marginTop: 4, fontSize: 18, fontWeight: "700", color: "#2563eb" },
  id: { marginTop: 10, color: "#94a3b8", textAlign: "center" },
  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    minWidth: 160,
  },
  buttonDisabled: { opacity: 0.65 },
  buttonText: { color: "white", fontWeight: "700" },
});
