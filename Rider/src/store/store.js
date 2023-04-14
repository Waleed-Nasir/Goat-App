import AsyncStorage from "@react-native-community/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import thunk from "redux-thunk";
import AuthReducer from './slice/AuthSlicer';
import LoaderSlice from "./slice/LoaderSlice";
import { UserSlice } from "./slice/UserSlices";
import { HomeSlice } from "./slice/HomeSlices";

const reducers = combineReducers({
  Auth: AuthReducer,
  Loader: LoaderSlice,
  User: UserSlice,
  Home: HomeSlice
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["Auth"],
};

const _persistReducer = persistReducer(persistConfig, reducers);

export const Store = configureStore({
  reducer: _persistReducer,
  middleware: [thunk],
});