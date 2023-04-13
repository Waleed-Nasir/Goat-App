/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, StyleSheet, useColorScheme} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Deliveries from './src/screens/Deliveries';
import Home from './src/screens/Home';
import MapView from './src/screens/MapView';
import OderDetails from './src/screens/OderDetails';
import Reason from './src/screens/Reason';
import SingIn from './src/screens/SignIn';
import SingUp from './src/screens/SignUp';

import Splash from './src/screens/Splash';
import Welcome from './src/screens/Welcome';
import BottomTab from './src/components/BottomTab';
import Profile from './src/screens/Profile';
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
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

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
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
