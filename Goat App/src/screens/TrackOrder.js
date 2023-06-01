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
import Input from '../components/Input';
import RadioRow from '../components/RadioRow';
import Address from '../components/Address';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '../../App';

const OPS = [
  'Cash On Delivery',
  'Jazzcash',
  'Easypaisa',
  'Visa OR Master Card',
];

const TrackOrder = () => {
  const [CurrentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();

  return (
    <Layout Header={() => <Header showSlider={false} />}>
      <View style={styles.padding20}>
        <View style={[styles.Row, styles.MT_40]}>
          <Text style={styles.HeadingText}>TRACK YOUR ORDER</Text>
        </View>
        <View style={styles.ImageIND}>
          <Image
            source={data[CurrentIndex].image}
            style={{width: '100%', height: '100%'}}
            resizeMode={'contain'}
          />
        </View>
        <Text style={styles.centerText}>{data[CurrentIndex].text}</Text>

        <View style={styles.Tracker}>
          {data?.map((iten, index) => {
            return (
              <>
                <Pressable
                  onPress={() => setCurrentIndex(index)}
                  style={styles.Center}>
                  <View>
                    <Text style={[styles.Title, {fontSize: 16}]}>
                      {index + 1}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.Ring,
                      index === CurrentIndex
                        ? {borderColor: COLOR.DarkGreen}
                        : {},
                    ]}>
                    <View
                      style={[
                        styles.FillRing,
                        index === CurrentIndex
                          ? {backgroundColor: COLOR.DarkGreen}
                          : {},
                      ]}
                    />
                  </View>
                  <View>
                    <Text style={styles.Title}>{iten.title}</Text>
                  </View>
                </Pressable>
                {index < 3 ? <View style={styles.Bar} /> : null}
              </>
            );
          })}
        </View>
        {CurrentIndex < 3 ? (
          <>
            <View style={[styles.Row, styles.MT_40]}>
              <Text style={styles.HeadingText}>Contact Support</Text>
            </View>
            <Input
              placeholder="Write Your Message here"
              InputProps={{numberOfLines: 5, multiline: true}}
              InputStyle={{height: 80}}
            />
            <Button title="Get Help With Order" onPress={() => {navigation.navigate(SCREENS.SupportRequest)}} />
          </>
        ) : (
          <View style={[styles.Row, styles.MT_40]}>
            <Button title="Back to Home" onPress={() => {navigation.navigate(SCREENS.Home)}} />
          </View>
        )}
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
    justifyContent: 'flex-start',
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
  Bar: {
    flex: 2,
    borderWidth: 0.5,
    top: 5,
  },
  Tracker: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
  },
  Center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  Ring: {
    width: 20,
    height: 20,
    padding: 4.5,
    borderRadius: 100,
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
  },
  FillRing: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    borderRadius: 100,
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
    fontWeight: '500',
    fontSize: 10,
    color: COLOR.DarkGreen,
    textAlign: 'center',
  },
});

export default TrackOrder;

const data = [
  {
    image: Assets.Goat_TrackConfirm,
    text: 'Your order has been\nconfirmed!',
    title: 'Confirmed',
  },
  {
    image: Assets.Goat_TrackOrderWay,
    text: 'Your order has been\ndispatched!',
    title: 'Dispatched',
  },
  {
    image: Assets.Goat_TrackLocation,
    text: 'Our rider is just around\nthe corner!',
    title: 'Near you',
  },
  {
    image: Assets.Goat_TrackOrderEnd,
    text: 'The order has been\nDelivered!',
    title: 'Delivered',
  },
];
