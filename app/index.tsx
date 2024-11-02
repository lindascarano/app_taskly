// import { StatusBar } from "expo-status-bar";
import { StyleSheet, TextInput, View, ScrollView } from "react-native";
import { theme } from "../theme";
import { ShoppingListItem } from "../componets/ShoopingListItem";
import { Link } from "expo-router";
import { useState } from "react";

type ShoppingListItemType = {
  id: string;
  name: string;
};

const initialList: ShoppingListItemType[] = [
  { id: "1", name: "Pasta" },
  { id: "2", name: "Olio d'oliva" },
  { id: "3", name: "Sale" },
];

export default function App() {
  const [shoppingList, setShoppingList] =
    useState<ShoppingListItemType[]>(initialList);
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (value) {
      const newShoppingList = [
        { id: new Date().toTimeString(), name: value },
        ...shoppingList,
      ];

      setShoppingList(newShoppingList);
      setValue(value);
      setValue("");
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      stickyHeaderIndices={[0]}
    >
      {/* The keyboardType Prop allows TextInput to choose between various keyboards */}
      <TextInput
        style={styles.textImput}
        placeholder="Es. Pasta"
        value={value}
        onChangeText={setValue}
        // keyboardType="email-address"
        // returnKeyType="done"
        onSubmitEditing={handleSubmit}
      />
      <Link href="/counter" style={styles.linkStyle}>
        Vai al Contatore!
      </Link>
      {shoppingList.map((item) => (
        <ShoppingListItem name={item.name} key={item.id}></ShoppingListItem>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    paddingTop: 12,
    // justifyContent: "center",
  },
  contentContainer: { paddingBottom: 24 },
  linkStyle: {
    textAlign: "center",
    fontSize: 24,
    textDecorationLine: "underline",
  },
  textImput: {
    borderColor: theme.colorGrigioChiaro,
    borderWidth: 2,
    padding: 12,
    marginHorizontal: 12,
    marginBottom: 12,
    fontSize: 18,
    borderRadius: 50,
    backgroundColor: theme.colorWhite,
  },
});
