/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { COLOR } from "../assets/colors";
import { Assets } from "../assets/images";
import { Button } from "../components/Button";
import Layout from "../Layout";
import { getOrders } from "../Store/slice/HomeSlices";
import Header from "./Header";
const { width } = Dimensions.get("screen");

const ManageOrders = () => {
  const [CurrentIndex, setCurrentIndex] = useState(0);
  // isRepeated
  let DAYS = ["SUN, ", "MON, ", "TUE, ", "WED, ", "THU, ", "FRI, ", "SAT, "];
  const { OrderList } = useSelector((STATE) => STATE.Home);
  const { accessToken } = useSelector((STATE) => STATE.Auth);
  const handleOrder = ({ id, type }) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", accessToken);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      orderId: id,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    // resume-recurring
    fetch(`https://api.goatpure.com/api/orders/${type}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        dispatch(getOrders());
      })
      .catch((error) => console.log("error", error));
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return (
    <Layout Header={() => <Header showSlider={false} />}>
      <View style={[styles.Row, styles.MT_40, styles.padding20]}>
        <Text style={styles.HeadingText}>Active</Text>
      </View>
      {OrderList?.filter((item) => item?.isRepeated).map((Item) => (
        <View style={styles.padding20}>
          <View style={styles.Cart}>
            <View style={[styles.RowItem]}>
              {/* <Image
                source={Assets.Goat_Milk}
                style={{ width: 70, height: 70, backgroundColor: COLOR.White }}
                borderRadius={8}
                resizeMode={"contain"}
              /> */}
              <View
                style={{ flex: 1, paddingHorizontal: 10, paddingBottom: 10 }}
              >
                <Text style={styles.centerText}>
                  Delivery {Item?.deliverySlot}
                </Text>
                {/* <Text style={[styles.MainTitle]}>1 ltr</Text> */}
                <View style={[styles.Row]}>
                  <Text style={[styles.Title, { width: "40%" }]}>
                    Payment Method
                  </Text>
                  <Text
                    style={[
                      styles.Title,
                      { flex: 0.6, color: COLOR.DarkGreen },
                    ]}
                  >
                    {Item?.paymentMethod}
                  </Text>
                </View>
                <View style={[styles.Row]}>
                  <Text style={[styles.Title, { width: "40%" }]}>Total</Text>
                  <Text
                    style={[
                      styles.Title,
                      { flex: 0.6, color: COLOR.DarkGreen },
                    ]}
                  >
                    {Item?.total}
                  </Text>
                </View>
                <View style={[styles.Row]}>
                  <Text style={[styles.Title, { width: "40%" }]}>
                    Frequency
                  </Text>
                  <Text
                    style={[
                      styles.Title,
                      { flex: 0.6, color: COLOR.DarkGreen },
                    ]}
                  >
                    {Item?.repeatsOn?.frequency}
                  </Text>
                </View>
                <View style={[styles.Row]}>
                  <Text style={[styles.Title, { width: "40%" }]}>Delivery</Text>
                  <Text
                    style={[
                      styles.Title,
                      { flex: 0.6, color: COLOR.DarkGreen },
                    ]}
                  >
                    {typeof Item?.repeatsOn?.duration === "number"
                      ? DAYS[Item?.repeatsOn?.duration]
                      : Item?.repeatsOn?.duration?.map((D) => DAYS[D])}
                  </Text>
                </View>
              </View>
            </View>
            <View style={[styles.Row]}>
              {Item?.repeatOrderPaused ? (
                <Button
                  style={{ flex: 1 }}
                  BG={[COLOR.DarkGreen, COLOR.FullGreen]}
                  title="Activate"
                  onPress={() => {
                    handleOrder({
                      id: Item._id,
                      type: "resume-recurring",
                    });
                  }}
                />
              ) : (
                <Button
                  style={{ flex: 1 }}
                  BG={[COLOR.FullGreen, COLOR.FullGreen]}
                  title="Deactivate"
                  onPress={() => {
                    handleOrder({
                      id: Item._id,
                      type: "pause-recurring",
                    });
                  }}
                />
              )}
            </View>
          </View>

          <View style={styles.MT_40} />
        </View>
      ))}
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
    fontWeight: "600",
    fontSize: 20,
    color: COLOR.DarkGreen,
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  padding20: {
    paddingHorizontal: 20,
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
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 24,
    color: COLOR.GrayText,
    marginHorizontal: 10,
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
    paddingVertical: 30,
    paddingBottom: 10,
  },
  IconButton: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
  },
  centerText: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 16,
    color: COLOR.GrayText,
  },
  ImageIND: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  Title: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 12,
    color: COLOR.Black,
    lineHeight: 18,
  },
  MainTitle: {
    fontSize: 10,
    color: COLOR.GrayText,
    fontStyle: "normal",
    fontWeight: "600",
  },
});

export default ManageOrders;

const data = [
  {
    title: "Manage Schedule",
    subText: "Edit or Delete milk scheduling",
    icon: Assets.Goat_SettingOrder,
  },
  {
    title: "My Orders",
    subText: "Previous order history",
    icon: Assets.Goat_SettingOrder,
  },
  {
    title: "Shipping Addresses",
    subText: "Add or edit your addresses",
    icon: Assets.Goat_SettingMap,
    stylesList: { backgroundColor: COLOR.DarkGreen + 55 },
    stylesFont: { color: COLOR.White },
  },
  {
    title: "Wallet & Payment ",
    subText: "Manage your wallet & payment methods",
    icon: Assets.Goat_SettingGear,
  },
  {
    title: "ManageOrders",
    subText: "Notifications, Passwords, etc.",
    icon: Assets.Goat_SettingGear,
  },
  {
    title: "Favourites",
    subText: "Manage your favourite products",
    icon: Assets.Goat_SettingGear,
  },
];
