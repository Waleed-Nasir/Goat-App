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
  Image,
  ImageBackground,
  StyleSheet,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SCREENS } from "../../App";
import { COLOR } from "../assets/colors";
import { FONTFAMILY } from "../assets/fonts";
import { Assets } from "../assets/images";
import { Button } from "../components/Button";
import Input from "../components/Input";
import Layout from "../Layout";
import { register } from "../Store/slice/AuthSlicer";
import { Validator } from "../utils/Constant";
const { width } = Dimensions.get("screen");

const SingUp = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState(__DEV__ ? "Test@User.com" : "");
  const [password, setpassword] = useState(__DEV__ ? "12345678" : "");
  const [ConfirmPassword, setConfirmPassword] = useState(
    __DEV__ ? "12345678" : ""
  );
  const [name, setname] = useState(__DEV__ ? "Test User" : "");
  const [phone, setphone] = useState(__DEV__ ? "+9231234354" : "");
  const [ShowPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const AccessToken = useSelector((state) => state.Auth.accessToken);

  const SignUp = () => {
    let params = { name, email, password, phone };
    const isValid = Validator(params);
    if (isValid) {
      if (ConfirmPassword === password) {
        dispatch(register(params));
      } else {
        MessageShow("error", `Password doesn't match`);
      }
      //  navigation.replace(SCREENS.Home)
    }
  };

  useEffect(() => {
    if (AccessToken) {
      navigation.reset({
        index: 0,
        routes: [{ name: SCREENS.Home }],
      });
    }
  }, [AccessToken]);

  return (
    <View style={styles.SingUp}>
      <Image
        source={Assets.SignUpTopBG}
        resizeMode={"stretch"}
        style={styles.Top}
      />
      <View style={styles.Main}>
        <Text style={styles.Heading}>Register</Text>

        <KeyboardAvoidingView
          style={{
            flex: 1,
            width: "100%",
            flexDirection: "column",
            justifyContent: "center",
          }}
          behavior="padding"
          enabled
          keyboardVerticalOffset={100}
        >
          <ScrollView showsHorizontalScrollIndicator={false}>
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.SubText}>Please Enter Your Information</Text>
              <Input
                SectionStyle={{ marginTop: 8 }}
                InputProps={{
                  value: name,
                  placeholder: "Full Name",
                  onChangeText: setname,
                }}
              />
              <Input
                SectionStyle={{ marginTop: 8 }}
                InputProps={{
                  value: email,
                  placeholder: "Example@mail.com",
                  onChangeText: setEmail,
                }}
              />
              <Input
                SectionStyle={{ marginTop: 8 }}
                placeholder="Password"
                rightIcon={ShowPassword ? Assets.EyeGray : Assets.EyeSlashGray}
                IconPress={() => {
                  setShowPassword(!ShowPassword);
                }}
                InputProps={{
                  value: password,
                  secureTextEntry: !ShowPassword,
                  onChangeText: setpassword,
                }}
              />
              <Input
                SectionStyle={{ marginTop: 8 }}
                placeholder="Confirm Password"
                rightIcon={ShowPassword ? Assets.EyeGray : Assets.EyeSlashGray}
                IconPress={() => {
                  setShowPassword(!ShowPassword);
                }}
                InputProps={{
                  value: ConfirmPassword,
                  secureTextEntry: !ShowPassword,
                  onChangeText: setConfirmPassword,
                }}
              />
              <Input
                SectionStyle={{ marginTop: 8 }}
                InputProps={{
                  value: phone,
                  placeholder: "+123456789",
                  onChangeText: setphone,
                  keyboardType: "name-phone-pad",
                }}
              />
              <View style={styles.Extra} />
              <Button title="Create Account" onPress={SignUp} />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>

      <View style={styles.Bottom}>
        <Text style={styles.MiniText}>
          By creating your account, you agree to Goat Pure{" "}
          <Text style={styles.CL_Green}>Privacy Policy</Text> and{" "}
          <Text style={styles.CL_Green}>Terms of Use. </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  SingUp: {
    flex: 1,
    backgroundColor: COLOR.White,
    width: "100%",
  },
  Top: {
    flex: 0.2,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: COLOR.White,
    width: "100%",
  },
  Main: {
    flex: 0.7,
    width: "100%",
    backgroundColor: COLOR.White,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 36,
    paddingTop: 20,
  },
  Heading: {
    // fontFamily: FONTFAMILY.ManropeMedium,
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 48,
    lineHeight: 66,
    color: COLOR.DarkGreen,
    paddingBottom: 8,
  },
  SubText: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 22,
    color: COLOR.TextGreen,
    textAlign: "center",
    paddingBottom: 16,
  },
  Message: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  Extra: {
    paddingVertical: 20,
  },
  Bottom: {
    flex: 0.1,
    width: "100%",
    paddingHorizontal: 36,
    backgroundColor: COLOR.White,
  },
  MiniText: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 19,
    color: COLOR.GrayText,
    textAlign: "center",
    paddingBottom: 26,
    flex: 1,
  },
  CL_Green: {
    color: COLOR.DarkGreen,
  },
});

export default SingUp;
