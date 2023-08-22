/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, useColorScheme } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import YourCart from "./src/screens/YourCart";
import CheckOut from "./src/screens/CheckOut";
import DairyProducts from "./src/screens/DairyProducts";
import Deliveries from "./src/screens/Deliveries";
import Home from "./src/screens/Home";
import MapView from "./src/screens/MapView";
import OderDetails from "./src/screens/OderDetails";
import ProductDetails from "./src/screens/ProductDetails";
import Reason from "./src/screens/Reason";
import SingIn from "./src/screens/SignIn";
import SingUp from "./src/screens/SignUp";
import { enableLatestRenderer } from "react-native-maps";
import Splash from "./src/screens/Splash";
import Welcome from "./src/screens/Welcome";
import SelectAddress from "./src/screens/SelectAddress";
import TrackOrder from "./src/screens/TrackOrder";
import TrackStatus from "./src/screens/TrackStatus";
import SupportRequest from "./src/screens/SupportRequest";
import Settings from "./src/screens/Settings";
import ManageOrders from "./src/screens/ManageOrders";
import Wallet from "./src/screens/Wallet";
import MyOrders from "./src/screens/MyOrders";
import Profile from "./src/screens/Profile";
import BottomTab from "./src/components/BottomTab";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WishList from "./src/screens/WishList";
import toastConfig from "./src/utils/ToastConfig";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { Store } from "./src/Store/Store";
import persistStore from "redux-persist/es/persistStore";
import { Provider, useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { getUserData } from "./src/Store/slice/UserSlices";
import {
  getAddress,
  getCategories,
  getProductList,
} from "./src/Store/slice/HomeSlices";
import LoaderModal from "./src/components/LoaderModal";
import AddanEditAddress from "./src/screens/AddandEditAddress";
import SearchProducts from "./src/screens/SearchProducts";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const SCREENS = {
  Deliveries: "Deliveries",
  MapView: "MapView",
  OderDetails: "OderDetails",
  Reason: "Reason",
  SingIn: "SingIn",
  SingUp: "SingUp",
  Splash: "Splash",
  Welcome: "Welcome",
  Home: "Home",
  DairyProducts: "DairyProducts",
  ProductDetails: "ProductDetails",
  YourCart: "YourCart",
  CheckOut: "CheckOut",
  SelectAddress: "SelectAddress",
  TrackOrder: "TrackOrder",
  TrackStatus: "TrackStatus",
  SupportRequest: "SupportRequest",
  Settings: "Settings",
  ManageOrders: "ManageOrders",
  Wallet: "Wallet",
  MyOrders: "MyOrders",
  Profile: "Profile",
  WishList: "WishList",
  AddanEditAddress: "AddanEditAddress",
  SearchProducts: "SearchProducts",
};
const TAB = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      gestureEnabled: false,
    }}
    tabBar={(props) => <BottomTab {...props} />}
  >
    <Tab.Screen name={SCREENS.Home} component={Home} />
    <Tab.Screen name={SCREENS.Settings} component={Settings} />
    <Tab.Screen name={SCREENS.ManageOrders} component={ManageOrders} />
    <Tab.Screen name={SCREENS.YourCart} component={YourCart} />
    <Tab.Screen name={SCREENS.MyOrders} component={MyOrders} />
    <Tab.Screen name={SCREENS.Profile} component={Profile} />
    <Tab.Screen name={SCREENS.DairyProducts} component={DairyProducts} />
    <Tab.Screen name={SCREENS.ProductDetails} component={ProductDetails} />
    <Tab.Screen name={SCREENS.AddanEditAddress} component={AddanEditAddress} />

    <Tab.Screen name={SCREENS.CheckOut} component={CheckOut} />
    <Tab.Screen name={SCREENS.TrackStatus} component={TrackStatus} />
    <Tab.Screen name={SCREENS.TrackOrder} component={TrackOrder} />
    <Tab.Screen name={SCREENS.SupportRequest} component={SupportRequest} />
    <Tab.Screen name={SCREENS.Wallet} component={Wallet} />
    <Tab.Screen name={SCREENS.WishList} component={WishList} />
  </Tab.Navigator>
);
const AppMain = () => {
  const dispatch = useDispatch();
  const { accessToken, userID } = useSelector((state) => state.Auth);
  const STATE = useSelector((state) => state);
  console.log(userID);
  useEffect(() => {
    enableLatestRenderer();
    // alert(accessToken);
    if (accessToken) {
      dispatch(getCategories());
      dispatch(getUserData());
      dispatch(getProductList());
      dispatch(getAddress(userID));
    }
  }, [accessToken]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
        initialRouteName={SCREENS.Splash}
      >
        <Stack.Screen name={SCREENS.Splash} component={Splash} />
        <Stack.Screen name={SCREENS.Welcome} component={Welcome} />
        <Stack.Screen name={SCREENS.SingIn} component={SingIn} />
        <Stack.Screen name={SCREENS.SingUp} component={SingUp} />
        {/* <Stack.Screen name={SCREENS.Deliveries} component={Deliveries} />
        <Stack.Screen name={SCREENS.MapView} component={MapView} />
        <Stack.Screen name={SCREENS.OderDetails} component={OderDetails} />
        <Stack.Screen name={SCREENS.Reason} component={Reason} /> */}
        <Stack.Screen
          name={SCREENS.SearchProducts}
          component={SearchProducts}
        />
        <Stack.Screen name={SCREENS.Home} component={TAB} />
        <Stack.Screen name={SCREENS.SelectAddress} component={SelectAddress} />
        <Stack.Screen name={SCREENS.MapView} component={MapView} />
      </Stack.Navigator>
      <Toast config={toastConfig} />
      <LoaderModal visibility={false} />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

const App = () => {
  const persistor = persistStore(Store);
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppMain />
      </PersistGate>
    </Provider>
  );
};

export default App;
