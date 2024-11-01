import { Link, Stack } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { theme } from "../../theme";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "contatore",
          headerRight: () => {
            return (
              <Link href="/counter/history">
                <MaterialIcons
                  name="history"
                  size={32}
                  color={theme.colorGrigioScuro}
                />
              </Link>
            );
          },
        }}
      />
    </Stack>
  );
}
