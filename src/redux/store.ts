import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { baseApi } from "./api/baseApi";
import { rootReducer } from "./features/rootReducer";
import { reduxStorage } from "./storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage: reduxStorage,
  whitelist: ["auth"], // only auth state will be persisted in storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

export type { RootState } from "./features/rootReducer";
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
