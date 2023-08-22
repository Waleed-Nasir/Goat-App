/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SCREENS } from "../../App";
import { COLOR } from "../assets/colors";
import { Assets } from "../assets/images";
import { Button } from "../components/Button";
import Layout from "../Layout";
import { removeAccessToken } from "../Store/slice/AuthSlicer";
import { getOrders } from "../Store/slice/HomeSlices";
import Header from "./Header";
const { width } = Dimensions.get("screen");

const OPS = [
  "Cash On Delivery",
  "Jazzcash",
  "Easypaisa",
  "Visa OR Master Card",
];

const Settings = () => {
  const [CurrentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { USER_DATA } = useSelector((state) => state.User);

  const data = [
    {
      title: "Manage Schedule",
      subText: "Edit or Delete milk scheduling",
      icon: Assets.Goat_SettingOrder,
      route: "ManageOrders",
    },
    {
      title: "My Orders",
      subText: "Previous order history",
      icon: Assets.Goat_SettingOrder,
      route: "MyOrders",
      callback: () => {
        dispatch(getOrders());
        navigation.navigate("MyOrders");
      },
    },
    {
      title: "Shipping Addresses",
      subText: "Add or edit your addresses",
      icon: Assets.Goat_SettingMap,
      route: "SelectAddress",
      stylesList: { backgroundColor: COLOR.DarkGreen + 55 },
      stylesFont: { color: COLOR.White },
    },
    {
      title: "Wallet & Payment ",
      subText: "Manage your wallet & payment methods",
      icon: Assets.Goat_SettingGear,
      route: "Wallet",
    },
    {
      title: "Settings",
      subText: "Notifications, Passwords, etc.",
      icon: Assets.Goat_SettingGear,
      route: "Profile",
    },
    {
      title: "Favourites",
      subText: "Manage your favourite products",
      icon: Assets.Goat_SettingGear,
      route: "WishList",
    },
  ];

  return (
    <Layout Header={() => <Header showSlider={false} />}>
      <View style={[styles.Row, styles.MT_40, styles.padding20]}>
        <Text style={styles.HeadingText}>PROFILE</Text>
      </View>
      <View style={styles.padding20}>
        <View style={styles.ImageIND}>
          <Image
            source={Assets.Goat_SettingUserPP}
            style={{ width: 100, height: 100 }}
            resizeMode={"contain"}
          />
        </View>
        <Text style={styles.centerText}>{USER_DATA?.name}</Text>
        <View style={[styles.Row, { justifyContent: "space-evenly" }]}>
          <Text style={styles.Title}>{USER_DATA?.phone}</Text>
          <Text style={styles.Title}>|</Text>
          <Text style={styles.Title}>{USER_DATA?.email}</Text>
        </View>
        <View style={styles.MT_40} />
        {data.map((item) => (
          <Pressable
            onPress={() => {
              if (item?.callback) {
                item?.callback();
              } else {
                navigation.navigate(item.route);
              }
            }}
            style={[styles.RowItem, item?.stylesList]}
          >
            <Image source={item.icon} style={styles.IconButton} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.MainTitle, item.stylesFont]}>
                {item.title}
              </Text>
              <Text style={[styles.Title, item.stylesFont]}>
                {item.subText}
              </Text>
            </View>
            <Image
              source={Assets.Goat_SettingArrow}
              resizeMode={"center"}
              style={styles.IconButton}
            />
          </Pressable>
        ))}

        <View style={[styles.Row, styles.MT_40]}>
          <Button
            title="Log Out"
            onPress={() => {
              dispatch(removeAccessToken(null));
              navigation.navigate(SCREENS.Welcome);
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR.White,
  },
  HeadingText: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 20,
    color: COLOR.DarkGreen,
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  padding20: {
    paddingHorizontal: 20,
    width: "100%",
  },
  MT_40: {
    marginTop: 20,
  },
  MB_10: {
    marginBottom: 10,
  },

  MainText: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 24,
    color: COLOR.GrayText,
    marginHorizontal: 10,
  },
  divider: {
    width: "100%",
    height: 2,
    backgroundColor: COLOR.GrayBox,
    marginVertical: 20,
  },
  Row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 6,
  },
  RowItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    paddingVertical: 20,
    borderRadius: 10,
  },
  IconButton: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
  },
  centerText: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 21,
    color: COLOR.GrayText,
    textAlign: "center",
    marginBottom: 10,
  },
  ImageIND: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  Title: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 12,
    color: COLOR.GrayText,
  },
  MainTitle: {
    fontSize: 18,
    color: COLOR.GrayText,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 27,
  },
});

export default Settings;
