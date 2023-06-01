import AsyncStorage from "@react-native-community/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import thunk from "redux-thunk";
import AuthReducer from './slice/AuthSlicer';
import LoaderSlice from "./slice/LoaderSlice";
import UserSlice from "./slice/UserSlices";
import HomeSlice from "./slice/HomeSlices";
import UserLocal from "./slice/UserLocal";

const reducers = combineReducers({
  Auth: AuthReducer,
  Loader: LoaderSlice,
  User: UserSlice,
  Home: HomeSlice,
  UserLocal: UserLocal,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["Auth","UserLocal"],
};

const _persistReducer = persistReducer(persistConfig, reducers);

export const Store = configureStore({
  reducer: _persistReducer,
  middleware: [thunk],
});