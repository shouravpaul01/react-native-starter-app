import React, { type ReactNode } from "react";
import { ActivityIndicator, View } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store";

export interface ReduxProviderProps {
  children: ReactNode;
  /** Optional custom fallback component displayed while state rehydrates from storage */
  loadingFallback?: ReactNode;
}

export function ReduxProvider({
  children,
  loadingFallback = (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  ),
}: ReduxProviderProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={loadingFallback} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}

export default ReduxProvider;
