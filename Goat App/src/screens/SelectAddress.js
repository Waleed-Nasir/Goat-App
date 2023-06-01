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

const OPS = [
  "Cash On Delivery",
  "Jazzcash",
  "Easypaisa",
  "Visa OR Master Card",
];

const SelectAddress = () => {
  const [AddressFor, setAddressFor] = useState(0);
  const [SHOW, setSHOW] = useState(0);
  const navigation = useNavigation();
  const [address, setAddress] = useState({
    Street: "",
    House: "",
    Nearest: "",
    City: "",
  });
  // addLocalAddress
  return (
    <Layout
      Footer={() => (
        <View style={styles.padding20}>
          {AddressFor === 0 ? (
            <Button
              title="Save & Continue"
              onPress={() => {
                navigation.goBack();
              }}
            />
          ) : (
            <View style={[styles.Row]}>
              <Button
                BG={[COLOR.DarkGreen, COLOR.DarkGreen]}
                style={{ width: "48%" }}
                title="Cancel"
                onPress={() => {
                  setSHOW(0), setAddressFor(0);
                }}
              />
              <Button
                style={{ width: "48%", marginLeft: "4%" }}
                title="Confirm Location"
                onPress={() => {
                  setSHOW(0), setAddressFor(0);
                }}
              />
            </View>
          )}
        </View>
      )}
      Header={() => <Header showSlider={false} />}
    >
      <View style={styles.padding20}>
        <View style={[styles.Row, styles.MT_40]}>
          <Text style={styles.HeadingText}>
            {AddressFor === 0 ? "SELECT ADDRESS" : "EDIT ADDRESS"}
          </Text>
        </View>
      </View>

      <View style={styles.padding20}>
        <Address
          isMapShow
          leftIcon={AddressFor === 1 ? null : Assets.Goat_CirclePencil}
          H={AddressFor === 0 ? 2 : 1.3}
          LeftPress={() => {
            setSHOW(1), setAddressFor(1);
          }}
        />
        {AddressFor === 1 ? (
          <>
            <Input
              InputProps={{
                value: address.Street,
                onChangeText: (e) => {
                  setAddress({ ...address, Street });
                },
              }}
              placeholder="Street Address"
            />
            <Input
              InputProps={{
                value: address.House,
                onChangeText: (e) => {
                  setAddress({ ...address, House });
                },
              }}
              placeholder="House/Unit #"
            />
            <Input
              InputProps={{
                value: address.Nearest,
                onChangeText: (e) => {
                  setAddress({ ...address, Nearest });
                },
              }}
              placeholder="Nearest Landmark"
            />
            <Input
              InputProps={{
                value: address.City,
                onChangeText: (e) => {
                  setAddress({ ...address, City });
                },
              }}
              placeholder="City"
            />
            {SHOW === 1 ? (
              <Input
                placeholder="Notes To Rider......"
                InputProps={{ numberOfLines: 5, multiline: true }}
                InputStyle={{ height: 80 }}
              />
            ) : null}
          </>
        ) : null}
        {AddressFor === 0 && SHOW === 0 ? (
          <>
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
            <Pressable onPress={() => setAddressFor(1)} style={styles.Row}>
              <Image source={Assets.Goat_Plus} />
              <Text style={styles.MainText}>Add new address</Text>
            </Pressable>
          </>
        ) : (
          <>
            {/* ==2=== */}
            <View style={[styles.Row, styles.MT_40, styles.MB_10]}>
              <Image source={Assets.Goat_AddTag} />
              <Text style={styles.MainText}>Add a label</Text>
            </View>
            <View style={[styles.Row, styles.MB_10]}>
              <Image
                source={Assets.Goat_CircleHome}
                style={styles.IconButton}
              />
              <Image source={Assets.Goat_CircleJob} style={styles.IconButton} />
              <Image
                source={Assets.Goat_CirclePlus}
                style={styles.IconButton}
              />
            </View>
          </>
        )}
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
