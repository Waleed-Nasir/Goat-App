/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Dimensions, Image, StyleSheet,
  Text, View
} from 'react-native';
import { SCREENS } from '../../App';
import { COLOR } from '../assets/colors';
import { Assets } from '../assets/images';
import { Button } from '../components/Button';
import Layout from '../Layout';
import Header from './Header';
const {width} = Dimensions.get('screen');

const OPS = [
  'Cash On Delivery',
  'Jazzcash',
  'Easypaisa',
  'Visa OR Master Card',
];

const TrackStatus = () => {
  const [CurrentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();

  return (
    <Layout Header={() => <Header showSlider={false} />}>
      <View style={[styles.Row, styles.MT_40]}>
        <Text style={styles.HeadingText}>TRACK YOUR ORDER</Text>
      </View>
      <View style={styles.padding20}>
        <View style={styles.ImageIND}>
          <Image
            source={Assets.Done}
            style={{width: '100%', height: '100%'}}
            resizeMode={'contain'}
          />
        </View>
        <Text style={styles.centerText}>
          Thank You, Your Order{'\n'}has been received
        </Text>
        <Text
          style={[
            styles.HeadingText,
            {fontSize: 22, color: COLOR.Black},
            styles.padding20,
            styles.MT_40,
          ]}>
          Order details
        </Text>
        <View style={[styles.Row, styles.padding20]}>
          <Text style={styles.Title}>Order number:</Text>
          <Text style={styles.Title}>#2A2B-HBGR1v</Text>
        </View>
        <View style={[styles.Row, styles.padding20]}>
          <Text style={styles.Title}>Date:</Text>
          <Text style={styles.Title}>Aug 2, 2022</Text>
        </View>
        <View style={[styles.Row, styles.padding20]}>
          <Text style={styles.Title}>Payment method:</Text>
          <Text style={styles.Title}> Credit Card</Text>
        </View>
        <View style={[styles.Row, styles.MT_40]}>
          <Button title="View Order Status" onPress={() => {navigation.navigate(SCREENS.TrackOrder)}} />
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
    fontWeight: '600',
    fontSize: 20,
    color: COLOR.DarkGreen,
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  padding20: {
    paddingHorizontal: 30,
    width: '100%',
  },
  MT_40: {
    marginTop: 40,
  },
  MB_10: {
    marginBottom: 10,
  },

  MainText: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    color: COLOR.Black,
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
    padding: 6,
  },
  IconButton: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  centerText: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 20,
    color: COLOR.DarkGreen,
    marginVertical: 10,
    textAlign: 'center',
  },
  ImageIND: {
    height: width - 200,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  Title: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    color: COLOR.Black,
  },
});

export default TrackStatus;


