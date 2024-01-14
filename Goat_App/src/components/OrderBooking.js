/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from "react";
import { useEffect } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { COLOR } from "../assets/colors";
import { Assets } from "../assets/images";
import SelectAddress from "../screens/SelectAddress";
import Input from "./Input";
const { width } = Dimensions.get("screen");
import DatePicker from "react-native-date-picker";
import moment from "moment";
import { useSelector } from "react-redux";
const OrderBooking = ({
  quantity = 3,
  id,
  addressId,

  CallBack = () => {},
}) => {
  const [SelectDays, setSelectDays] = useState([0]);
  const [SingleDays, setSingleDays] = useState(0);
  const [ForOrder, setForOrder] = useState("Day");
  const [RepeatedOrder, setRepeatedOrder] = useState(0);
  const [Count, setCount] = useState(1);
  const [ShowSelection, setShowSelection] = useState(0);
  const [duration, setDuration] = useState(1);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const { LocalAddress, OneClickBuy } = useSelector((STATE) => STATE.UserLocal);
  let ADDRESS = LocalAddress?.filter((item) => item?.selected)[0];
  const { latitude = "", longitude = "" } = ADDRESS || {
    latitude: "",
    longitude: "",
  };
  useEffect(() => {
    setCount(1);
  }, []);

  useEffect(() => {
    const data =
      SingleDays === 0
        ? {
            claimedBottles: [],
            items: [
              {
                id: id,
                quantity: Count,
              },
            ],
            addressId: addressId,
            paymentMethod: "COD",
            deliverySlot: "evening",
            repeatFrequency: "days",
          }
        : ForOrder === "Day"
        ? {
            isRepeated: true,
            duration: duration,
            repeatFrequency: "days",
            endDate: date,
            claimedBottles: [],
            items: [
              {
                id: id,
                quantity: Count,
              },
            ],
            latitude,
            longitude,
            paymentMethod: "COD",
            deliverySlot: "morning",
          }
        : {
            isRepeated: true,
            duration: SelectDays,
            repeatFrequency: "weeks",
            endDate: date,
            claimedBottles: [],
            items: [
              {
                id: id,
                quantity: Count,
              },
            ],
            latitude,
            longitude,
            paymentMethod: "COD",
            deliverySlot: "morning",
          };

    CallBack(data);
  }, [
    SelectDays,
    SingleDays,
    ForOrder,
    RepeatedOrder,
    Count,
    ShowSelection,
    id,
  ]);

  return (
    <View style={styles.ActionView}>
      <View style={styles.ROW}>
        <Text style={styles.HeadingOption}>Select quantity</Text>
        <View style={styles.AddOption}>
          <Text
            style={styles.CounterKeys}
            onPress={() => setCount(Count > 1 ? Count - 1 : Count)}
          >
            -
          </Text>
          <Text style={[styles.CounterKeys, { fontSize: 14 }]}>{Count}</Text>
          <Text
            style={styles.CounterKeys}
            onPress={() => setCount(Count < quantity ? Count + 1 : Count)}
          >
            +
          </Text>
        </View>
      </View>
      <View style={styles.ROW}>
        <Text style={styles.HeadingOption}>Select order type</Text>
        <View style={styles.GreenRowBack}>
          <Text style={styles.RequiredText}>1 Required</Text>
        </View>
      </View>
      {/* /// */}
      <TouchableOpacity
        onPress={() => setSingleDays(0)}
        style={styles.OrderView}
      >
        <View style={styles.RING}>
          {SingleDays === 0 ? <View style={styles.checked} /> : null}
        </View>
        <View style={styles.OrderInfo}>
          <View style={styles.ph_10}>
            <Text style={styles.OrderText}>Single OR one time order</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setSingleDays(1)}
        style={styles.OrderView}
      >
        <View style={styles.RING}>
          {SingleDays === 1 ? <View style={styles.checked} /> : null}
        </View>
        <View style={styles.OrderInfo}>
          <View style={styles.ph_10}>
            <Text style={styles.OrderText}>Repeated OR Scheduled order</Text>
          </View>
        </View>
      </TouchableOpacity>
      {/* /// */}
      {SingleDays === 1 ? (
        <>
          <View style={styles.ROW}>
            <Text style={styles.HeadingOption}>Repeats Every</Text>
            <View style={styles.GreenRowBack}>
              <Text style={styles.RequiredText}>1 Required</Text>
            </View>
          </View>
          <View style={styles.OrderInfo}>
            <Input
              ExtraStyle={{ width: 80, marginRight: 10 }}
              InputStyle={{ textAlign: "center" }}
              placeholder={"1"}
              onChangeText={setDuration}
              value={duration}
            />
            <Pressable
              onPress={() => {
                setShowSelection(1);
              }}
              style={styles.BoxDays}
            >
              <Text style={styles.forDays}>{ForOrder}</Text>
              <Image
                source={Assets.Goat_DateSelectDownArrow}
                style={{ marginLeft: 10 }}
              />
              {ShowSelection === 1 ? (
                <View style={styles.Drop}>
                  <Pressable
                    onPress={() => {
                      setForOrder("Day");
                      setShowSelection(0);
                    }}
                    style={[styles.BoxDays]}
                  >
                    <Text style={styles.forDays}>Day</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setForOrder("Week");
                      setShowSelection(0);
                    }}
                    style={[styles.BoxDays]}
                  >
                    <Text style={styles.forDays}>Week</Text>
                  </Pressable>
                </View>
              ) : null}
            </Pressable>
          </View>
          {/* ----- */}
          {ForOrder === "Day" ? null : (
            <>
              <Text style={styles.HeadingOption}>Repeats on</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.OrderInfo}
              >
                <>
                  {["S", "M", "T", "W", "T", "F", "S"].map((item, index) => {
                    if (SelectDays.includes(index)) {
                      return (
                        <Pressable
                          onPress={() => {
                            setSelectDays(
                              SelectDays.filter((_I) => _I !== index)
                            );
                          }}
                          style={[styles.DateROW, styles.BG_Green]}
                        >
                          <Text style={[styles.FilerText, styles.Font_Whit]}>
                            {item}
                          </Text>
                        </Pressable>
                      );
                    } else {
                      return (
                        <Pressable
                          onPress={() => {
                            setSelectDays([...SelectDays, index]);
                          }}
                          style={[styles.DateROW]}
                        >
                          <Text style={styles.FilerText}>{item}</Text>
                        </Pressable>
                      );
                    }
                  })}
                </>
              </ScrollView>
            </>
          )}
          <Text style={styles.HeadingOption}>Ends</Text>
          <TouchableOpacity
            onPress={() => {
              setRepeatedOrder(0);
            }}
            style={styles.OrderView}
          >
            <View style={styles.RING}>
              {RepeatedOrder === 0 ? <View style={styles.checked} /> : null}
            </View>
            <View style={styles.OrderInfo}>
              <View style={styles.ph_10}>
                <Text style={styles.FilerText}>Never</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setRepeatedOrder(1);
              setOpen(true);
            }}
            style={styles.OrderView}
          >
            <View style={styles.RING}>
              {RepeatedOrder === 1 ? <View style={styles.checked} /> : null}
            </View>
            <View style={styles.OrderInfo}>
              <View style={styles.ph_10}>
                <Text style={styles.FilerText}>
                  {moment(date).format("MMM DD,YY")}
                </Text>
              </View>
            </View>
            <DatePicker
              modal
              open={open}
              date={date}
              mode={"date"}
              onConfirm={(date) => {
                setOpen(false);
                setDate(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </TouchableOpacity>
        </>
      ) : null}
      {/* <View style={[styles.DateROW]}>
        <Pressable style={styles.RowItem}>
          <Image source={Assets.Goat_Calendar} />
          <Text style={styles.FilerText}>Date</Text>
        </Pressable>
        <View style={styles.divider} />

        <Pressable style={styles.RowItem}>
          <Text style={styles.FilerText}>Month</Text>
        </Pressable>
        <View style={styles.divider} />
        <Pressable style={styles.RowItem}>
          <Text style={styles.FilerText}>Year</Text>
        </Pressable>
      </View> */}
      <Text style={styles.HeadingOption}>Special Instruction (Optional)</Text>
      {/* <Text style={[styles.DetailsText, { color: COLOR.GrayText }]}>
      
      </Text> */}
      <TextInput
        placeholder="Product details will be written here for the customers to understand the
        product better."
        style={[
          styles.DetailsText,
          { color: COLOR.GrayText, width: "80%", height: 70 },
        ]}
        numberOfLines={3}
      />
      <View style={styles.border} />
    </View>
  );
};

const styles = StyleSheet.create({
  ROW: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  DetailsText: {
    fontWeight: "400",
    fontSize: 12,
    color: "#000",
    marginVertical: 15,
    lineHeight: 18,
  },
  OrderView: {
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  OrderInfo: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    zIndex: 10,
  },
  OrderText: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 10,
    lineHeight: 22,
    color: COLOR.Black,
  },
  ph_10: {
    paddingHorizontal: 10,
  },
  RING: {
    width: 16,
    height: 16,
    backgroundColor: COLOR.White,
    padding: 1,
    borderRadius: 100,
    borderColor: COLOR.DarkGreen,
    borderWidth: 1,
  },
  checked: {
    width: "100%",
    height: "100%",
    backgroundColor: COLOR.DarkGreen,
    borderRadius: 100,
  },
  FilerText: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 16,
    color: COLOR.Black,
    textAlign: "center",
    width: "100%",
  },
  RowItem: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: COLOR.DarkGreen,
    marginHorizontal: 8,
  },
  DateROW: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    borderColor: COLOR.DarkGreen,
    borderWidth: 1,
    borderRadius: 100,
    marginRight: 4,
  },
  BG_Green: {
    backgroundColor: COLOR.DarkGreen,
  },
  Font_Whit: {
    color: COLOR.White,
  },
  border: {
    width: "100%",
    height: 1,
    backgroundColor: COLOR.Black,
  },
  HeadingOption: {
    fontWeight: "400",
    fontSize: 16,
    color: COLOR.Black,
    marginVertical: 15,
    lineHeight: 24,
  },
  AddOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 90,
    height: 25,
    backgroundColor: COLOR.DarkGreen,
  },
  CounterKeys: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "400",
    color: COLOR.White,
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
    fontSize: 9,
    fontWeight: "700",
    color: COLOR.White,
  },
  forDays: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "800",
    color: COLOR.White,
  },
  BoxDays: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 110,
    height: 42,
    backgroundColor: COLOR.DarkGreen,
    borderRadius: 8,
  },
  ActionView: {
    width: "100%",
  },
  Drop: {
    position: "absolute",
    width: 110,
    backgroundColor: COLOR.DarkGreen,
    right: 0,
    top: 40,
    zIndex: 100000,
    overflow: "hidden",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
});

export default OrderBooking;
