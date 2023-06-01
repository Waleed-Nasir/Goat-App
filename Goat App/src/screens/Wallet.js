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
import OrderItem from '../components/OrderItem';
import Layout from '../Layout';
import Header from './Header';
const {width} = Dimensions.get('screen');

const order = [
  {OrderNo: 'Order # 1202134', Status: 'Rs 1,000.14', Type: 'COD'},
  {OrderNo: 'Order # 1202134', Status: 'Rs 5,000', Type: 'COD'},
  {OrderNo: 'Order # 1202134', Status: 'Rs 1,400', Type: 'COD'},
  {OrderNo: 'Order # 1202134', Status: 'Rs 1,900', Type: 'COD'},
];

const Wallet = () => {
  const [CurrentIndex, setCurrentIndex] = useState(0);
  return (
    <Layout Header={() => <Header showSlider={false} />}>
      <View style={[styles.Row, styles.MT_40, styles.padding20]}>
        <Text style={styles.HeadingText}>Your Wallet</Text>
      </View>
      <View style={styles.padding20}>
        <View style={styles.Cart}>
          <View style={[styles.RowItem]}>
            <View style={{flex: 1, paddingHorizontal: 10, paddingBottom: 10}}>
              <Text style={[styles.Title]}>Available Credit</Text>
              <View style={[styles.Row]}>
                <Text style={styles.centerText}>Rs 0.00</Text>
              </View>
            </View>
          </View>
          <View style={[styles.Row]}>
            <Button
              style={{flex: 0.49}}
              BG={[COLOR.DarkGreen, COLOR.DarkGreen]}
              title="Top Up"
              onPress={() => {}}
            />
            <Button
              BG={[COLOR.FullGreen, COLOR.FullGreen]}
              style={{flex: 0.49}}
              title="Cancel"
              onPress={() => {}}
            />
          </View>
        </View>
      </View>

      <View style={[styles.Row, styles.MT_40, styles.padding20]}>
        <Text style={styles.HeadingText}>Payment Methods</Text>
      </View>
      <View style={styles.padding20}>
        <View style={styles.Cart}>
          <View style={[styles.RowItem]}>
            <Image
              source={Assets.Goat_Visa}
              style={{width: 40, height: 40, backgroundColor: COLOR.White}}
              borderRadius={8}
              resizeMode={'contain'}
            />
            <View style={{flex: 1, paddingHorizontal: 10, paddingBottom: 10}}>
              <View>
                <Text style={[styles.Title]}>Visa</Text>
                <Text style={[styles.Title]}>****-5989</Text>
              </View>
            </View>
            <View style={styles.GreenRowBack}>
              <Text style={styles.RequiredText}>Primary</Text>
            </View>
          </View>
          <View style={[styles.Row]}>
            <Button
              style={{flex: 0.49}}
              BG={[COLOR.DarkGreen, COLOR.DarkGreen]}
              title="Top Up"
              onPress={() => {}}
            />
            <Button
              BG={[COLOR.FullGreen, COLOR.FullGreen]}
              style={{flex: 0.49}}
              title="Change"
              onPress={() => {}}
            />
          </View>
        </View>
      </View>
      <View style={[styles.Row, styles.MT_40, styles.padding20]}>
        <Text style={styles.HeadingText}>Transactions</Text>
      </View>
      <View style={styles.padding20}>
        <View style={styles.Cart}>
          {order.map(item => (
            <OrderItem
              style={{padding: 0}}
              {...item}
              // onPress={() => navigation.navigate(SCREENS.OderDetails)}
            />
          ))}
        </View>
      </View>

      <View style={[styles.Row, styles.MT_40, styles.padding20]}>
        <Text style={styles.HeadingText}>Redeem by Returning Bottle</Text>
      </View>
      <View style={styles.padding20}>
        <View style={styles.Cart}>
          <View style={[styles.RowItem]}>
            <Image
              source={Assets.Goat_Redem}
              style={{width: 30, height: 30, backgroundColor: COLOR.White}}
              resizeMode={'contain'}
            />
            <View style={{flex: 1, paddingHorizontal: 10, paddingBottom: 10}}>
              <View>
                <Text style={[styles.Title]}>
                  You have{' '}
                  <View style={[styles.GreenRowBack, {minWidth: 20}]}>
                    <Text
                      style={[
                        styles.RequiredText,
                        {fontSize: 10, fontWeight: '900'},
                      ]}>
                      12
                    </Text>
                  </View>{' '}
                  1 Ltr Bottles
                </Text>
                <Text style={[styles.MainTitle]}>You can earn Rs 600</Text>
              </View>
            </View>
          </View>
          <View style={[styles.RowItem]}>
            <Image
              source={Assets.Goat_Milk}
              style={{width: 30, height: 30, backgroundColor: COLOR.White}}
              resizeMode={'contain'}
            />
            <View style={{flex: 1, paddingHorizontal: 10, paddingBottom: 10}}>
              <View>
                <Text style={[styles.Title]}>
                  You have{' '}
                  <View style={[styles.GreenRowBack, {minWidth: 20}]}>
                    <Text
                      style={[
                        styles.RequiredText,
                        {fontSize: 10, fontWeight: '900'},
                      ]}>
                      12
                    </Text>
                  </View>{' '}
                  1 Ltr Bottles
                </Text>
                <Text style={[styles.MainTitle]}>You can earn Rs 600</Text>
              </View>
            </View>
          </View>
          <View
            style={[styles.Row, {paddingHorizontal: 30, marginVertical: 20}]}>
            <View
              style={[
                styles.GreenRowBack,
                {flex: 0.45, height: 60, justifyContent: 'space-around'},
              ]}>
              <Text style={[styles.RequiredText, {fontSize: 14}]}>
                Rs 50 1/2 ltr
              </Text>
            </View>
            <View
              style={[
                styles.GreenRowBack,
                {flex: 0.45, height: 60, justifyContent: 'space-around'},
              ]}>
              <Text style={[styles.RequiredText, {fontSize: 14}]}>
                Rs 100 1 ltr
              </Text>
            </View>
          </View>
          <Text style={[styles.MainText]}>
            Return the bottles to our rider to redeem this offer
          </Text>
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
    fontWeight: '700',
    fontSize: 14,
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
    fontSize: 10,
    fontWeight: '900',
    color: COLOR.White,
  },
});

export default Wallet;
