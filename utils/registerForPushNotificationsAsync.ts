import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    // for the latest verions of Android you need to set-up a channel
    //before you ask for permission otherwise it doesn't work.
    //you can group notifications from the same app to a channel.
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 250, 250, 250],
      showBadge: false,
    });
  }

  if (Device.isDevice) {
    //status can be GRANTED, UNDETERMINED or DENIED (see status props for the meaning)
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    if (existingStatus !== "granted") {
      //this line request a permission for the user whit a pop-up
      const { status } = await Notifications.requestPermissionsAsync();
      return status;
    } else {
      return existingStatus;
    }
  } else {
    return null;
  }
}
