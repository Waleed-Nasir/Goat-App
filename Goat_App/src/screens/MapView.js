/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  PermissionsAndroid,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { COLOR } from "../assets/colors";
import { Assets } from "../assets/images";
import { Button } from "../components/Button";
import Layout from "../Layout";
import { addLocalAddress } from "../Store/slice/UserLocal";
import Header from "./Header";
import AppMap from "./Mao";
const { width, height } = Dimensions.get("screen");

const MapView = () => {
  const navigation = useNavigation();

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Example App",
          message: "Example App access to your location ",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location");
        // alert("You can use the location");
      } else {
        console.log("location permission denied");
        // alert("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // "latitude": "123456",
  // "longitude": "541233",
  const { LocalAddress } = useSelector((STATE) => STATE.UserLocal);

  const [address, setAddress] = useState({
    selected: true,
    Street: "",
    House: "",
    Nearest: "",
    City: "",
    Tag: "",
    id: Math.random(),
    latitude: "",
    longitude: "",
  });

  const HandleData = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${address.latitude},${address.longitude}&sensor=true&key=AIzaSyBj8yjGnPAemQZ2G_SSNxBDvs7j3vzRssM`,
      requestOptions
    )
      .then((response) => response.json())
      .then(
        (result) => {
          let ADD = result.plus_code.compound_code.split(",");
          // setAddress({
          //   ...address,
          //   Street: result.plus_code.compound_code,
          //   House: result.plus_code.compound_code,
          //   Nearest: ADD[ADD.length - 3],
          //   City: ADD[ADD.length - 2] + " " + ADD[ADD.length - 1],
          //   Tag: "Current",
          //   id: Math.random(),
          //   latitude: address.latitude,
          //   longitude: address.longitude,
          // });
          dispatch(
            addLocalAddress([
              ...LocalAddress,
              {
                ...address,
                Street: result.plus_code.compound_code,
                House: result.plus_code.compound_code,
                Nearest: ADD[ADD.length - 3],
                City: ADD[ADD.length - 2] + " " + ADD[ADD.length - 1],
                Tag: "Current",
                id: Math.random(),
                latitude: address.latitude,
                longitude: address.longitude,
              },
            ])
          );
          navigation.goBack();
        }
        // console.log(result.plus_code.compound_code)
      )
      .catch((error) => console.log("error", error));
  };

  const dispatch = useDispatch();
  return (
    <Layout>
      <View style={styles.Main}>
        <View style={styles.detailsMap}>
          <AppMap
            CallBack={(position) => setAddress({ ...address, ...position })}
          />
          {/* <Image source={Assets.FullMap} resizeMode={'center'} /> */}
        </View>
        <View style={styles.MainView}>
          <Button
            title="Save & Continue"
            onPress={() => {
              HandleData();
              // dispatch(addLocalAddress([...LocalAddress, address]));
              // navigation.goBack();
            }}
          />
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  Main: {
    width: "100%",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: COLOR.White,
  },
  MainView: {
    position: "absolute",
    padding: 26,
    width: "100%",
    bottom: 30,
  },

  detailsMap: {
    width: "100%",
    height: height - 50,
  },
  HeaderBack: {
    width: "100%",
    // height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
  },
  HeaderText: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 20,
    lineHeight: 28,
    color: COLOR.DarkGreen,
    textAlign: "right",
  },
});

export default MapView;

const value = {
  "Drop Off":
    "Flat 123, Block 2332, Gulshan e iqbal, karachi 232132 NL : Sadequain Banqueut",
  "Order #": "123548456888854123",
  Name: "Shah Tamir Ahmed ahmed ad",
  "Contact Number": "0308-5659898, 2135-5458585",
  "Cash to be Collected": false,
  "1 ltr Bottles": false,
  "1/2 ltr Bottles": false,
  "Special Instructions": "qwd",
};
