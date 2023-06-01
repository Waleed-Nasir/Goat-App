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
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import {COLOR} from '../assets/colors';
import {Assets} from '../assets/images';
const {width} = Dimensions.get('screen');

const Item = ({style = {}, onPress,data,CrossPress}) => {
  const [rating, setRating] = useState(0);
  return (
    <Pressable style={[styles.Main, style]} onPress={onPress}>
      <Image
        source={Assets.Goat_Bottle}
        borderRadius={4}
        style={styles.ItemImage}
        resizeMode={'cover'}
      />
      <View style={styles.ViewArea}>
        <Text style={styles.MainText}>{data.name}</Text>
        <View style={styles.ROW}>
          <StarRating
            rating={data.rating}
            // onChange={setRating}
            starSize={16}
            starStyle={{marginHorizontal: -1}}
          />
          <Text style={styles.RatingText}>{data.rating}</Text>
        </View>
        <View style={styles.ROW}>
          <View style={styles.Offer}>
            <View
              style={{
                padding: 2,
                borderRadius: 4,
                backgroundColor: COLOR.DarkGreen,
              }}>
              <Text style={styles.OfferText}>30% OFF</Text>
            </View>
            <Text style={styles.beforePrice}>Before Rs 1000</Text>
          </View>
          <Text style={styles.Price}>Rs {data.price}</Text>
        </View>
      </View>
      <View style={styles.ActionArea}>
        <Pressable>
          <Image
            source={Assets.Goat_FillHeart}
            style={styles.ActionAreaButton}
            resizeMode={'center'}
          />
        </Pressable>
        <Pressable style={styles.Cross} onPress={CrossPress}>
          <Image
            source={Assets.Goat_CrossGreen}
            style={styles.ActionCrossButton}
            resizeMode={'cover'}
          />
        </Pressable>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  Main: {
    backgroundColor: COLOR.INPUT_BG,
    padding: 10,
    borderRadius: 5,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginVertical: 6,
    paddingVertical: 16,
  },
  ItemImage: {
    width: 80,
    height: 80,
  },
  ViewArea: {
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    flex: 1,
  },
  ROW: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  MainText: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    color: COLOR.DarkGreen,
    marginVertical: 3,
  },
  RatingText: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 10,
    color: '#000',
    marginHorizontal: 5,
  },
  Price: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 26,
    color: COLOR.DarkGreen,
    marginVertical: 5,
  },
  Offer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  OfferText: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 10,
    color: COLOR.White,
  },
  beforePrice: {
    fontWeight: '700',
    fontSize: 7,
    color: COLOR.DarkGreen,
  },
  ActionArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  ActionAreaButton: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  ActionCrossButton: {
    width: 18,
    height: 18,
    borderRadius: 100,
  },
  Cross: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});

export default Item;
