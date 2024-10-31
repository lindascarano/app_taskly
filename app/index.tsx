// import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { theme } from "../theme";
import { ShoppingListItem } from "../componets/ShoopingListItem";

export default function App() {
  return (
    <View style={styles.container}>
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
});
