import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { usersApi } from "../features/usersApi";
import storage from "redux-persist/lib/storage";

import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

const rootPersist = combineReducers({
  [usersApi.reducerPath]: usersApi.reducer,
});

const persistConfig = {
  key: "users",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootPersist);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Redux persist
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(usersApi.middleware),
});

export const persistor = persistStore(store);
