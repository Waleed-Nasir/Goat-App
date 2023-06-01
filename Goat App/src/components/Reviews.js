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
import { COLOR } from "../assets/colors";
import { Assets } from "../assets/images";
const { width } = Dimensions.get("screen");

const Reviews = ({
  style = {},
  onPress,
  index,
  productImage = Assets.Goat_Bottle,
  user = {},
  comment = "",
  likes = [],
  createdAt = "",
  rating = 5,
}) => {
  return (
    <Pressable style={[styles.Main]} onPress={onPress}>
      <View style={styles.ViewArea}>
        <View style={styles.ROW}>
          <Text style={styles.MainText}>Works great for its price.</Text>
          <StarRating
            rating={rating}
            // onChange={setRating}
            starSize={14}
            starStyle={{ marginHorizontal: -1, top: 5 }}
          />
        </View>
        <View style={styles.ROW}>
          <Text style={styles.MiniText}>
            By {user?.name} on {createdAt}
          </Text>
        </View>
        <View style={styles.ROW}>
          <Text style={styles.RatingText}>{comment} </Text>
        </View>

        <View style={styles.ROW}>
          <View style={styles.ActionArea}>
            <Text style={[styles.MiniText, { color: "#000" }]}>
              {likes?.length}
            </Text>
            <Pressable>
              <Image
                source={Assets.Goat_ReviewLike}
                style={styles.ActionAreaButton}
                resizeMode={"center"}
              />
            </Pressable>
          </View>
          <View style={styles.ActionArea}>
            <Pressable>
              <Image
                source={Assets.Goat_ReviewReport}
                style={styles.ActionAreaButton}
                resizeMode={"center"}
              />
            </Pressable>
            <Text style={styles.MiniText}>Report</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  Main: {
    marginVertical: 10,
    width: "100%",
    zIndex: 1,
  },

  ViewArea: {
    flexDirection: "column",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderBottomColor: COLOR.INPUT_PLACEHOLDE,
  },
  ROW: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  MainText: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 19,
    color: COLOR.DarkGreen,
    marginVertical: 3,
  },
  RatingText: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 11,
    color: COLOR.DarkGreen,
  },
  Offer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
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
  },
  MiniText: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 10,
    color: COLOR.GrayText,
    marginVertical: 10,
  },
});

export default Reviews;
