import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  Pressable,
  View,
} from "react-native";
import { theme } from "../theme";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";

type Props = {
  name: string;
  isCompleted?: boolean;
  onDelete: () => void;
  onTaggleComplete: () => void;
};

export function ShoppingListItem({
  name,
  isCompleted,
  onDelete,
  onTaggleComplete,
}: Props) {
  const handleDelete = () => {
    Alert.alert(
      `Sei sicuro di voler cancellare ${name} ?`,
      "L'elemento sarà cancellato definitivamente",
      [
        {
          text: "Si",
          onPress: () => onDelete(),
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
    <Pressable
      style={[
        styles.itemContainer,
        isCompleted ? styles.completedContainer : undefined,
      ]}
      onPress={onTaggleComplete}
    >
      <View style={styles.row}>
        <Entypo
          name={isCompleted ? "check" : "circle"}
          size={24}
          color={isCompleted ? theme.colorGrigioScuro : theme.colorAzzurroTeal}
        />
        <Text
          numberOfLines={1}
          style={[
            styles.itemText,
            isCompleted ? styles.completedText : undefined,
          ]}
        >
          {name}
        </Text>
      </View>

      <TouchableOpacity onPress={handleDelete} activeOpacity={0.6}>
        <AntDesign
          name="closecircle"
          size={24}
          color={isCompleted ? theme.colorGrigioScuro : theme.colorRed}
        />
      </TouchableOpacity>
      {/* <StatusBar style="auto" /> */}
    </Pressable>
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
  itemText: { flex: 1, fontSize: 18, fontWeight: "200" },
  completedText: {
    textDecorationLine: "line-through",
    textDecorationColor: theme.colorGrigioChiaro,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
});
