import AsyncStorage from "@react-native-community/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import thunk from "redux-thunk";
import AuthReducer from './slice/AuthSlicer';

const reducers = combineReducers({
  Auth: AuthReducer, 
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