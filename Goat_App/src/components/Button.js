import React, { Component, Fragment } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from "react-native";

import LinearGradient from "react-native-linear-gradient";
import { COLOR } from "../assets/colors";

export const Button = ({
  disabled = false,
  onPress = () => {},
  color = COLOR.White,
  title = "",
  BG = COLOR.ButtonGreenGradient,
  style,
  TextStyle = {},
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.9}
      style={[styles.body, style]}
    >
      <LinearGradient
        colors={disabled ? ["#00000050", "#00000030"] : BG}
        style={styles.gradient}
      >
        <Text style={[styles.Text, { color: color }, TextStyle]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  body: {
    height: 40,
    width: "100%",
    borderRadius: 5,
    overflow: "hidden",
    marginVertical: 8,
  },
  gradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  Text: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 22,
    color: COLOR.White,
    textAlign: "center",
  },
});
