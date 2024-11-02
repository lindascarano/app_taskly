// import { StatusBar } from "expo-status-bar";
import { StyleSheet, TextInput, FlatList, View, Text } from "react-native";
import { theme } from "../theme";
import { ShoppingListItem } from "../componets/ShoopingListItem";

import { useState } from "react";

type ShoppingListItemType = {
  id: string;
  name: string;
  comletedAtTimestamp?: number;
};

//Array for testing FlatList rendering
// const testData = Array(1000)
//   .fill(null)
//   .map((item, index) => ({ id: String(index), name: String(index) }));

export default function App() {
  const [shoppingList, setShoppingList] = useState<ShoppingListItemType[]>([]);
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

  const handleDelete = (id: string) => {
    const newShoppingList = shoppingList.filter((item) => item.id !== id);
    setShoppingList(newShoppingList);
  };

  const handleToggleComplete = (id: string) => {
    const newShoppingList = shoppingList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          comletedAtTimestamp: item.comletedAtTimestamp
            ? undefined
            : Date.now(),
        };
      } else {
        return item;
      }
    });
    setShoppingList(newShoppingList);
  };

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      stickyHeaderIndices={[0]}
      ListEmptyComponent={
        <View style={styles.listEmptyContainer}>
          <Text style={styles.listEmptyText}>
            La tua lista della spesa è vuota!
          </Text>
        </View>
      }
      ListHeaderComponent={
        <TextInput
          style={styles.textImput}
          placeholder="Es. Pasta"
          value={value}
          onChangeText={setValue}
          // keyboardType="email-address"
          // returnKeyType="done"
          onSubmitEditing={handleSubmit}
        />
      }
      data={shoppingList}
      // data={testData}
      renderItem={({ item }) => {
        // console.log(item);
        return (
          <ShoppingListItem
            name={item.name}
            onDelete={() => handleDelete(item.id)}
            onTaggleComplete={() => handleToggleComplete(item.id)}
            isCompleted={Boolean(item.comletedAtTimestamp)}
          />
        );
      }}
    />
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
  listEmptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 12,
  },
  listEmptyText: {
    fontSize: 18,
  },
});
