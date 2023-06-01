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
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLOR} from '../assets/colors';
const {width} = Dimensions.get('screen');

const RadioRow = ({
  onPress,
  Checked = false,
  text = '',
  marginVertical = 8,
  textStyle = {},
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.OrderView, {marginVertical}]}>
      <View style={styles.RING}>
        {Checked ? <View style={styles.checked} /> : null}
      </View>
      <View style={styles.OrderInfo}>
        <View style={styles.ph_10}>
          <Text style={[styles.OrderText, textStyle]}>{text}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  OrderView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  OrderInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  OrderText: {
    fontStyle: 'normal',
    fontWeight: '500',
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
    width: '100%',
    height: '100%',
    backgroundColor: COLOR.DarkGreen,
    borderRadius: 100,
  },
});

export default RadioRow;
