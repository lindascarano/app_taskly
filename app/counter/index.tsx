import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "../../theme";
import { useRouter } from "expo-router";
import { registerForPushNotificationsAsync } from "../../utils/registerForPushNotificationsAsync";

export default function CounterScreen() {
  const router = useRouter();
  const handleRequestPermission = async () => {
    const result = await registerForPushNotificationsAsync();
    console.log("Permesso:", result);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.navigate("/idea")}>
        <Text style={styles.linkStyle}>Vai a Idea!</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={handleRequestPermission}
      >
        <Text style={styles.bottonText}>
          Richiesta permesso per notifiche push
        </Text>
      </TouchableOpacity>
      <Text style={styles.text}>Contatore</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colorWhite,
  },
  button: {
    backgroundColor: theme.colorAzzurroTeal,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    // marginBottom: 8,
    // marginTop:8,
    margin: 8,
  },
  bottonText: {
    color: theme.colorWhite,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  text: {
    fontSize: 24,
  },
  linkStyle: {
    textAlign: "center",
    fontSize: 24,
    textDecorationLine: "underline",
  },
});
