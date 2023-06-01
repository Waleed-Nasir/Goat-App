/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
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
} from 'react-native';
import {COLOR} from '../assets/colors';
import {Assets} from '../assets/images';
import Layout from '../Layout';
import Header from './Header';
const {width} = Dimensions.get('screen');
import StarRating from 'react-native-star-rating-widget';
import MainItem from '../components/MeanItem';
import Item from '../components/Item';
import CategoriesFor from '../components/CategoriesFor';
import {Button} from '../components/Button';
import Accordian from '../components/Accordian';
import VerticalSlider from '../components/VerticalSlider';
import {SCREENS} from '../../App';
import {useNavigation} from '@react-navigation/native';

const DairyProducts = () => {
  const navigation = useNavigation();

  return (
    <Layout
    // Header={() =>}
    >
      <Header />
      <View style={[styles.Row, {justifyContent: 'flex-start', padding: 15}]}>
        <Text
          style={[
            styles.FilerText,
            {fontWeight: '400', color: COLOR.GrayText},
          ]}>
          Home
        </Text>
        <Image
          source={Assets.Goat_SettingArrow}
          style={styles.MiniArrow}
          resizeMode={'stretch'}
        />
        <Text style={[styles.FilerText, {fontWeight: '400'}]}>Category</Text>
        <Image
          source={Assets.Goat_SettingArrow}
          style={styles.MiniArrow}
          resizeMode={'stretch'}
        />
        <Text style={[styles.FilerText, {fontWeight: '400'}]}>
          Product List
        </Text>
      </View>
      <View style={styles.padding20}>
        <View style={styles.Row}>
          <Text style={styles.MainText}>Dairy Products</Text>
          <View style={[styles.Row, {justifyContent: 'flex-end'}]}>
            <Pressable>
              <Image source={Assets.Goat_ListPreview} />
            </Pressable>
            <View style={styles.divider} />

            <Pressable style={styles.RowItem}>
              <Image source={Assets.Goat_SortIcon} />
              <Text style={styles.FilerText}>Sort by</Text>
            </Pressable>
            <View style={styles.divider} />
            <Pressable style={styles.RowItem}>
              <Image source={Assets.Goat_Filter} />
              <Text style={styles.FilerText}>Filter</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <FlatList
        numColumns={2}
        style={{width: '100%'}}
        contentContainerStyle={{paddingHorizontal: 11}}
        data={Array(24).fill(0)}
        renderItem={() => (
          <Item onPress={() => navigation.navigate(SCREENS.ProductDetails)} />
        )}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  Main: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.White,
  },

  Container: {
    width: '100%',
    paddingHorizontal: 30,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Warp: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingBottom: 20,
  },
  padding20: {
    paddingHorizontal: 20,
    paddingVertical: 2,
    width: '100%',
  },
  VerticalSlider: {
    width: '100%',
  },
  Row: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 10,
  },
  MainText: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 26,
    color: COLOR.FullGreen,
  },
  FilerText: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 12,
    color: COLOR.DarkGreen,
    marginHorizontal: 5,
  },
  RowItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: COLOR.GrayBox,
    marginHorizontal: 8,
  },
  ProductView: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  MiniArrow: {
    width: 6,
    height: 10,
  },
});

export default DairyProducts;
