/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {COLOR} from '../assets/colors';
import {Assets} from '../assets/images';
import {Button} from '../components/Button';
import Layout from '../Layout';
import Header from './Header';
const {width} = Dimensions.get('screen');

const ManageOrders = () => {
  const [CurrentIndex, setCurrentIndex] = useState(0);
  return (
    <Layout Header={() => <Header showSlider={false} />}>
      <View style={[styles.Row, styles.MT_40, styles.padding20]}>
        <Text style={styles.HeadingText}>Active</Text>
      </View>
      <View style={styles.padding20}>
        <View style={styles.Cart}>
          <View style={[styles.RowItem]}>
            <Image
              source={Assets.Goat_Milk}
              style={{width: 70, height: 70, backgroundColor: COLOR.White}}
              borderRadius={8}
              resizeMode={'contain'}
            />
            <View style={{flex: 1, paddingHorizontal: 10, paddingBottom: 10}}>
              <Text style={styles.centerText}>Goat Milk</Text>
              <Text style={[styles.MainTitle]}>1 ltr</Text>
              <View style={[styles.Row]}>
                <Text style={[styles.Title, {width: '40%'}]}>Qty</Text>
                <Text style={[styles.Title, {flex: 1, color: COLOR.DarkGreen}]}>
                  10
                </Text>
              </View>
              <View style={[styles.Row]}>
                <Text style={[styles.Title, {width: '40%'}]}>Frequency</Text>
                <Text style={[styles.Title, {flex: 1, color: COLOR.DarkGreen}]}>
                  Every Day
                </Text>
              </View>
              <View style={[styles.Row]}>
                <Text style={[styles.Title, {width: '40%'}]}>Delivery</Text>
                <Text style={[styles.Title, {flex: 1, color: COLOR.DarkGreen}]}>
                  Tomorrow or Date
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.Row]}>
            <Button
              style={{flex: 0.49}}
              BG={[COLOR.DarkGreen, COLOR.DarkGreen]}
              title="Edit"
              onPress={() => {}}
            />
            <Button
              style={{flex: 0.49}}
              BG={[COLOR.FullGreen, COLOR.FullGreen]}
              title="Deactivate"
              onPress={() => {}}
            />
          </View>
        </View>

        <View style={styles.MT_40} />
      </View>
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
  HeadingText: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 20,
    color: COLOR.DarkGreen,
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  padding20: {
    paddingHorizontal: 20,
    width: '100%',
  },
  MT_40: {
    marginTop: 20,
  },
  MB_10: {
    marginBottom: 10,
  },

  MainText: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    color: COLOR.GrayText,
    marginHorizontal: 10,
  },
  divider: {
    width: '100%',
    height: 2,
    backgroundColor: COLOR.GrayBox,
    marginVertical: 20,
  },
  Row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  RowItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
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
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 16,
    color: COLOR.GrayText,
  },
  ImageIND: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  Title: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 12,
    color: COLOR.Black,
    lineHeight: 18,
  },
  MainTitle: {
    fontSize: 10,
    color: COLOR.GrayText,
    fontStyle: 'normal',
    fontWeight: '600',
  },
});

export default ManageOrders;

const data = [
  {
    title: 'Manage Schedule',
    subText: 'Edit or Delete milk scheduling',
    icon: Assets.Goat_SettingOrder,
  },
  {
    title: 'My Orders',
    subText: 'Previous order history',
    icon: Assets.Goat_SettingOrder,
  },
  {
    title: 'Shipping Addresses',
    subText: 'Add or edit your addresses',
    icon: Assets.Goat_SettingMap,
    stylesList: {backgroundColor: COLOR.DarkGreen + 55},
    stylesFont: {color: COLOR.White},
  },
  {
    title: 'Wallet & Payment ',
    subText: 'Manage your wallet & payment methods',
    icon: Assets.Goat_SettingGear,
  },
  {
    title: 'ManageOrders',
    subText: 'Notifications, Passwords, etc.',
    icon: Assets.Goat_SettingGear,
  },
  {
    title: 'Favourites',
    subText: 'Manage your favourite products',
    icon: Assets.Goat_SettingGear,
  },
];
