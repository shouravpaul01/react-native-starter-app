import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Storage } from "redux-persist";

/**
 * Senior Developer Best Practice:
 * Resilient Storage Engine for redux-persist.
 *
 * Wraps @react-native-async-storage/async-storage with try-catch blocks and fallback handling.
 * Prevents unhandled crashes (e.g. "Native module is null", storage quota exceeded,
 * or running in environments where native storage is temporarily unavailable).
 */
export const reduxStorage: Storage = {
  setItem: async (key: string, value: string): Promise<boolean> => {
    try {
      await AsyncStorage.setItem(key, value);
      return true;
    } catch (error) {
      if (__DEV__) {
        console.warn(`[Redux Storage] Failed to set item for key "${key}":`, error);
      }
      return false;
    }
  },
  getItem: async (key: string): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      if (__DEV__) {
        console.warn(`[Redux Storage] Failed to get item for key "${key}":`, error);
      }
      return null;
    }
  },
  removeItem: async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      if (__DEV__) {
        console.warn(`[Redux Storage] Failed to remove item for key "${key}":`, error);
      }
    }
  },
};

export default reduxStorage;

