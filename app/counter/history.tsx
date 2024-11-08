import { Text, View, StyleSheet, FlatList } from "react-native";
import { theme } from "../../theme";
import { countdownStorageKey, PersistedCountdownState } from ".";
import { useEffect, useState } from "react";
import { getFromStorage } from "../../utils/storage";
import { format } from "date-fns";

const fullDateFormat = `LLL d yyyy, h:mm aaa`;

export default function HistoryScreen() {
  const [countdownState, setCountdownState] =
    useState<PersistedCountdownState>();

  useEffect(() => {
    const init = async () => {
      const value = await getFromStorage(countdownStorageKey);
      setCountdownState(value);
    };
    init();
  }, []);

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.contentConatiner}
      data={countdownState?.completedAtTimestamps}
      renderItem={({ item }) => (
        <View style={styles.listItem}>
          <Text style={styles.listItemText}>
            {format(item, fullDateFormat)}
          </Text>
        </View>
      )}
      ListEmptyComponent={
        <View style={styles.listEmptyContainer}>
          <Text>La tua lista di attività già fatte è vuota!</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: theme.colorWhite,
  // },
  // text: {
  //   fontSize: 24,
  // },
  list: {
    flex: 1,
    backgroundColor: theme.colorWhite,
  },

  contentConatiner: {
    marginTop: 8,
  },
  listItem: {
    marginHorizontal: 8,
    marginBottom: 8,
    alignItems: "center",
    backgroundColor: theme.colorAzzurroTeal,
    padding: 12,
    borderRadius: 6,
  },
  listItemText: {
    fontSize: 18,
    color: theme.colorWhite,
  },
  listEmptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 18,
  },
});
