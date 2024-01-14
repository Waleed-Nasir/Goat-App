/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { useSelector } from "react-redux";
import { SCREENS } from "../../App";
import { COLOR } from "../assets/colors";
import { Assets } from "../assets/images";
const { width } = Dimensions.get("screen");

const Splash = () => {
  const navigation = useNavigation();
  const AccessToken = useSelector((state) => state.Auth.accessToken);

  useEffect(() => {
    setTimeout(() => {
      if (AccessToken) {
        navigation.reset({
          index: 0,
          routes: [{ name: SCREENS.Home }],
        });
      } else {
        navigation.replace(SCREENS.Welcome);
      }
    }, 3000);
  }, []);

  return (
    <View style={styles.Splash}>
      <ImageBackground
        source={Assets.BG}
        resizeMode={"stretch"}
        style={styles.Center}
      >
        <Image source={Assets.LogoSmall} style={styles.Logo} />
        <Text style={styles.LogoHeading}>GOAT PURE</Text>
        <Text style={styles.LogoSubText}>
          Nourish Yourself With Pure &{"\n"}Organic Goat Products
        </Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  Splash: {
    paddingVertical: 40,
  },
  Center: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  LogoHeading: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 25,
    color: COLOR.DarkGreen,
    paddingBottom: 8,
  },
  LogoSubText: {
    fontStyle: "normal",
    fontWeight: "300",
    fontSize: 15,
    color: COLOR.DarkGreen,
    textAlign: "center",
  },
  Logo: {
    marginBottom: 40,
  },
});

export default Splash;
