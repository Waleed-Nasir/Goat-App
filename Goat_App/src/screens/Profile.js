/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { COLOR } from "../assets/colors";
import { Assets } from "../assets/images";
import { Button } from "../components/Button";
import Input from "../components/Input";
import OrderItem from "../components/OrderItem";
import Layout from "../Layout";
import {
  getUpdateUserDetails,
  updateUserPassword,
} from "../Store/slice/UserSlices";
import { MessageShow, Validator } from "../utils/Constant";
import Header from "./Header";
const { width } = Dimensions.get("screen");

const Profile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { USER_DATA } = useSelector((state) => state.User);
  const [USER, setUSER] = useState({
    name: USER_DATA.name,
    phone: USER_DATA.phone,
  });

  const [params, setParams] = useState({
    currentPassword: "",
    changePassword: "",
    confirmChangePassword: "",
  });

  const handleUpdate = () => {
    let params = {
      name: USER.name,
      phone: USER.phone,
    };
    let Vali = Validator(params);
    if (Vali) {
      dispatch(getUpdateUserDetails({ ...params, user_id: USER_DATA?._id }));
    }
  };

  const handleReset = () => {
    let Vali = Validator({
      CurrentPassword: params.currentPassword,
      NewPassword: params.changePassword,
      ReEnterPassword: params.confirmChangePassword,
    });
    if (Vali) {
      if (params.changePassword === params.confirmChangePassword) {
        dispatch(updateUserPassword(params));
      } else {
        MessageShow("error", "Password not match");
      }
    }
  };

  return (
    <Layout Header={() => <Header showSlider={false} />}>
      {/* <View style={[styles.Row, styles.MT_40, styles.padding20]}>
        <Text style={styles.HeadingText}>Settings</Text>
      </View>
      <View style={styles.padding20}>
        <Input
          placeholder="Email"
          InputProps={{ editable: false, value: USER_DATA.email }}
        />
        <Input
          placeholder="Name"
          InputProps={{ editable: true, value: USER.name }}
        />
        <Input
          placeholder="Phone"
          InputProps={{ editable: true, value: USER.phone }}
        />
        <View style={[styles.Row]}>
          <Button
            title="Update"
            onPress={() => {
              handleUpdate();
            }}
          />
        </View>
      </View> */}
      <View style={[styles.Row, styles.MT_40, styles.padding20]}>
        <Text style={styles.HeadingText}>Change Password</Text>
      </View>
      <View style={styles.padding20}>
        <Input
          placeholder="Current Password"
          InputProps={{
            onChangeText: (text) =>
              setParams({ ...params, currentPassword: text }),
            value: params.currentPassword,
          }}
        />
        <Input
          placeholder="New Password"
          InputProps={{
            onChangeText: (text) =>
              setParams({ ...params, changePassword: text }),
            value: params.changePassword,
          }}
        />
        <Input
          placeholder="Re-Enter New Password"
          InputProps={{
            onChangeText: (text) =>
              setParams({ ...params, confirmChangePassword: text }),
            value: params.confirmChangePassword,
          }}
        />
      </View>
      <View style={[styles.padding20]}>
        <Button
          title="Update"
          onPress={() => {
            handleReset();
          }}
        />
        {/* <Button
          BG={[COLOR.Red, COLOR.Red]}
          title="Logout Account"
          onPress={() => {
            navigation.goBack();
          }}
        /> */}
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
  HeadingText: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 20,
    color: COLOR.DarkGreen,
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  padding20: {
    paddingHorizontal: 30,
    width: "100%",
  },
  MT_40: {
    marginTop: 20,
  },
  MB_10: {
    marginBottom: 10,
  },

  MainText: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 24,
    color: COLOR.GrayText,
    marginHorizontal: 10,
    textAlign: "center",
  },
  divider: {
    width: "100%",
    height: 2,
    backgroundColor: COLOR.GrayBox,
    marginVertical: 20,
  },
  Row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  RowItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  Cart: {
    borderRadius: 10,
    backgroundColor: COLOR.ButtonGreen,
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 10,
  },
  IconButton: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
  },
  centerText: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 28,
    color: COLOR.Black,
    lineHeight: 38,
    marginTop: 20,
  },
  Title: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 12,
    color: COLOR.Gray,
    lineHeight: 18,
  },
  MainTitle: {
    fontSize: 10,
    color: COLOR.GrayText,
    fontStyle: "normal",
    fontWeight: "300",
  },
  GreenRowBack: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLOR.DarkGreen,
    padding: 3,
  },
  RequiredText: {
    textAlign: "center",
    fontSize: 8,
    fontWeight: "600",
    color: COLOR.White,
  },
});

export default Profile;
