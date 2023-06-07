/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from "react";
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
import { getOneClikedBuy } from "../Store/slice/UserLocal";
import { getPlaceOrder } from "../Store/slice/HomeSlices";

const OPS = [
  { title: "Cash On Delivery", value: "COD" },
  { title: "Jazzcash", value: "" },
  { title: "Easypaisa", value: "" },
  { title: "Visa OR Master Card", value: "" },
];

const CheckOut = () => {
  const [Shift, setShift] = useState(0);
  const [Radio, setRadio] = useState(0);
  const [accpet, setAccpet] = useState(0);
  const navigation = useNavigation();
  const { LocalAddress, OneClickBuy } = useSelector((STATE) => STATE.UserLocal);
  const dispatch = useDispatch();
  // Street: "",
  // House: "",
  // Nearest: "",
  // City
  useEffect(() => {
    if (OneClickBuy && OneClickBuy?.OrderData?.deliverySlot) {
      var NewSet = { ...OneClickBuy };
      NewSet["OrderData"]["deliverySlot"] = !Shift ? "morning" : "evening";
      NewSet["OrderData"]["paymentMethod"] = OPS[Radio].value;
      NewSet["OrderData"]["addressLine1"] =
        LocalAddress?.Street +
        " " +
        LocalAddress?.House +
        " " +
        LocalAddress?.Nearest +
        " " +
        LocalAddress?.City;
      dispatch(getOneClikedBuy(NewSet));
    }
  }, [Radio, Shift, LocalAddress]);

  const CallBack = () => {
    console.log(LocalAddress, "OneClickBuy");
    navigation.navigate(SCREENS.TrackStatus);
  };
  return (
    <Layout Header={() => <Header showSlider={false} />}>
      <View style={styles.padding20}>
        <View style={[styles.Row, styles.MT_40]}>
          <Text style={styles.HeadingText}>CHECKOUT</Text>
        </View>
      </View>

      <View style={styles.padding20}>
        {LocalAddress ? (
          <Address
            {...LocalAddress}
            LeftPress={() => navigation.navigate(SCREENS.SelectAddress)}
          />
        ) : null}
        <View style={styles.divider} />
        <View style={[styles.Row, styles.MB_10]}>
          <Text style={styles.MainText}>Select payment method</Text>
          <View style={[styles.GreenRowBack, styles.BG_Green]}>
            <Text style={[styles.RequiredText]}>1 Required</Text>
          </View>
        </View>

        {OPS.map((item, index) => (
          <RadioRow
            text={item.title}
            marginVertical={2}
            Checked={index === Radio}
            // onPress={() => setRadio(index)}
            textStyle={{ fontWeight: "800", fontSize: 12 }}
          />
        ))}
        <View style={[styles.MT_40]} />
        {Radio == 3 ? (
          <>
            <Input placeholder="Full Name" />
            <Input placeholder="Card Number" />
            <View style={[styles.Row, styles.MB_10]}>
              <Input ExtraStyle={{ flex: 0.45 }} placeholder="Expiry Date" />
              <Input ExtraStyle={{ flex: 0.45 }} placeholder="CVC" />
            </View>
          </>
        ) : Radio !== 0 ? (
          <Input placeholder="Account or Wallet Number" />
        ) : null}
        <View style={styles.divider} />

        {/* ====== */}
        <View style={[styles.Row, styles.MB_10]}>
          <Text style={styles.MainText}>Select delivery time slot</Text>
        </View>
        <View style={[styles.Row, styles.MB_10]}>
          <Pressable
            onPress={() => setShift(0)}
            style={[
              styles.Shift,
              Shift === 0 ? { backgroundColor: COLOR.DarkGreen } : null,
            ]}
          >
            <Text
              style={[
                styles.ShiftText,
                Shift === 0 ? { color: COLOR.White } : null,
              ]}
            >
              Morning
            </Text>
            <Text
              style={[
                styles.ShiftTimeText,
                Shift === 0 ? { color: COLOR.White } : null,
              ]}
            >
              9:00 AM to 12:00 PM
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setShift(1)}
            style={[
              styles.Shift,
              Shift === 1 ? { backgroundColor: COLOR.DarkGreen } : null,
            ]}
          >
            <Text
              style={[
                styles.ShiftText,
                Shift === 1 ? { color: COLOR.White } : null,
              ]}
            >
              Evening
            </Text>
            <Text
              style={[
                styles.ShiftTimeText,
                Shift === 1 ? { color: COLOR.White } : null,
              ]}
            >
              5:00 AM to 8:00 PM
            </Text>
          </Pressable>
        </View>
        {/* ====== */}
        <View style={styles.divider} />
        <View style={[styles.Row, styles.MB_10]}>
          <Text style={styles.MainText}>Order summary</Text>
        </View>
        {OneClickBuy?.OrderData?.items?.map((item) => (
          <View style={styles.Row}>
            <Text style={[styles.MiniText]}>{OneClickBuy.name}</Text>
            <Text style={[styles.MiniText]}>Qty: {item?.quantity}</Text>
            <Text style={[styles.MiniText]}>Price: {OneClickBuy?.price}</Text>
          </View>
        ))}
        <View style={styles.divider} />
        <View style={styles.Row}>
          <Text style={[styles.MiniText]}>Order amount</Text>
          <Text style={[styles.MiniText]}>
            {OneClickBuy?.OrderData?.items[0]?.quantity * OneClickBuy?.price}
          </Text>
        </View>

        <View style={styles.Row}>
          <Text style={[styles.MiniText]}>Delivery charges</Text>
          <Text style={[styles.MiniText]}>200</Text>
        </View>
        <View style={styles.divider} />

        {/* {data.map((ELE, index) => {
          return (
            <>
              {ELE.title ? (
                <View style={[styles.Row, styles.MB_10]}>
                  <Text style={styles.MainText}>{ELE.title}</Text>
                </View>
              ) : null}
              {ELE?.items?.map((val) => (
                <View style={styles.Row}>
                  <Text style={[styles.MiniText, val.style]}>{val.name}</Text>
                  <Text style={[styles.MiniText, val.style]}>
                    {val.ammount}
                  </Text>
                </View>
              ))}
              {ELE.isDivier ? <View style={styles.divider} /> : null}
            </>
          );
        })} */}
        <View style={[styles.Row, styles.MB_10]}>
          <Text style={styles.MainText}>Discount coupon</Text>
          <View style={[styles.GreenRowBack, styles.BG_Gray]}>
            <Text style={[styles.RequiredText, { color: COLOR.Black }]}>
              If any
            </Text>
          </View>
        </View>
        <Input placeholder="Enter Discount Coupon" />
        <RadioRow
          onPress={() => {
            setAccpet(1);
          }}
          Checked={accpet}
          text={"By completing this order, I agree to all terms & conditions"}
        />
        <View style={styles.Row}>
          <Text style={[styles.MiniText, { fontWeight: "700" }]}>
            Total amount
          </Text>
          <Text style={[styles.MiniText, { fontWeight: "700" }]}>
            {OneClickBuy?.OrderData?.items[0]?.quantity * OneClickBuy?.price +
              200}
          </Text>
        </View>
        <View style={styles.divider} />
        <Button
          title="Checkout"
          disabled={!accpet}
          onPress={() => {
            dispatch(
              getPlaceOrder({ data: OneClickBuy.OrderData, CallBack: CallBack })
            );
          }}
        />
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
  Row: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  MainText: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 24,
    color: COLOR.Black,
  },
  MiniText: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 21,
    color: COLOR.Black,
    marginVertical: 5,
  },
  divider: {
    width: "100%",
    height: 2,
    backgroundColor: COLOR.GrayBox,
    marginVertical: 20,
  },
  GreenRowBack: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
  },
  RequiredText: {
    textAlign: "center",
    fontSize: 10,
    fontWeight: "600",
    color: COLOR.White,
  },
  BG_Green: {
    backgroundColor: COLOR.DarkGreen,
  },
  BG_Gray: {
    backgroundColor: COLOR.INPUT_BG,
  },
  Shift: {
    flex: 0.47,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: COLOR.INPUT_BG,
    borderRadius: 10,
  },
  ShiftText: {
    fontStyle: "normal",
    fontWeight: "900",
    fontSize: 16,
    lineHeight: 24,
    color: COLOR.Gray,
  },
  ShiftTimeText: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 12,
    lineHeight: 18,
    color: COLOR.Gray,
  },
});

export default CheckOut;

const data = [
  {
    title: "Order summary",
    items: [
      { name: "item 1", ammount: "RS 5.00" },
      { name: "item 2", ammount: "RS 5.00" },
      { name: "item 3", ammount: "RS 5.00" },
    ],
  },
  {
    isDivier: true,
  },
  {
    items: [
      { name: "Cart total amount", ammount: "Rs 50.00" },
      { name: "Tax", ammount: "Rs 7.45" },
      { name: "Delivery charges", ammount: "Rs 2.5" },
    ],
  },
  {
    isDivier: true,
  },
  {
    items: [
      {
        name: "Total amount",
        ammount: "Rs 57.45",
        style: { fontWeight: "700" },
      },
    ],
  },
  {
    isDivier: true,
  },
];
