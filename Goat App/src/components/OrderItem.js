/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLOR } from '../assets/colors';
import { Assets } from '../assets/images';

const OrderItem = ({
  image = Assets.Checkx,
  customOrderId = '',
  status = '',
  paymentMethod = '',
  onPress,
  deliverySlot = '',
  total = '',
  style = {},
}) => {
  return (
    <TouchableOpacity style={[styles.OrderView, style]} onPress={onPress}>
      <View style={styles.OrderInfo}>
        <Image source={image} style={styles.ph_10} />
        <View style={styles.ph_10}>
          <Text style={styles.OrderText}>ID{customOrderId}</Text>
          <Text style={[styles.OrderText, { fontSize: 12 }]}>Total: Rs:{total}</Text>
          <Text style={[styles.OrderText, { fontSize: 12 }]}>Payment: {paymentMethod}</Text>
          <Text style={[styles.OrderText, { fontSize: 12 }]}>Delivery Slot: {deliverySlot}</Text>
        </View>
      </View>
      <View style={styles.PriceInfo}>
        <Text style={styles.PriceText}>{status}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Main: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-start',
    alignOrderItems: 'center',
    backgroundColor: COLOR.White,
    padding: 25,
  },
  OrderView: {
    marginVertical: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignOrderItems: 'center',
    width: '100%',
    padding: 16,
    backgroundColor: COLOR.ButtonGreen,
    borderRadius: 6,
    borderBottomWidth: 2,
    borderColor: 'white'
  },
  OrderInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignOrderItems: 'center',
  },
  OrderText: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 22,
    color: COLOR.GrayText,
  },
  ph_10: {
    paddingHorizontal: 10,
  },
  PriceInfo: {
    minWidth: 90,
    padding: 5,
    backgroundColor: COLOR.DarkGreen,
    height: 25,
  },
  PriceText: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 12,
    color: COLOR.White,
    textAlign: 'center',
  },
});

export default OrderItem;
