import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Lista della spesa" }}
      ></Stack.Screen>
      <Stack.Screen
        name="counter"
        options={{
          title: "contatore",
          presentation: "modal",
          animation: "fade_from_bottom",
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="idea"
        options={{
          title: "idea",
          presentation: "modal",
          animation: "fade_from_bottom",
        }}
      ></Stack.Screen>
    </Stack>
  );
}
