import { Tabs } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { theme } from "../theme";

export default function Layout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: theme.colorAzzurroTeal }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Lista della spesa",
          tabBarIcon: ({ color, size }) => {
            return <Feather name="list" size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="counter"
        options={{
          title: "contatore",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="clockcircleo" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="idea"
        options={{
          title: "idea",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="light-bulb" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
