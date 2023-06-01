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

const MainItem = ({type = 1, onPress,productImage=Assets.Goat_Add}) => {
  const [rating, setRating] = useState(0);

  if (type === 1) {
    return (
      <Pressable style={styles.MainItemButton} onPress={onPress}>
        <View style={{flex: 1}}>
          <Image
            source={productImage}
            borderRadius={6}
            style={{width: '100%', height: '100%'}}
            resizeMode={'cover'}
          />
        </View>
        <View style={styles.Row}>
          <Text style={styles.ProductTitle}>Dairy Products</Text>
          <View style={styles.RowBetween}>
            <StarRating
              rating={rating}
              onChange={setRating}
              starSize={20}
              starStyle={{marginHorizontal: -1}}
            />
            <Text style={styles.Rating}>4.9+(1000)</Text>
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable style={styles.View2} onPress={onPress}>
      <View>
        <Image
          source={productImage}
          borderRadius={10}
          style={{width: width / 2.6, height: width / 2.6}}
          resizeMode={'cover'}
        />
      </View>
      <View style={styles.ColumnView}>
        <Text style={styles.View2ProductTitle}>Dairy Products</Text>
        <View style={styles.RowBetween}>
          <StarRating
            rating={rating}
            onChange={setRating}
            starSize={20}
            starStyle={{marginHorizontal: -1}}
          />
          <Text style={styles.Rating}>4.9+(1000)</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  MainItemButton: {
    width: '100%',
    height: width / 2.1,
    marginVertical: 10,
  },
  Row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  ProductTitle: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 26,
    color: COLOR.DarkGreen,
  },
  RowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Rating: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    color: COLOR.Rating,
  },
  View2: {width: width / 2.6, marginVertical: 10},
  ColumnView: {
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  View2ProductTitle: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 26,
    color: COLOR.DarkGreen,
    marginVertical: 5,
  },
});

export default MainItem;
