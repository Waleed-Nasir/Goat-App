/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { COLOR } from '../assets/colors';
import { Assets } from '../assets/images';
import { Button } from '../components/Button';
import OrderItem from '../components/OrderItem';
import Layout from '../Layout';
import Header from './Header';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '../../App';
import { getOrdersDetails } from '../Store/slice/HomeSlices';
const { width } = Dimensions.get('screen');

const order = [
  { OrderNo: 'Order # 1202134', Status: 'Rs 1,000.14', Type: 'COD' },
  { OrderNo: 'Order # 1202134', Status: 'Rs 5,000', Type: 'COD' },
  { OrderNo: 'Order # 1202134', Status: 'Rs 1,400', Type: 'COD' },
  { OrderNo: 'Order # 1202134', Status: 'Rs 1,900', Type: 'COD' },
];

const MyOrders = () => {
  const { OrderList } = useSelector((STATE) => STATE.Home);
  const navigation = useNavigation()
  const dispatch = useDispatch()
  return (
    <Layout Header={() => <Header showSlider={false} />}>
      <View style={[styles.Row, styles.MT_40, styles.padding20]}>
        <Text style={styles.HeadingText}>Your Orders</Text>
      </View>

      <View style={styles.padding20}>
        <View style={styles.Cart}>
          {OrderList.map(item => (
            <OrderItem
              image={Assets.Goat_Redem}
              style={{ padding: 0 }}
              {...item}
              onPress={() => {
                dispatch(getOrdersDetails({ orderId: item?._id }))
                navigation.navigate(SCREENS.TrackOrder)
              }}
            />
          ))}
        </View>
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
    fontWeight: '500',
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
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    color: COLOR.GrayText,
    marginHorizontal: 10,
    textAlign: 'center',
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
    paddingVertical: 20,
    paddingBottom: 10,
  },
  IconButton: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
  },
  centerText: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 28,
    color: COLOR.Black,
    lineHeight: 38,
    marginTop: 20,
  },
  Title: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 12,
    color: COLOR.Gray,
    lineHeight: 18,
  },
  MainTitle: {
    fontSize: 10,
    color: COLOR.GrayText,
    fontStyle: 'normal',
    fontWeight: '300',
  },
  GreenRowBack: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.DarkGreen,
    padding: 3,
  },
  RequiredText: {
    textAlign: 'center',
    fontSize: 8,
    fontWeight: '600',
    color: COLOR.White,
  },
});

export default MyOrders;
