// import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { theme } from "../theme";
import { ShoppingListItem } from "../componets/ShoopingListItem";
import { Link } from "expo-router";

export default function App() {
  return (
    <View style={styles.container}>
      <Link href="/counter" style={styles.linkStyle}>
        Vai al Contatore!
      </Link>
      <ShoppingListItem name="Pasta" />
      <ShoppingListItem name="Olio d'oliva" isCompleted />
      <ShoppingListItem name="Sale" isCompleted />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    justifyContent: "center",
  },
  linkStyle: {
    textAlign: "center",
    fontSize: 24,
    textDecorationLine: "underline",
  },
});
