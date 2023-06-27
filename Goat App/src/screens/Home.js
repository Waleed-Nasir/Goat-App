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
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "../../App";
import BottomTab from "../components/BottomTab";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedCategoriesList } from "../Store/slice/HomeSlices";

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { ProductList, CategoriesList } = useSelector((STATE) => STATE.Home);
  const STATE = useSelector((STATE) => STATE);
  console.log(STATE);
  return (
    <Layout Header={() => <Header showSlider={false} />}>
      <View style={styles.Main}>
        <TouchableOpacity style={styles.HomeButton}>
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
        <View style={styles.Container}>
          <CategoriesFor title="Categories" isImage />
          {CategoriesList && CategoriesList[0] ? <MainItem
            title={CategoriesList[0].name}
            onPress={() => { dispatch(getSelectedCategoriesList(CategoriesList[0]?._id)), navigation.navigate(SCREENS.DairyProducts) }}
          /> : null}
          <View style={styles.Warp}>
            {CategoriesList?.map((item, index) => {
              if (index === 0) {
                return null
              } else
                return <MainItem
                  type={2}
                  title={item.name}
                  onPress={() => { dispatch(getSelectedCategoriesList(item._id)), navigation.navigate(SCREENS.DairyProducts) }}
                />
              {/* <MainItem
            onPress={() => navigation.navigate(SCREENS.DairyProducts)}
            />
            
            <View style={styles.Warp}>
           
            <MainItem
            type={2}
            onPress={() => navigation.navigate(SCREENS.DairyProducts)}
            productImage={Assets.Goat_Goat}
            />
          </View> */}
            })}
          </View>
        </View>
        <View style={styles.padding20}>
          <CategoriesFor title="Our Products" isImage />
        </View>
        <FlatList
          ListFooterComponent={() => <View style={{ padding: 7 }} />}
          ListHeaderComponent={() => <View style={{ padding: 7 }} />}
          showsHorizontalScrollIndicator={false}
          horizontal
          style={{ flexDirection: "row" }}
          data={ProductList}
          renderItem={({ item, index }) => (
            <Item
              data={item}
              productImage={
                index % 2 == 1 ? Assets.Goat_Meat : Assets.Goat_Bottle
              }
              onPress={() =>
                navigation.navigate(SCREENS.ProductDetails)
              }
              index={index}
            />
          )}
        />

        <View style={styles.padding20}>
          <CategoriesFor title="Why Goat Pure?" />
        </View>
        <FlatList
          ListFooterComponent={() => <View style={{ padding: 15 }} />}
          ListHeaderComponent={() => <View style={{ padding: 15 }} />}
          showsHorizontalScrollIndicator={false}
          horizontal
          style={{ flexDirection: "row" }}
          data={[1, 2, 3]}
          renderItem={({ index }) => (
            <TouchableOpacity style={styles.Banner2}>
              <ImageBackground
                style={styles.Banner}
                source={Assets.Goat_HomeBanner}
                resizeMode={"cover"}
              >
                <View style={styles.BannerAction}>
                  <Text style={styles.BannerActionTextHeading}>
                    Our Mission
                  </Text>
                  <Text style={[styles.BannerActionText1, styles.FontSize16]}>
                    At Goat Pure we hold{"\n"}ourselves to the{"\n"}highest
                    standards.
                  </Text>
                  <Button
                    title="Shop Now"
                    style={{ width: 90, height: 30 }}
                    TextStyle={{ fontSize: 13, fontWeight: "800" }}
                  />
                </View>
              </ImageBackground>
            </TouchableOpacity>
          )}
        />
        {/* <View style={styles.padding20}>
          <CategoriesFor title="Recommeded for you" isImage />
        </View>
        <FlatList
          ListFooterComponent={() => <View style={{ padding: 7 }} />}
          ListHeaderComponent={() => <View style={{ padding: 7 }} />}
          showsHorizontalScrollIndicator={false}
          horizontal
          style={{ flexDirection: "row" }}
          data={[1, 2, 3]}
          renderItem={({ index }) => (
            <Item
              productImage={
                index % 2 == 1 ? Assets.Goat_Meat : Assets.Goat_Bottle
              }
              index={index}
              onPress={() => navigation.navigate(SCREENS.DairyProducts)}
            />
          )}
        /> */}

        <View style={styles.padding20}>
          <CategoriesFor title="Our Farm" />
        </View>
        <FlatList
          ListFooterComponent={() => <View style={{ padding: 15 }} />}
          ListHeaderComponent={() => <View style={{ padding: 15 }} />}
          showsHorizontalScrollIndicator={false}
          horizontal
          style={{ flexDirection: "row" }}
          data={[1, 2, 3]}
          renderItem={() => (
            <TouchableOpacity style={styles.Banner2}>
              <ImageBackground
                style={styles.Banner}
                source={Assets.Goat_Farm}
                resizeMode={"cover"}
              >
                <View style={[styles.BannerAction, { paddingLeft: 20 }]}>
                  <Text
                    style={[styles.BannerActionTextHeading, styles.FontSize16]}
                  >
                    Types of Goat Breeds
                  </Text>
                  <Text style={[styles.BannerActionText1, styles.FontSize12]}>
                    . Pateri Goat{"\n"}. Gulabi Goat{"\n"}. Kamori Goat{"\n"}.
                    Makki Cheeni Goat.
                  </Text>
                  <Button
                    title="Shop Now"
                    style={{ width: 90, height: 30, top: 4 }}
                    TextStyle={{ fontSize: 13, fontWeight: "800" }}
                  />
                </View>
              </ImageBackground>
            </TouchableOpacity>
          )}
        />
        <View style={styles.padding20}>
          <CategoriesFor
            title="Frequently Asked Questions"
            isImage={Assets.Goat_DownArrow}
          />
        </View>
        <View style={styles.padding20}>
          {data.map((items) => (
            <Accordian right={10} {...items} />
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
  HomeButton: {
    width: "100%",
    height: width / 2.1,
    top: -3,
  },

  Container: {
    width: "100%",
    paddingHorizontal: 30,
    paddingTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  Warp: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    paddingBottom: 20,
  },
  padding20: {
    paddingHorizontal: 30,
    paddingVertical: 2,
    width: "100%",
  },
  Banner2: {
    width: width - 50,
    height: width / 2,
    justifyContent: "center",
    alignItems: "flex-start",
    marginRight: 12,
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 15,
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
  BannerActionTextHeading: {
    fontSize: 20,
    fontWeight: "700",
    color: COLOR.White,
    lineHeight: 28,
    marginBottom: 10,
  },
  BannerActionText1: {
    fontSize: 20,
    fontWeight: "600",
    color: COLOR.White,
    lineHeight: 24,
  },
  FontSize16: {
    fontSize: 16,
    lineHeight: 21,
  },
  FontSize12: {
    fontSize: 12,
    fontWeight: "500",
    color: COLOR.White,
    lineHeight: 16,
  },
});

const data = [
  {
    title: "How Do We Pastuerize Our Goat Milk?",
    details:
      "We use a process called ‘Flash Paesturization‘. The milk is heated at 161 degree Fahrenheit for 15 seconds.\n\n\nFlash pasteurized goat milk is nearly identical to traditional pasteurized goat milk in most ways. It is the most common method used nowadays as it requires significantly less energy and time. Shelf life is comparable. Both forms of pasteurization allow goat milk to be cultured (so you can use our goat milk to make cheese, yogurt, and kefir at home.)",
  },
  {
    title: "What is A2 protein in milk?",
    details:
      "We use a process called ‘Flash Paesturization‘. The milk is heated at 161 degree Fahrenheit for 15 seconds.\n\n\nFlash pasteurized goat milk is nearly identical to traditional pasteurized goat milk in most ways. It is the most common method used nowadays as it requires significantly less energy and time. Shelf life is comparable. Both forms of pasteurization allow goat milk to be cultured (so you can use our goat milk to make cheese, yogurt, and kefir at home.)",
  },
  {
    title: "Is goat milk safe for children?",
    details:
      "We use a process called ‘Flash Paesturization‘. The milk is heated at 161 degree Fahrenheit for 15 seconds.\n\n\nFlash pasteurized goat milk is nearly identical to traditional pasteurized goat milk in most ways. It is the most common method used nowadays as it requires significantly less energy and time. Shelf life is comparable. Both forms of pasteurization allow goat milk to be cultured (so you can use our goat milk to make cheese, yogurt, and kefir at home.)",
  },
  {
    title: "Difference between Goat & Cow Milk?",
    details:
      "We use a process called ‘Flash Paesturization‘. The milk is heated at 161 degree Fahrenheit for 15 seconds.\n\n\nFlash pasteurized goat milk is nearly identical to traditional pasteurized goat milk in most ways. It is the most common method used nowadays as it requires significantly less energy and time. Shelf life is comparable. Both forms of pasteurization allow goat milk to be cultured (so you can use our goat milk to make cheese, yogurt, and kefir at home.)",
  },
  {
    title: "How long can you store goat milk?",
    details:
      "We use a process called ‘Flash Paesturization‘. The milk is heated at 161 degree Fahrenheit for 15 seconds.\n\n\nFlash pasteurized goat milk is nearly identical to traditional pasteurized goat milk in most ways. It is the most common method used nowadays as it requires significantly less energy and time. Shelf life is comparable. Both forms of pasteurization allow goat milk to be cultured (so you can use our goat milk to make cheese, yogurt, and kefir at home.)",
  },
  {
    title: "How to store goat milk in a refrigerator?",
    details:
      "We use a process called ‘Flash Paesturization‘. The milk is heated at 161 degree Fahrenheit for 15 seconds.\n\n\nFlash pasteurized goat milk is nearly identical to traditional pasteurized goat milk in most ways. It is the most common method used nowadays as it requires significantly less energy and time. Shelf life is comparable. Both forms of pasteurization allow goat milk to be cultured (so you can use our goat milk to make cheese, yogurt, and kefir at home.)",
  },
];

export default Home;
