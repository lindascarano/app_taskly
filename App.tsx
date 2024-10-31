import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { theme } from "./theme";

export default function App() {
  const handleDelete = () => {
    Alert.alert(
      "Sei sicuro di voler cancellare l'elemento selezionato?",
      "L'elemento sarà cancellato definitivamente",
      [
        {
          text: "Si",
          onPress: () => console.log("Ok, lo puoi cancellare!"),
          style: "destructive", //It gives differnet styles between Android and iOS
       
        },
        {
          text: "annulla",
          onPress: () => console.log("No, annulla l'operazione!"),
          style: "cancel", //It gives differnet styles between Android and iOS
         
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>Pasta</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={handleDelete}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Cancella</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    justifyContent: "center",
  },
  itemContainer: {
    borderBottomColor: theme.colorAzzurroTeal,
    borderBottomWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemText: {
    fontSize: 18,
    fontWeight: "200",
  },
  button: {
    backgroundColor: theme.colorAzzurroTeal,
    padding: 8,
    borderRadius: 6,
  },
  buttonText: {
    color: theme.colorWhite,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
