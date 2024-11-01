import { StyleSheet, TouchableOpacity, View, Text, Alert } from "react-native";
import { theme } from "../theme";
import AntDesign from "@expo/vector-icons/AntDesign";

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
      ],
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
      <TouchableOpacity onPress={handleDelete} activeOpacity={0.6}>
        <AntDesign
          name="closecircle"
          size={24}
          color={isCompleted ? theme.colorGrigioScuro : theme.colorRed}
        />
      </TouchableOpacity>
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    borderBottomColor: theme.colorAzzurroTeal,
    borderBottomWidth: 1,
    paddingHorizontal: 18,
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
});
