/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, useColorScheme } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PersistGate } from "redux-persist/integration/react";
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Deliveries from './src/screens/Deliveries';
import Home from './src/screens/Home';
import { Provider, useDispatch, useSelector } from 'react-redux'
import MapView from './src/screens/MapView';
import OderDetails from './src/screens/OderDetails';
import Reason from './src/screens/Reason';
import SingIn from './src/screens/SignIn';
import SingUp from './src/screens/SignUp';

import Splash from './src/screens/Splash';
import Welcome from './src/screens/Welcome';
import BottomTab from './src/components/BottomTab';
import Profile from './src/screens/Profile';
import toastConfig from './src/utils/ToastConfig';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { Store } from './src/store/store';
import persistStore from 'redux-persist/es/persistStore';
import LoaderModal from './src/components/LoaderModal';
import { getUserData } from './src/store/slice/UserSlices';
import {  getOrderList } from './src/store/slice/HomeSlices';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const SCREENS = {
  Deliveries: 'Deliveries',
  MapView: 'MapView',
  OderDetails: 'OderDetails',
  Reason: 'Reason',
  SingIn: 'SingIn',
  SingUp: 'SingUp',
  Splash: 'Splash',
  Welcome: 'Welcome',
  Profile: 'Profile',
};

const TAB = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      gestureEnabled: false,
    }}
    tabBar={props => <BottomTab {...props} />}>
    <Tab.Screen name={SCREENS.Deliveries} component={Deliveries} />
    <Tab.Screen name={SCREENS.MapView} component={MapView} />
    <Tab.Screen name={SCREENS.OderDetails} component={OderDetails} />
    <Tab.Screen name={SCREENS.Reason} component={Reason} />
    <Stack.Screen name={SCREENS.Profile} component={Profile} />
  </Tab.Navigator>
);
const AppMain = () => {

  const dispatch = useDispatch();
  const { accessToken, userID } = useSelector((state) => state.Auth);
  const STATE = useSelector((state) => state);
  useEffect(() => {
    // alert(accessToken);
    if (accessToken) {
      // dispatch(getCategories());
      dispatch(getUserData());
      dispatch(getOrderList());
    }
  }, [accessToken]);


  return (

    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
        initialRouteName={SCREENS.Splash}>
        <Stack.Screen name={SCREENS.Splash} component={Splash} />
        <Stack.Screen name={SCREENS.Welcome} component={Welcome} />
        <Stack.Screen name={SCREENS.SingIn} component={SingIn} />
        <Stack.Screen name={SCREENS.SingUp} component={SingUp} />
        <Stack.Screen name={SCREENS.Deliveries} component={TAB} />
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
  )
}


export default App;
