import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import { theme } from "../../theme";
import { useRouter } from "expo-router";
import { registerForPushNotificationsAsync } from "../../utils/registerForPushNotificationsAsync";
import * as Notifications from "expo-notifications";
import Device from "expo-device";
import { useEffect, useRef, useState } from "react";
import { Duration, intervalToDuration, isBefore } from "date-fns";
import { TimeSegment } from "../../componets/TimeSegment";
import { getFromStorage, saveToStorage } from "../../utils/storage";
import * as Haptics from "expo-haptics";
import ConfettiCannon from "react-native-confetti-cannon";

// //10 seconds from now
// const timestamp = Date.now() + 10 * 1000;
//10 seconds in ms
// const frequency = 10 * 1000;

// 2 weeks in ms
const frequency = 14 * 24 * 60 * 60 * 1000;

export const countdownStorageKey = "taskly-countdown";

export type PersistedCountdownState = {
  currentNotificationId: string | undefined;
  completedAtTimestamps: number[];
};

type CountdownStatus = {
  isOverdue: boolean;
  distance: Duration;
};

export default function CounterScreen() {
  const { width } = useWindowDimensions();
  const confettiRef = useRef<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [countdownState, setCountdownState] =
    useState<PersistedCountdownState>();
  const [status, setStaus] = useState<CountdownStatus>({
    isOverdue: false,
    distance: {},
  });

  //We want to initialize by fetching countdownState from Storage.
  useEffect(() => {
    const init = async () => {
      const value = await getFromStorage(countdownStorageKey);
      setCountdownState(value);
    };
    init();
  }, []);

  const lastCompletedAt = countdownState?.completedAtTimestamps[0];

  // console.log(status);

  const router = useRouter();
  const handleRequestPermission = async () => {
    const result = await registerForPushNotificationsAsync();
    console.log("Permesso:", result);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const timestamp = lastCompletedAt
        ? lastCompletedAt + frequency
        : Date.now();
      if (lastCompletedAt) {
        setIsLoading(false);
      }
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
    //useEffect runs every time, the lastCompletedAt value is updated.
    //When lastCompletedAt is updated, we clear the interval and then useEffect runs again.
  }, [lastCompletedAt]);

  const scheduleNotification = async () => {
    confettiRef?.current?.start();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    let pushNotificationId;
    const result = await registerForPushNotificationsAsync();
    if (result === "granted") {
      pushNotificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "E' ora di lavare la macchina!",
        },

        // You can schedule the notifications based on differnet intervals:
        //look at the Expo Docs:https://docs.expo.dev/versions/latest/sdk/notifications/#schedulablenotificationtriggerinput
        trigger: {
          seconds: frequency / 1000,
        },
      });
    } else {
      if (Device.isDevice) {
        Alert.alert(
          "Abilita per schedulare le notifiche sul tuo dispositivo!",
          "Attiva il permesso per le notifiche per Expo Go nelle Impostazioni del tuo dispositivo!",
        );
      }
    }

    if (countdownState?.currentNotificationId) {
      await Notifications.cancelScheduledNotificationAsync(
        countdownState.currentNotificationId,
      );
    }

    const newCountdownState: PersistedCountdownState = {
      currentNotificationId: pushNotificationId,
      completedAtTimestamps: countdownState
        ? [Date.now(), ...countdownState.completedAtTimestamps]
        : [Date.now()],
    };
    setCountdownState(newCountdownState);

    await saveToStorage(countdownStorageKey, newCountdownState);
  };

  if (isLoading) {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator></ActivityIndicator>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        status.isOverdue ? styles.containerLate : undefined,
      ]}
    >
      {status.isOverdue ? (
        <Text style={[styles.heading, styles.whiteText]}>
          Lavaggio della macchina in ritardo di...
        </Text>
      ) : (
        <Text style={[styles.heading, styles.blacktext]}>
          Prossimo lavaggio della macchina tra...
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
        <Text style={styles.bottonText}>Ho lavato la macchina!!</Text>
        {/* <Text style={styles.bottonText}>Ho fatto l'attività!</Text> */}
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
      {/* if you are building an App that needs to be responsive 
      both horizontally and vertically, using the useWindowDimensions Hook
      ensures that the width dimension considered is that of the device
      rotated in that specific direction */}
      <ConfettiCannon
        ref={confettiRef}
        count={50}
        origin={{ x: width / 2, y: -30 }}
        autoStart={false}
        fadeOut={true}
      />
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
    marginHorizontal: 8,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    color: theme.colorGrigioScuro,
  },
  whiteText: {
    color: theme.colorWhite,
  },
  blacktext: {
    color: theme.colorBlack,
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
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colorWhite,
  },
});
