// store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage by default
import authReducer from "../features/authSlice";
import taskReducer from "../features/taskSlice";

// Root Reducer
const rootReducer = combineReducers({
  auth: authReducer,
  tasks: taskReducer,
});

// Persist Config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "tasks"], // only persist these slices
};

// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // redux-persist needs this
    }),
});

// Persistor
export const persistor = persistStore(store);
