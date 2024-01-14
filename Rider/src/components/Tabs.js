/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLOR } from "../assets/colors";
const { width } = Dimensions.get("screen");

const Tabs = ({
  list = ["Pending", "Completed", "Cancelled"],
  handleSelction = () => {},
  current = 0,
}) => {
  return (
    <View style={styles.Main}>
      {list?.map((item, index) => (
        <TouchableOpacity
          onPress={() => handleSelction(index)}
          style={[
            styles.TabsButton,
            {
              backgroundColor:
                current === index ? COLOR.DarkGreen : COLOR.White,
            },
          ]}
        >
          <Text style={current === index ? styles.Selected : styles.unSelected}>
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  Main: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR.GrayBox,
    flexDirection: "row",
    padding: 5,
    borderRadius: 8,
  },
  // COLOR.ButtonGreen,
  TabsButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 3,
  },
  Selected: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLOR.White,
  },
  unSelected: {
    fontSize: 14,
    fontWeight: "300",
    color: "#000",
  },
});

export default Tabs;
