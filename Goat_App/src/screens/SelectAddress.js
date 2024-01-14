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
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLOR } from "../assets/colors";
import { Assets } from "../assets/images";
import Layout from "../Layout";
import Header from "./Header";
const { width } = Dimensions.get("screen");
import StarRating from "react-native-star-rating-widget";
import MainItem from "../components/MeanItem";
import Item from "../components/Item";
import CategoriesFor from "../components/CategoriesFor";
import { Button } from "../components/Button";
import Accordian from "../components/Accordian";
import VerticalSlider from "../components/VerticalSlider";
import Input from "../components/Input";
import RadioRow from "../components/RadioRow";
import Address from "../components/Address";
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { addLocalAddress } from "../Store/slice/UserLocal";

const SelectAddress = () => {
  const dispatch = useDispatch();
  const [AddressFor, setAddressFor] = useState(0);
  const [SHOW, setSHOW] = useState(0);
  const navigation = useNavigation();

  const { LocalAddress } = useSelector((STATE) => STATE.UserLocal);
  console.log(LocalAddress, "LocalAddress");
  // addLocalAddress
  return (
    <Layout
      Footer={() => (
        <View style={styles.padding20}>
          <Button
            title="Save & Continue"
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
      )}
      Header={() => <Header showSlider={false} />}
    >
      <View style={styles.padding20}>
        <View style={[styles.Row, styles.MT_40]}>
          <Text style={styles.HeadingText}>ADDRESS MANAGEMENT</Text>
        </View>
      </View>

      <View style={styles.padding20}>
        {LocalAddress
          ? LocalAddress?.map((Item, index) => (
              <Address
                {...Item}
                leftIcon={
                  AddressFor === 1
                    ? null
                    : Item?.selected
                    ? Assets.Goat_TrackConfirm
                    : Assets.Goat_CirclePencil
                }
                H={AddressFor === 0 ? 2 : 1.3}
                onPress={() => {
                  dispatch(
                    addLocalAddress(
                      LocalAddress.map((item) =>
                        item?.id === Item?.id
                          ? { ...item, selected: true }
                          : { ...item, selected: false }
                      )
                    )
                  );
                }}
                LeftPress={() => {
                  navigation.navigate(SCREENS.AddanEditAddress, {
                    addressEdit: Item,
                  });
                }}
              />
            ))
          : null}

        <View style={styles.divider} />
        <Pressable
          onPress={() => {
            navigation.navigate(SCREENS.MapView);
          }}
          style={styles.Row}
        >
          <Image source={Assets.Goat_Location} />
          <Text style={styles.MainText}>Use my current location</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate(SCREENS.AddanEditAddress);
          }}
          style={styles.Row}
        >
          <Image source={Assets.Goat_Plus} />
          <Text style={styles.MainText}>Add new address</Text>
        </Pressable>

        <View style={{ height: 100 }} />
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
    fontWeight: "400",
    fontSize: 16,
    color: COLOR.DarkGreen,
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  padding20: {
    paddingHorizontal: 30,
    width: "100%",
  },
  MT_40: {
    marginTop: 40,
  },
  MB_10: {
    marginBottom: 10,
  },

  MainText: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 24,
    color: COLOR.Black,
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
    justifyContent: "flex-start",
    padding: 6,
  },
  IconButton: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
});

export default SelectAddress;
