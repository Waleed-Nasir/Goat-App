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
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLOR } from "../assets/colors";
import { Assets } from "../assets/images";
import Layout from "../Layout";
import Header from "./Header";
import MapView from "react-native-maps";
import BottleModal from "../components/BottleModal";
import Input from "../components/Input";
import { Button } from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { getOrderList, postClaimBottel } from "../store/slice/HomeSlices";
import AppMap from "./GoogleMap";
const { width } = Dimensions.get("screen");

const OderDetails = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [deliverymodalVisible, setdeliveryModalVisible] = useState(false);
  const [OrderConfirm, setOrderConfirm] = useState(false);
  const [OrderConfirmSure, setOrderConfirmSure] = useState(false);
  const [cashRecevied, setCashRecevied] = useState(0);
  const { OrderDetails } = useSelector((State) => State.Home);
  const { accessToken } = useSelector((STATE) => STATE.Auth);
  const [BottelCount, setBottelCount] = useState({
    "1 ltr Bottles": 0,
    "1/2 ltr Bottles": 0,
  });
  // const handleConfirm = () => {
  //     if (!OrderConfirmSure) {
  //         setOrderConfirmSure(true)
  //     } else if (OrderConfirm === false) {
  //         setOrderConfirmSure(false)
  //         setOrderConfirm(true)
  //         setTimeout(() => {
  //             setOrderConfirm(false)
  //             setModalVisible(false)
  //         }, 2000);
  //     } else {
  //         setModalVisible(false)
  //     }
  // }

  const CLAIM = {
    "Cash to be Collected": () => (
      <View style={styles.PriceTag}>
        <Text style={styles.PriceText}>
          Rs {OrderDetails.total + OrderDetails?.customer?.balanceAmount}
        </Text>
      </View>
    ),
    "Cash Recevied": () => (
      <View style={styles.PriceTag}>
        {OrderDetails.status !== "pending" ? (
          <Text style={styles.PriceText}>Rs {cashRecevied}</Text>
        ) : (
          <Input
            placeholder="Recevie Amount"
            InputProps={{
              value: cashRecevied,
              onChangeText: setCashRecevied,
            }}
          />
        )}
      </View>
    ),
    "1 ltr Bottles": (value) => (
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.BottleTag}
        disabled={OrderDetails.status !== "pending"}
      >
        <Text style={styles.BottleText}>{BottelCount["1 ltr Bottles"]}</Text>
        <Text style={styles.BottleText}>Claim</Text>
      </TouchableOpacity>
    ),
    "1/2 ltr Bottles": (value) => (
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.BottleTag}
        disabled={OrderDetails.status !== "pending"}
      >
        <Text style={styles.BottleText}>{BottelCount["1/2 ltr Bottles"]}</Text>
        <Text style={styles.BottleText}>Claim</Text>
      </TouchableOpacity>
    ),
  };

  const ClaimBottels = {
    claimedBottles: [
      {
        _id: OrderDetails?._id,
        type: "1-liter-bottle",
        quantity: BottelCount["1 ltr Bottles"],
      },
      {
        _id: OrderDetails?._id,
        type: "half-liter-bottle",
        quantity: BottelCount["1/2 ltr Bottles"],
      },
    ],
  };
  // const TYPE = ["pending", "completed", "cancelled"];

  console.log(OrderDetails);

  const value = {
    "Drop Off": OrderDetails?.address?.addressLine1,
    "Order #": OrderDetails?._id,
    Name: OrderDetails?.customer?.name,
    "Contact Number": OrderDetails?.customer?.phone,
    "Current Bill": OrderDetails.total,
    "Previous Balance": OrderDetails?.customer?.balanceAmount || "No",
    "Cash to be Collected": false,
    "Cash Recevied": OrderDetails?.cashRecevied || false,
    "Remaining Balance":
      OrderDetails?.customer?.balanceAmount +
      OrderDetails.total -
      (OrderDetails?.cashRecevied || cashRecevied),
    "1 ltr Bottles": false,
    "1/2 ltr Bottles": false,
    "Special Instructions": OrderDetails?.notes,
  };

  const getPostClaimBottel = () => {
    dispatch(postClaimBottel(ClaimBottels));
  };

  const HandleOrderConform = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      orderId: OrderDetails?._id,
      cashRecevied,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://api.goatpure.com/api/orders/mark-as-complete",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {})
      .catch((error) => console.log("error", error));
  };

  return (
    <Layout Header={() => <Header />}>
      <View style={styles.Main}>
        <Pressable
          style={styles.HeaderBack}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image source={Assets.Back} resizeMode={"cover"} />
          <View style={styles.ph_10}>
            <Text style={styles.HeaderText}>Order Details</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate(SCREENS.MapView, {
              area: {
                latitude: OrderDetails?.address?.latitude,
                longitude: OrderDetails?.address?.longitude,
              },
            });
          }}
          style={styles.detailsMap}
        >
          <AppMap
            area={{
              latitude: OrderDetails?.address?.latitude,
              longitude: OrderDetails?.address?.longitude,
            }}
          />
          {/* <Image source={Assets.MiniMap} resizeMode={"cover"} /> */}
        </Pressable>
        <View style={styles.MainView}>
          <View style={styles.OrderView}>
            <View style={[styles.ph_10]}>
              <Text style={[styles.TitleText, { textAlign: "center" }]}>
                Order status {OrderDetails.status}
              </Text>
              {OrderDetails.status === "cancelled" ? (
                <Text style={[styles.TitleText, { color: "red" }]}>
                  Order status {OrderDetails.cancelReason}
                </Text>
              ) : null}
            </View>

            {Object.keys(value).map((item) => (
              <View style={styles.Row}>
                <View style={styles.OrderInfo}>
                  <View style={styles.ph_10}>
                    <Text style={styles.TitleText}>{item}</Text>
                  </View>
                </View>
                <View style={styles.PriceInfo}>
                  {value[item] != false ? (
                    <Text style={styles.InfoText}>{value[item]}</Text>
                  ) : (
                    CLAIM[item] && CLAIM[item](100)
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
      <BottleModal
        modalVisible={modalVisible}
        HeaderText={
          OrderConfirm
            ? ""
            : "Please enter the empty bottles received from the customer"
        }
      >
        {OrderConfirm ? (
          <View style={styles.ph_10}>
            <Text style={styles.TitleText}>
              Please keep the bootles safe! The warehouse Manager will ask for
              the bottles?
            </Text>
          </View>
        ) : (
          <>
            <View style={[styles.Row, { marginBottom: 0 }]}>
              <View style={styles.OrderInfo}>
                <View style={styles.ph_10}>
                  <Text style={styles.TitleText}>1 ltr Bottles</Text>
                </View>
              </View>
              <View style={styles.PriceInfo}>
                <Input
                  InputProps={{
                    value: BottelCount["1 ltr Bottles"],
                    placeholder: "0",
                    onChangeText: (value) =>
                      setBottelCount((pre) => ({
                        ...pre,
                        "1 ltr Bottles": value,
                      })),
                    keyboardType: "numeric",
                  }}
                  ExtraStyle={{ width: 80 }}
                />
              </View>
            </View>
            <View style={[styles.Row, { marginTop: 0 }]}>
              <View style={styles.OrderInfo}>
                <View style={styles.ph_10}>
                  <Text style={styles.TitleText}>1/2 ltr Bottles</Text>
                </View>
              </View>
              <View style={styles.PriceInfo}>
                <Input
                  InputProps={{
                    value: BottelCount["1/2 ltr Bottles"],
                    placeholder: "0",
                    onChangeText: (value) =>
                      setBottelCount((pre) => ({
                        ...pre,
                        "1/2 ltr Bottles": value,
                      })),
                    keyboardType: "numeric",
                  }}
                  ExtraStyle={{ width: 80 }}
                />
              </View>
            </View>
          </>
        )}
        {!OrderConfirm && (
          <Button
            title="Click To Confirm"
            onPress={() => {
              getPostClaimBottel();
              setOrderConfirm(true);
              setTimeout(() => {
                setOrderConfirm(false);
                setModalVisible(false);
              }, 2000);
            }}
          />
        )}
        <Button
          BG={[COLOR.DarkGreen, COLOR.DarkGreen]}
          title="Cancel"
          onPress={() => {
            setOrderConfirm(false);
            setModalVisible(false);
          }}
        />
      </BottleModal>
      {OrderDetails.status === "pending" ? (
        <View style={[styles.MainView, { paddingTop: 0 }]}>
          <Button
            title="DELIVERED"
            onPress={() => setdeliveryModalVisible(true)}
          />
          <Button
            title="Get Help With Order"
            onPress={() => {
              navigation.navigate(SCREENS.Reason, {
                orderId: OrderDetails._id,
              });
            }}
          />
          <Button
            style={{ borderRadius: 0 }}
            BG={[COLOR.Red, COLOR.Red]}
            title="NOT DELIVERED"
            onPress={() => {
              navigation.navigate(SCREENS.Reason, {
                orderId: OrderDetails._id,
              });
            }}
          />
        </View>
      ) : null}
      <BottleModal
        modalVisible={deliverymodalVisible}
        HeaderText={
          OrderConfirmSure ? "Order Delivery is Confirmed" : "Are you Sure?"
        }
      >
        {OrderConfirmSure ? (
          <Image source={Assets.Done} style={{ marginTop: 20 }} />
        ) : (
          <>
            <View style={[styles.Row, { marginVertical: 30 }]}>
              <Text style={styles.TitleText}>
                Please confirm if the order has been delivered
              </Text>
            </View>
            <View style={[styles.Row, { marginTop: 0 }]}>
              <View style={[styles.OrderInfo, { marginHorizontal: 3 }]}>
                <Button
                  BG={[COLOR.DarkGreen, COLOR.DarkGreen]}
                  title="Cancel"
                  onPress={() => {
                    setOrderConfirmSure(false);
                    setdeliveryModalVisible(false);
                  }}
                />
              </View>
              <View style={[styles.PriceInfo, { marginHorizontal: 3 }]}>
                <Button
                  title="CONFIRM"
                  onPress={() => {
                    HandleOrderConform();
                    setOrderConfirmSure(true);
                    setTimeout(() => {
                      setOrderConfirmSure(false);
                      setdeliveryModalVisible(false);
                      dispatch(getOrderList());
                      navigation.goBack();
                    }, 2000);
                  }}
                />
              </View>
            </View>
          </>
        )}
      </BottleModal>
    </Layout>
  );
};

const styles = StyleSheet.create({
  Main: {
    width: "100%",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: COLOR.White,
  },
  MainView: {
    padding: 26,
  },
  Row: {
    flexDirection: "row",
    marginVertical: 10,
  },
  OrderView: {
    marginVertical: 22,
    // flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: COLOR.ButtonGreen,
    borderRadius: 6,
  },
  OrderInfo: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  TitleText: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 22,
    color: COLOR.GrayText,
    textAlign: "left",
  },
  InfoText: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 22,
    color: COLOR.GrayText,
    textAlign: "right",
  },
  ph_10: {
    paddingHorizontal: 10,
  },
  PriceInfo: {
    width: "50%",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  PriceTag: {
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  PriceText: {
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 14,
    color: COLOR.White,
    textAlign: "center",
    backgroundColor: COLOR.DarkGreen,
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
  BottleTag: {
    maxWidth: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  BottleText: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 14,
    color: COLOR.White,
    textAlign: "center",
    backgroundColor: COLOR.DarkGreen,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginLeft: 20,
  },
  detailsMap: {
    width: width,
    height: width - 130,
  },
  HeaderBack: {
    width: "100%",
    // height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
  },
  HeaderText: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 20,
    lineHeight: 28,
    color: COLOR.DarkGreen,
    textAlign: "right",
  },
});

export default OderDetails;
