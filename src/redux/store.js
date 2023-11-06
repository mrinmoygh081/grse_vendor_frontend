import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import loginReducer from "./slices/loginSlice";
import poReducer from "./slices/poSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";

const reducers = combineReducers({
  counter: counterReducer,
  auth: loginReducer,
  selectedPO: poReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// });
export const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);
