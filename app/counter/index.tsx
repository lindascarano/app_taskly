import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "../../theme";
import { useRouter } from "expo-router";

export default function CounterScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.navigate("/idea")}>
        <Text style={styles.linkStyle}>Vai a Idea!</Text>
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
  text: {
    fontSize: 24,
  },
  linkStyle: {
    textAlign: "center",
    fontSize: 24,
    textDecorationLine: "underline",
  },
});
