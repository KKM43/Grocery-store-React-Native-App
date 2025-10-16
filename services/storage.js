import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY_ITEMS = 'GROCERY_ITEMS';
const KEY_TOKEN = 'AUTH_TOKEN';

export async function saveItems(items) {
  await AsyncStorage.setItem(KEY_ITEMS, JSON.stringify(items));
}
export async function loadItems() {
  const raw = await AsyncStorage.getItem(KEY_ITEMS);
  return raw ? JSON.parse(raw) : [];
}

export async function saveToken(token) {
  await AsyncStorage.setItem(KEY_TOKEN, token);
}
export async function loadToken() {
  return await AsyncStorage.getItem(KEY_TOKEN);
}
export async function removeToken() {
  await AsyncStorage.removeItem(KEY_TOKEN);
}
