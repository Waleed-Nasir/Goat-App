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
  FlatList,
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
import Item from "../components/Item";
import Layout from "../Layout";
import { getSearchProducts } from "../Store/slice/HomeSlices";
import Header from "./Header";
const { width } = Dimensions.get("screen");

const SearchProducts = () => {
  const navigation = useNavigation();
  const { SearchProductList } = useSelector((STATE) => STATE.Home);
  const [search, onSearch] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(getSearchProducts({ search }));
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  return (
    <Layout
    // Header={() =>}
    >
      <Header showSlider={false} onSearch={onSearch} search={search} />

      <View style={styles.padding20}>
        <View style={styles.Row}>
          <Text style={styles.MainText}>Search Products</Text>
        </View>
      </View>
      <FlatList
        numColumns={2}
        style={{ width: "100%" }}
        contentContainerStyle={{ paddingHorizontal: 11 }}
        data={SearchProductList}
        renderItem={({ item, index }) => (
          <Item
            data={item}
            productImage={{ uri: item?.imageUrl }}
            onPress={() => navigation.navigate(SCREENS.ProductDetails)}
            index={index}
          />
        )}
      />
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
    paddingHorizontal: 20,
    paddingVertical: 2,
    width: "100%",
  },
  VerticalSlider: {
    width: "100%",
  },
  Row: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
    marginTop: 10,
  },
  MainText: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 20,
    lineHeight: 26,
    color: COLOR.FullGreen,
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
  MiniArrow: {
    width: 6,
    height: 10,
  },
});

export default SearchProducts;
