/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { COLOR } from "../assets/colors";
import { Assets } from "../assets/images";
import { Button } from "../components/Button";
import Input from "../components/Input";
import Layout from "../Layout";
import { addLocalAddress } from "../Store/slice/UserLocal";
import { Validator } from "../utils/Constant";
import Header from "./Header";
const { width } = Dimensions.get("screen");

const OPS = [
  "Cash On Delivery",
  "Jazzcash",
  "Easypaisa",
  "Visa OR Master Card",
];

const AddanEditAddress = () => {
  const dispatch = useDispatch();
  const [AddressFor, setAddressFor] = useState(0);
  const [SHOW, setSHOW] = useState(0);
  const navigation = useNavigation();
  const { params } = useRoute();
  const [address, setAddress] = useState({
    Street: "",
    House: "",
    Nearest: "",
    City: "",
    Tag: "",
    id: Math.random(),
  });

  const { LocalAddress } = useSelector((STATE) => STATE.UserLocal);

  useEffect(() => {
    if (params?.addressEdit) {
      setAddress(params?.addressEdit);
    } else {
      setAddress({
        Street: "",
        House: "",
        Nearest: "",
        City: "",
        Tag: "",
        id: Math.random(),
      });
    }
  }, [params]);

  const handleAddress = () => {
    const isValid = Validator(address);
    if (isValid) {
      if (params?.addressEdit) {
        dispatch(
          addLocalAddress(
            LocalAddress.map((item) =>
              item?.id === address?.id
                ? { ...address, selected: true }
                : { ...item, selected: false }
            )
          )
        );
      } else {
        dispatch(addLocalAddress([...LocalAddress, address]));
      }
      navigation.goBack();
    }
  };

  return (
    <Layout
      Footer={() => (
        <View style={styles.padding20}>
          <View style={[styles.Row]}>
            <Button
              BG={[COLOR.DarkGreen, COLOR.DarkGreen]}
              style={{ width: "48%" }}
              title="Cancel"
              onPress={() => {
                navigation.goBack();
              }}
            />
            <Button
              style={{ width: "48%", marginLeft: "4%" }}
              title="Confirm"
              onPress={handleAddress}
            />
          </View>
        </View>
      )}
      Header={() => <Header showSlider={false} />}
    >
      <View style={styles.padding20}>
        <View style={[styles.Row, styles.MT_40]}>
          <Text style={styles.HeadingText}>
            {/* {AddressFor === 0 ? "SELECT ADDRESS" : "EDIT ADDRESS"} */}
            EDIT ADDRESS
          </Text>
        </View>
      </View>

      <View style={styles.padding20}>
        <Input
          InputProps={{
            value: address.Street,
            onChangeText: (e) => {
              setAddress({ ...address, Street: e });
            },
          }}
          placeholder="Street Address"
        />
        <Input
          InputProps={{
            value: address.House,
            onChangeText: (e) => {
              setAddress({ ...address, House: e });
            },
          }}
          placeholder="House/Unit #"
        />
        <Input
          InputProps={{
            value: address.Nearest,
            onChangeText: (e) => {
              setAddress({ ...address, Nearest: e });
            },
          }}
          placeholder="Nearest Landmark"
        />
        <Input
          InputProps={{
            value: address.City,
            onChangeText: (e) => {
              setAddress({ ...address, City: e });
            },
          }}
          placeholder="City"
        />
        {/* <Input
          placeholder="Notes To Rider......"
          InputProps={{ numberOfLines: 5, multiline: true }}
          InputStyle={{ height: 80 }}
        /> */}

        <View style={[styles.Row, styles.MT_40, styles.MB_10]}>
          <Image source={Assets.Goat_AddTag} />
          <Text style={styles.MainText}>Add a label</Text>
        </View>
        <View style={[styles.Row, styles.MB_10]}>
          <Pressable
            onPress={() => {
              setAddress({ ...address, Tag: "Home" });
            }}
          >
            <Image
              source={Assets.Goat_CircleHome}
              style={[
                styles.IconButton,
                address?.Tag === "Home"
                  ? {
                      borderColor: "#0A9444",
                      borderWidth: 3,
                      borderRadius: 1000,
                    }
                  : {},
              ]}
            />
          </Pressable>
          <Pressable
            onPress={() => {
              setAddress({ ...address, Tag: "Office" });
            }}
          >
            <Image
              source={Assets.Goat_CircleJob}
              style={[
                styles.IconButton,
                address?.Tag === "Office"
                  ? {
                      borderColor: "#0A9444",
                      borderWidth: 3,
                      borderRadius: 1000,
                    }
                  : {},
              ]}
            />
          </Pressable>
          {/* <Image source={Assets.Goat_CirclePlus} style={styles.IconButton} /> */}
        </View>
        <View style={{ height: 100 }} />
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
    fontWeight: "400",
    fontSize: 16,
    color: COLOR.DarkGreen,
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  padding20: {
    paddingHorizontal: 30,
    width: "100%",
  },
  MT_40: {
    marginTop: 40,
  },
  MB_10: {
    marginBottom: 10,
  },

  MainText: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 24,
    color: COLOR.Black,
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
    justifyContent: "flex-start",
    padding: 6,
  },
  IconButton: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
});

export default AddanEditAddress;
