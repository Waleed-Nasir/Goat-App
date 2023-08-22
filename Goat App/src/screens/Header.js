/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SCREENS } from "../../App";
import { COLOR } from "../assets/colors";
import { Assets } from "../assets/images";
import Input from "../components/Input";
const { width } = Dimensions.get("screen");

const Header = ({
  showSlider = true,
  isButton = false,
  search = "",
  onPressSearch = () => {},
  onSearch = () => {},
  
}) => {
  const navigation = useNavigation();
  let VIEW = isButton ? TouchableOpacity : View;
  return (
    <View>
      <View style={styles.Header}>
        <View style={styles.Row}>
          <View style={styles.HeaderMean}>
            <Image source={Assets.LogoMini} />
            <Text style={styles.Title}>GOAT PURE</Text>
          </View>
          <Pressable
            style={{ height: 20, width: 20 }}
            onPress={() => {
              navigation.navigate(SCREENS.Wallet);
            }}
          >
            <Image source={Assets.Goat_Wallet} />
          </Pressable>
        </View>
        <VIEW onPress={onPressSearch} style={[styles.Row, { paddingTop: 10 }]}>
          <Input
            leftIcon={Assets.Goat_SearchIcon}
            placeholder="What are you looking for?"
            InputProps={{ value: search, onChangeText: onSearch }}
          />
        </VIEW>
      </View>
      <View style={styles.Offer}>
        <Text style={styles.OffterTitle}>
          Get 30% discount on your first ORDER
        </Text>
      </View>
      {showSlider ? (
        <TouchableOpacity style={styles.DairyProductsButton}>
          <ImageBackground
            style={styles.Banner}
            source={Assets.Goat_SignUp}
            resizeMode={"cover"}
          >
            <View style={styles.BannerAction}>
              <Text style={styles.BannerActionText1}>
                Nourish{"\n"}Yourself With{"\n"}Pure & Organic{"\n"}Goat
                Products
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  Header: {
    backgroundColor: COLOR.DarkGreen,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    padding: 20,
  },
  Row: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  Offer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: COLOR.FullGreen,
  },
  HeaderMean: {
    backgroundColor: COLOR.DarkGreen,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  OffterTitle: {
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 14,
    color: COLOR.White,
    paddingHorizontal: 15,
  },
  Title: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 22,
    lineHeight: 33,
    color: COLOR.White,
    paddingHorizontal: 15,
  },
  DairyProductsButton: {
    width: "100%",
    height: width / 2.1,
    top: -3,
  },
  Banner: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  BannerAction: {
    paddingLeft: 40,
    width: "100%",
  },
  BannerActionText1: {
    fontSize: 20,
    fontWeight: "600",
    color: COLOR.White,
    lineHeight: 24,
  },
});

export default Header;
