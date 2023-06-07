/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { COLOR } from "../assets/colors";
import { Assets } from "../assets/images";
const { width } = Dimensions.get("screen");

const Address = ({
  isMapShow = false,
  leftIcon = Assets.Goat_DownPoly,
  LeftPress = () => {},
  H = 2,
  Street = "",
  House = "",
  Nearest = "",
  City = "",
}) => {
  return (
    <View style={styles.AddressView}>
      {isMapShow ? (
        <View style={[styles.AddressMap, { height: width / H }]}>
          <Image source={Assets.Goat_MapIcon} />
        </View>
      ) : null}
      <View style={styles.Row}>
        <Image
          resizeMode={"center"}
          source={Assets.Goat_CirclePin}
          style={styles.Icon}
        />
        <View style={styles.Divier} />
        {/* {LocalAddress?.map(() => (
       
        ))} */}
        <View style={{ flex: 1 }}>
          <Text style={[styles.AddressText]}>
            {Street}
            {House}
          </Text>
          <Text style={[styles.AddressDText]}>
            {Nearest} {City}
          </Text>
        </View>
        {leftIcon ? (
          <Pressable onPress={LeftPress}>
            <Image
              style={styles.Icon}
              resizeMode={"center"}
              source={leftIcon}
              borderRadius={100}
            />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  AddressView: {
    backgroundColor: COLOR.ButtonGreen,
    width: "100%",
    paddingVertical: 10,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  AddressMap: {
    width: "100%",
    backgroundColor: COLOR.White,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    borderRadius: 6,
  },
  AddressText: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 24,
    color: COLOR.Black,
  },
  AddressDText: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 10,
    lineHeight: 18,
    color: COLOR.Black,
  },
  Row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  Divier: {
    width: 1,
    height: "80%",
    marginHorizontal: 20,
    backgroundColor: COLOR.GrayText,
  },
  Icon: {
    width: 40,
    height: 40,
  },
});

export default Address;
