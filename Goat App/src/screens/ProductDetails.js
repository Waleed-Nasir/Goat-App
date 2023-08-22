/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
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
const { width } = Dimensions.get("screen");
import StarRating from "react-native-star-rating-widget";
import MainItem from "../components/MeanItem";
import Item from "../components/Item";
import CategoriesFor from "../components/CategoriesFor";
import { Button } from "../components/Button";
import Accordian from "../components/Accordian";
import OrderBooking from "../components/OrderBooking";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SCREENS } from "../../App";
import Reviews from "../components/Reviews";
import ReviewPager from "../components/ReviewPager";
import { useDispatch, useSelector } from "react-redux";
import { getPlaceOrder } from "../Store/slice/HomeSlices";
import {
  getOneClikedBuy,
  handleCartProduct,
  handleFavProduct,
} from "../Store/slice/UserLocal";
import { functionAdder, functionFinder } from "../utils/Constant";

const ProductDetails = () => {
  const navigation = useNavigation();
  const { ProductDetail = {} } = useSelector((STATE) => STATE.Home);
  const { product, productReviews } = ProductDetail;
  const [OrderData, setOrderData] = useState({});
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { CartProduct, FavProduct, LocalAddress } = useSelector(
    (STATE) => STATE.UserLocal
  );

  const like = FavProduct?.map((item) => item._id)?.includes(product?._id);

  useEffect(() => {
    if (LocalAddress && LocalAddress?.Street && OrderData) {
      setOrderData({
        ...OrderData,
        addressLine1:
          LocalAddress?.Street +
          " " +
          LocalAddress?.House +
          " " +
          LocalAddress?.Nearest +
          " " +
          LocalAddress?.City,
      });
    }
  }, []);

  console.log(ProductDetail);
  return (
    <Layout
      Header={() => <Header showSlider={false} />}
      Footer={() => (
        <View style={[styles.Row]}>
          <Pressable
            style={styles.button}
            onPress={() => {
              // navigation.navigate(SCREENS.YourCart);
              dispatch(
                handleCartProduct(
                  functionAdder(CartProduct, { ...product, OrderData })
                )
              );
            }}
          >
            <Text style={styles.ButtonText}>ADD TO CARD</Text>
          </Pressable>
          <Text style={styles.ButtonText}>|</Text>
          <Pressable
            style={styles.button}
            onPress={() => {
              dispatch(getOneClikedBuy({ ...product, OrderData }));
              navigation.navigate(SCREENS.CheckOut);
            }}
          >
            <Text style={styles.ButtonText}>1 Click Buy</Text>
          </Pressable>
        </View>
      )}
    >
      <View style={styles.Main}>
        <TouchableOpacity style={styles.ProductDetailsButton}>
          <Image
            style={styles.Banner}
            source={{ uri: product?.imageUrl }}
            resizeMode={"stretch"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Cross}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image source={Assets.Goat_CrossGreen} resizeMode={"stretch"} />
        </TouchableOpacity>
        <View style={styles.ViewArea}>
          <View style={styles.ROW}>
            <View>
              <Text style={styles.MainText}>{product?.name}</Text>
              <View style={[styles.ROW, { justifyContent: "flex-start" }]}>
                <StarRating
                  rating={product?.rating}
                  onChange={setRating}
                  starSize={16}
                  starStyle={{ marginHorizontal: -1 }}
                />
                <Text style={styles.RatingText}>{product?.rating}</Text>
              </View>
            </View>
            <View style={styles.Offer}>
              <View style={styles.ActionArea}>
                <Pressable
                  onPress={() => {
                    dispatch(
                      handleFavProduct(
                        functionFinder(FavProduct, { ...product, OrderData })
                      )
                    );
                  }}
                >
                  <Image
                    source={like ? Assets.Goat_FillHeart : Assets.Goat_Heart}
                    style={styles.ActionAreaButton}
                    resizeMode={"center"}
                  />
                </Pressable>
                <Pressable
                  onPress={() => {
                    dispatch(
                      handleCartProduct(
                        functionAdder(CartProduct, { ...product, ...OrderData })
                      )
                    );
                  }}
                >
                  <Image
                    source={Assets.Goat_AddToCard}
                    style={styles.ActionAreaButton}
                    resizeMode={"center"}
                  />
                </Pressable>
              </View>
            </View>
          </View>
          <Text style={styles.DetailsText}>{product?.description}</Text>
        </View>

        <View style={styles.ActionView}>
          <OrderBooking
            id={product?._id}
            quantity={product?.quantity}
            CallBack={setOrderData}
          />
        </View>
        <View style={styles.padding20}>
          {DD.map((items) => (
            <Accordian
              {...items}
              showGoat={false}
              style={{ paddingLeft: 0, paddingRight: 0 }}
              styleChild={{ padding: 0 }}
              BG={"white"}
              textStyle={styles.MainText}
            />
          ))}
        </View>
        <View style={styles.padding20}>
          <CategoriesFor
            title="Frequently Asked Questions"
            isImage={Assets.Goat_DownArrow}
          />
        </View>
        <View style={styles.padding20}>
          {data.map((items) => (
            <Accordian
              {...items}
              showGoat={false}
              style={{ paddingLeft: 0, paddingRight: 0 }}
              styleChild={{ padding: 0 }}
              BG={"white"}
            />
          ))}
        </View>
        <View style={styles.padding20}>
          <CategoriesFor title="Reviews" />
        </View>
        <ReviewPager
          title={`Showing 1-10 of ${productReviews?.length || 0} Reviews`}
        />
        <View style={styles.padding20}>
          {productReviews?.map((items) => (
            <Reviews {...items} />
          ))}
        </View>
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
  ProductDetailsButton: {
    width: "100%",
    height: width - 100,
    top: -3,
  },
  padding20: {
    paddingHorizontal: 30,
    paddingVertical: 2,
    width: "100%",
  },
  Banner: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
  },

  ViewArea: {
    flexDirection: "column",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 30,
    paddingBottom: 10,
  },
  ROW: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  MainText: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 20,
    lineHeight: 22,
    color: COLOR.DarkGreen,
    marginVertical: 3,
  },
  RatingText: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 10,
    color: "#000",
    marginHorizontal: 5,
  },
  DetailsText: {
    fontWeight: "400",
    fontSize: 12,
    color: "#000",
    marginVertical: 15,
    lineHeight: 18,
  },
  Offer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },

  ActionArea: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  ActionAreaButton: {
    width: 34,
    height: 34,
  },

  ActionView: {
    paddingHorizontal: 60,
    paddingVertical: 2,
    width: "100%",
  },
  MainText: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 20,
    lineHeight: 26,
    color: COLOR.DarkGreen,
  },
  Cross: {
    position: "absolute",
    left: 20,
    top: 16,
  },
  Row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLOR.DarkGreen,
  },
  button: {
    flex: 1,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  ButtonText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
    color: COLOR.White,
  },
});

const DD = [
  {
    title: "Description",
    details: ` Revolution® (Selamectin) is a safe and simple monthly topical medication used to protect your dog or cat from heartworms, fleas, and ear mites. Revolution® (Selamectin) is also used on dogs for the treatment or prevention of fleas, the American Dog Tick, ear mites, and canine sarcoptic mange. When used on cats it is also used to treat or prevent fleas, ear mites, hookworms, and roundworms. Revolution® (Selamectin) requires a prescription from your veterinarian. (3 Pack = 3 doses which lasts 3 months.)

Indications for use
Revolution is recommended for use in dogs six weeks of age or older and cats eight weeks of age and older for the following parasites and indications.

Revolution kills adult fleas and prevents flea eggs from hatching for one month and is indicated for the prevention and control of flea infestations (Ctenocephalides felis), prevention of heartworm disease caused by Dirofilaria immitis, and the treatment and control of ear mite (Otodectes cynotis) infestations. Revolution also is indicated for the treatment and control of sarcoptic mange (Sarcoptes scabiei) and for the control of tick infestations due to Dermacentor variabilis.

Cautions
Side effects are uncommon, with less than 1% of dogs showing signs of digestive upsets. It is not advisable to use Revolution® (Selamectin) in pets that are ill or underweight. Collies and herding dog breeds may have a reaction to the ingredient selamectin if given over the recommended dosage amount. If your dog is a collie or other herding dog breed and your veterinarian has prescribed Revolution® (Selamectin), we urge you to monitor your pet for 8 hours and call your vet if your dog displays any signs of weakness, staggering, dilated pupils, trembling, drooling, or pressing his or her head against a wall.

Administration and dosage
Revolution recommended minimum dose is 2.7 mg selamectin per pound (6 mg/kg) of body weight.
Administer the entire contents of a single dose tube (or two tubes used in combination for dogs weighing over 130 pounds) of Revolution topically in accordance with the following tables.`,
  },
  {
    title: "Benefits & Comparision",
    image: Assets.Goat_MilkSheet,
  },
];

const data = [
  {
    title: "How Do We Pastuerize Our Goat Milk?",
    details:
      "We use a process called ‘Flash Paesturization‘. The milk is heated at 161 degree Fahrenheit for 15 seconds.\n\n\nFlash pasteurized goat milk is nearly identical to traditional pasteurized goat milk in most ways. It is the most common method used nowadays as it requires significantly less energy and time. Shelf life is comparable. Both forms of pasteurization allow goat milk to be cultured (so you can use our goat milk to make cheese, yogurt, and kefir at ProductDetails.)",
  },
  {
    title: "What is A2 protein in milk?",
    details:
      "We use a process called ‘Flash Paesturization‘. The milk is heated at 161 degree Fahrenheit for 15 seconds.\n\n\nFlash pasteurized goat milk is nearly identical to traditional pasteurized goat milk in most ways. It is the most common method used nowadays as it requires significantly less energy and time. Shelf life is comparable. Both forms of pasteurization allow goat milk to be cultured (so you can use our goat milk to make cheese, yogurt, and kefir at ProductDetails.)",
  },
  {
    title: "Is goat milk safe for children?",
    details:
      "We use a process called ‘Flash Paesturization‘. The milk is heated at 161 degree Fahrenheit for 15 seconds.\n\n\nFlash pasteurized goat milk is nearly identical to traditional pasteurized goat milk in most ways. It is the most common method used nowadays as it requires significantly less energy and time. Shelf life is comparable. Both forms of pasteurization allow goat milk to be cultured (so you can use our goat milk to make cheese, yogurt, and kefir at ProductDetails.)",
  },
  {
    title: "Difference between Goat & Cow Milk?",
    details:
      "We use a process called ‘Flash Paesturization‘. The milk is heated at 161 degree Fahrenheit for 15 seconds.\n\n\nFlash pasteurized goat milk is nearly identical to traditional pasteurized goat milk in most ways. It is the most common method used nowadays as it requires significantly less energy and time. Shelf life is comparable. Both forms of pasteurization allow goat milk to be cultured (so you can use our goat milk to make cheese, yogurt, and kefir at ProductDetails.)",
  },
  {
    title: "How long can you store goat milk?",
    details:
      "We use a process called ‘Flash Paesturization‘. The milk is heated at 161 degree Fahrenheit for 15 seconds.\n\n\nFlash pasteurized goat milk is nearly identical to traditional pasteurized goat milk in most ways. It is the most common method used nowadays as it requires significantly less energy and time. Shelf life is comparable. Both forms of pasteurization allow goat milk to be cultured (so you can use our goat milk to make cheese, yogurt, and kefir at ProductDetails.)",
  },
  {
    title: "How to store goat milk in a refrigerator?",
    details:
      "We use a process called ‘Flash Paesturization‘. The milk is heated at 161 degree Fahrenheit for 15 seconds.\n\n\nFlash pasteurized goat milk is nearly identical to traditional pasteurized goat milk in most ways. It is the most common method used nowadays as it requires significantly less energy and time. Shelf life is comparable. Both forms of pasteurization allow goat milk to be cultured (so you can use our goat milk to make cheese, yogurt, and kefir at ProductDetails.)",
  },
];

export default ProductDetails;
