/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SCREENS } from "../../App";
import { COLOR } from "../assets/colors";
import WishListItem from "../components/WishListItem";
import Layout from "../Layout";
import { getProductDetails } from "../Store/slice/HomeSlices";
import { handleFavProduct } from "../Store/slice/UserLocal";
import { functionFinder } from "../utils/Constant";
import Header from "./Header";
const { width } = Dimensions.get("screen");

const WishList = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {  FavProduct } = useSelector((STATE) => STATE.UserLocal);
  const onPressMe = (id) => {
    dispatch(getProductDetails(id));
    navigation.navigate(SCREENS.ProductDetails);
  };
  return (
    <Layout Header={() => <Header showSlider={false} />}>
      <View style={styles.padding20}>
        <View style={[styles.Row, styles.MT_40]}>
          <Text style={styles.MainText}>YOUR CART</Text>
        </View>
      </View>
      <View style={styles.ProductView}>
        {FavProduct?.map((item) => (
          <WishListItem
            data={item}
            onPress={() => onPressMe(item._id)}
            CrossPress={() =>
              dispatch(handleFavProduct(functionFinder(FavProduct, item)))
            }
          />
        ))}
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
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
});

export default WishList;
