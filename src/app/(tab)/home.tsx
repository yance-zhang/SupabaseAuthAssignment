import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../../context/AuthContext";
export default function HomeScreen() {
  const { user } = useAuth();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Campus Hub</Text>
      <Text style={styles.caption}>Signed in as</Text>
      {user?.email && <Text style={styles.email}>{user.email}</Text>}
      <Text style={styles.id}>User ID: {user?.id}</Text>
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
});
