import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { theme } from "../../theme";
import { useRouter } from "expo-router";
import { registerForPushNotificationsAsync } from "../../utils/registerForPushNotificationsAsync";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import { Duration, intervalToDuration, isBefore } from "date-fns";
import { TimeSegment } from "../../componets/TimeSegment";

//10 seconds from now
const timestamp = Date.now() + 10 * 1000;

type CountdownStatus = {
  isOverdue: boolean;
  distance: Duration;
};

export default function CounterScreen() {
  const [status, setStaus] = useState<CountdownStatus>({
    isOverdue: false,
    distance: {},
  });

  // console.log(status);

  const router = useRouter();
  const handleRequestPermission = async () => {
    const result = await registerForPushNotificationsAsync();
    console.log("Permesso:", result);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const isOverdue = isBefore(timestamp, Date.now());

      const distance = intervalToDuration(
        isOverdue
          ? { start: timestamp, end: Date.now() }
          : { start: Date.now(), end: timestamp },
      );
      setStaus({ isOverdue, distance });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const scheduleNotification = async () => {
    const result = await registerForPushNotificationsAsync();
    if (result === "granted") {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Sono la notifica dalla tua App! 💌",
        },

        // You can schedule the notifications based on differnet intervals:
        //look at the Expo Docs:https://docs.expo.dev/versions/latest/sdk/notifications/#schedulablenotificationtriggerinput
        trigger: {
          seconds: 5,
        },
      });
    } else {
      Alert.alert(
        "Abilita per schedulare le notifiche sul tuo dispositivo!",
        "Attiva il permesso per le notifiche per Expo Go nelle Impostazioni del tuo dispositivo!",
      );
    }
  };

  return (
    <View
      style={[
        styles.container,
        status.isOverdue ? styles.containerLate : undefined,
      ]}
    >
      {!status.isOverdue ? (
        <Text style={[styles.heading, styles.whiteText]}>Attività da fare</Text>
      ) : (
        <Text style={[styles.heading, styles.whiteText]}>
          Attività in ritardo!
        </Text>
      )}
      <View style={styles.row}>
        <TimeSegment
          unit="Giorni"
          number={status.distance?.days ?? 0}
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
        <TimeSegment
          unit="Ore"
          number={status.distance?.hours ?? 0}
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />

        <TimeSegment
          unit="Minuti"
          number={status.distance?.minutes ?? 0}
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
        <TimeSegment
          unit="Secondi"
          number={status.distance?.seconds ?? 0}
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={scheduleNotification}
      >
        <Text style={styles.bottonText}>Ho fatto l'attività!</Text>
        {/* <Text style={styles.bottonText}>
          Schedula una Notifica - dopo 5 sec
        </Text> */}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.navigate("/idea")}>
        <Text style={styles.linkStyle}>Vai a Idea!</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={handleRequestPermission}
      >
        <Text style={styles.bottonText}>
          Richiesta permesso per notifiche push
        </Text>
      </TouchableOpacity>
      <Text style={styles.text}>Contatore</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colorWhite,
  },
  containerLate: {
    backgroundColor: theme.colorRed,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    color: theme.colorGrigioScuro,
  },
  whiteText: {
    color: theme.colorWhite,
  },
  row: {
    flexDirection: "row",
    marginBottom: 24,
  },
  button: {
    backgroundColor: theme.colorAzzurroTeal,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    // marginBottom: 8,
    // marginTop:8,
    margin: 8,
  },
  bottonText: {
    color: theme.colorWhite,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  text: {
    fontSize: 24,
  },
  linkStyle: {
    textAlign: "center",
    fontSize: 24,
    textDecorationLine: "underline",
  },
});
