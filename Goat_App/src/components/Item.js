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
import StarRating from "react-native-star-rating-widget";
import { useDispatch, useSelector } from "react-redux";
import { COLOR } from "../assets/colors";
import { Assets } from "../assets/images";
import { getProductDetails } from "../Store/slice/HomeSlices";
import { handleCartProduct, handleFavProduct } from "../Store/slice/UserLocal";
import { functionAdder, functionFinder } from "../utils/Constant";
const { width } = Dimensions.get("screen");

const Item = ({
  style = {},
  onPress,
  Qty = false,
  productImage = Assets.Goat_Bottle,
  data = {
    name: "Dairy Products",
    rating: 5,
    price: "Dummy",
    imageUrl: "",
    _id: null,
  },
  showCross = false,
}) => {
  const [rating, setRating] = useState(0);
  const { CartProduct, FavProduct } = useSelector((STATE) => STATE.UserLocal);
  const dispatch = useDispatch();
  const onPressMe = () => {
    onPress();
    dispatch(getProductDetails(data._id));
  };

  const like = FavProduct?.map((item) => item._id)?.includes(data._id);
  // Goat_FillHeart

  return (
    <Pressable style={[styles.Main, style]} onPress={onPressMe}>
      <Image
        source={{ uri: data?.imageUrl }}
        borderRadius={4}
        style={styles.ItemImage}
        resizeMode={"cover"}
      />
      {showCross ? (
        <Pressable
          style={[{ position: "absolute", top: 10, right: 10 }]}
          onPress={() => {
            let NewDATA = { ...CartProduct };
            delete NewDATA[data._id];
            dispatch(handleCartProduct(NewDATA));
          }}
        >
          <Image
            source={Assets.Goat_CrossGreen}
            style={{ width: 30, height: 30 }}
            resizeMode={"cover"}
          />
        </Pressable>
      ) : null}
      <View style={styles.ViewArea}>
        <Text style={styles.MainText}>{data.name || "Dairy Products"}</Text>
        <View style={styles.ROW}>
          <StarRating
            rating={data.rating}
            onChange={setRating}
            starSize={16}
            starStyle={{ marginHorizontal: -1 }}
          />
          <Text style={styles.RatingText}>{data.rating}</Text>
        </View>
        <View style={styles.ROW}>
          <Text style={styles.Price}>Rs: {data?.price}</Text>
          <View style={styles.Offer}>
            <View
              style={{
                padding: 2,
                borderRadius: 4,
                backgroundColor: COLOR.DarkGreen,
              }}
            >
              <Text style={styles.OfferText}>30% OFF</Text>
            </View>
            <Text style={styles.beforePrice}>Before Rs 1000</Text>
          </View>
        </View>
        <View style={styles.ROW}>
          <View style={styles.ActionArea}>
            <Pressable
              onPress={() => {
                dispatch(handleFavProduct(functionFinder(FavProduct, data)));
              }}
            >
              <Image
                source={like ? Assets.Goat_FillHeart : Assets.Goat_Heart}
                style={styles.ActionAreaButton}
                resizeMode={"center"}
              />
            </Pressable>
            {Qty ? null : (
              <Pressable
                onPress={() => {
                  dispatch(handleCartProduct(functionAdder(CartProduct, data)));
                }}
              >
                <Image
                  source={Assets.Goat_AddToCard}
                  style={styles.ActionAreaButton}
                  resizeMode={"center"}
                />
              </Pressable>
            )}
          </View>
          {Qty ? (
            <View style={[styles.ActionArea, { alignItems: "flex-end" }]}>
              <Text style={[styles.beforePrice, { fontSize: 8 }]}>QTY</Text>
              <Text
                style={[
                  styles.beforePrice,
                  { fontWeight: "700", fontSize: 15, top: 2 },
                ]}
              >
                {Qty}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  Main: {
    marginVertical: 20,
    backgroundColor: COLOR.ButtonGreen,
    padding: 8,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 16,
    maxWidth: width / 2.2,
  },
  ItemImage: {
    width: "100%",
    height: width / 3.2,
  },
  ViewArea: {
    flexDirection: "column",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 6,
  },
  ROW: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  MainText: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 14,
    lineHeight: 22,
    color: COLOR.DarkGreen,
    marginVertical: 3,
  },
  RatingText: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 10,
    color: "#000",
    marginHorizontal: 5,
  },
  Price: {
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 14,
    lineHeight: 26,
    color: COLOR.DarkGreen,
    marginVertical: 5,
    flex: 1,
  },
  Offer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  OfferText: {
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 10,
    color: COLOR.White,
  },
  beforePrice: {
    fontWeight: "700",
    fontSize: 7,
    color: COLOR.DarkGreen,
  },
  ActionArea: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  ActionAreaButton: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
});

export default Item;
