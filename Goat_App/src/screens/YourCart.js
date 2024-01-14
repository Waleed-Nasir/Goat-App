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
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOneClikedBuy } from "../Store/slice/UserLocal";

const YourCart = () => {
  const navigation = useNavigation();
  const { CartProduct } = useSelector((STATE) => STATE.UserLocal);
  const numOr0 = (n) => (isNaN(n) ? 0 : n);

  const total = (
    Object.values(CartProduct)?.map((item) => item.Qty * item.price) || [0]
  ).reduce(add, 0);
  function add(accumulator, a) {
    return numOr0(accumulator) + numOr0(a);
  }

  console.log(total);

  const [HandleCart, setHandleCard] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (CartProduct && Object.values(CartProduct)?.length) {
      const data = {
        OrderData: {
          addressId: null,
          claimedBottles: [],
          deliverySlot: "evening",
          items: Object.values(CartProduct)?.map((item) => ({
            name: item.name,
            id: item._id,
            quantity: item.Qty,
            price: item.price,
          })),
          paymentMethod: "COD",
          repeatFrequency: "days",
        },
        price: total,
        total: total,
      };
      setHandleCard(data);
    }
  }, [CartProduct]);

  //

  return (
    <Layout Header={() => <Header showSlider={false} />}>
      <View style={styles.padding20}>
        <View style={[styles.Row, styles.MT_40]}>
          <Text style={styles.MainText}>YOUR CART</Text>
        </View>
      </View>
      <FlatList
        numColumns={2}
        style={{ width: "100%" }}
        contentContainerStyle={{ paddingHorizontal: 11 }}
        data={Object?.values(CartProduct) || []}
        renderItem={({ item }) => (
          <Item
            showCross
            Qty={item.Qty}
            data={item}
            onPress={() => navigation.navigate(SCREENS.ProductDetails)}
          />
        )}
      />
      <View style={styles.padding20}>
        <View style={styles.Row}>
          <Text style={styles.MiniText}>Taxes</Text>
          <Text style={styles.MiniText}>RS {total}</Text>
        </View>
        <View style={[styles.Row, styles.MB_10]}>
          <Text style={styles.MainText}>Subtotal</Text>
          <Text style={styles.MainText}>RS {total}</Text>
        </View>
        <Button
          title="Checkout"
          onPress={() => {
            dispatch(getOneClikedBuy(HandleCart));
            navigation.navigate(SCREENS.CheckOut);
          }}
        />
        <Button
          BG={COLOR.ButtonLightGreenGradient}
          color={COLOR.DarkGreen}
          title="Continue Shopping"
          onPress={() => {
            navigation.navigate(SCREENS.Home);
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

  Container: {
    width: "100%",
    paddingHorizontal: 30,
    paddingTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  Warp: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    paddingBottom: 20,
  },
  padding20: {
    paddingHorizontal: 30,
    width: "100%",
  },
  VerticalSlider: {
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
    fontWeight: "500",
    fontSize: 20,
    lineHeight: 26,
    color: COLOR.DarkGreen,
  },
  MiniText: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 21,
    color: COLOR.DarkGreen,
  },
  FilerText: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 12,
    color: COLOR.DarkGreen,
    marginHorizontal: 5,
  },
  RowItem: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: COLOR.GrayBox,
    marginHorizontal: 8,
  },
  ProductView: {
    paddingHorizontal: 11,
  },
});

export default YourCart;
