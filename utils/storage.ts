import AsyncStorage from "@react-native-async-storage/async-storage";

//Get items from Async Storage
export async function getFromStorage(key: string) {
  try {
    const data = await AsyncStorage.getItem(key);
    //JSON.parse() takes a string and returns an object
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

//Save items to Async Storage
export async function saveToStorage(key: string, data: object) {
  try {
    //JSON.stringify() takes an object and returns a string
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch {}
}
