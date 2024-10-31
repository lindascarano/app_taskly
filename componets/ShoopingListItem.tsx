import { StyleSheet, TouchableOpacity, View, Text, Alert } from "react-native";
import { theme } from "../theme";

type Props = {
  name: string;
  isCompleted?: boolean;
};

export function ShoppingListItem({ name, isCompleted }: Props) {
  const handleDelete = () => {
    Alert.alert(
      `Sei sicuro di voler cancellare ${name} ?`,
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
        },
      ]
    );
  };
  return (
    <View
      style={[
        styles.itemContainer,
        isCompleted ? styles.completedContainer : undefined,
      ]}
    >
      <Text
        style={[
          styles.itemText,
          isCompleted ? styles.completedText : undefined,
        ]}
      >
        {name}
      </Text>
      <TouchableOpacity
        style={[
          styles.button,
          isCompleted ? styles.completedButton : undefined,
        ]}
        onPress={handleDelete}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>Cancella</Text>
      </TouchableOpacity>
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    borderBottomColor: theme.colorAzzurroTeal,
    borderBottomWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  completedContainer: {
    backgroundColor: theme.colorGrigioChiaro,
    borderBottomColor: theme.colorAzzurroTeal,
  },
  itemText: {
    fontSize: 18,
    fontWeight: "200",
  },
  completedText: {
    textDecorationLine: "line-through",
    textDecorationColor: theme.colorGrigioChiaro,
  },
  button: {
    backgroundColor: theme.colorAzzurroTeal,
    padding: 8,
    borderRadius: 6,
  },
  completedButton: {
    backgroundColor: theme.colorGrigioScuro,
  },
  buttonText: {
    color: theme.colorWhite,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
