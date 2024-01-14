/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { COLOR } from "../assets/colors";
import { Assets } from "../assets/images";
import Layout from "../Layout";
import AppMap from "./GoogleMap";
import Header from "./Header";
const { width, height } = Dimensions.get("screen");

const MapView = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  return (
    <Layout Header={() => <Header />}>
      <View style={styles.Main}>
        <Pressable
          style={styles.HeaderBack}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image source={Assets.Back} resizeMode={"cover"} />
          <View style={styles.ph_10}>
            <Text style={styles.HeaderText}>Order Details</Text>
          </View>
        </Pressable>
        <View style={styles.detailsMap}>
          <AppMap area={params.area} />
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
    padding: 26,
  },

  detailsMap: {
    width: "100%",
    height: height - 274,
  },
  HeaderBack: {
    width: "100%",
    // height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
    height: 50,
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
