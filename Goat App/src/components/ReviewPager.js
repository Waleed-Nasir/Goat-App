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
import {COLOR} from '../assets/colors';
import {Assets} from '../assets/images';
const {width} = Dimensions.get('screen');

const ReviewPager = ({title = '', isImage = null}) => {
  const [ForOrder, setForOrder] = useState('All Starts');
  const [ShowSelection, setShowSelection] = useState(0);
  const DropDown = () => (
    <View style={styles.OrderInfo}>
      <Pressable
        onPress={() => {
          setShowSelection(1);
        }}
        style={styles.BoxDays}>
        <Text style={styles.forDays}>{ForOrder}</Text>
        <Image source={Assets.Goat_ReviewDownArrow} style={{marginLeft: 10}} />
        {ShowSelection === 1 ? (
          <View style={styles.Drop}>
            <Pressable
              onPress={() => {
                setForOrder('All Starts');
                setShowSelection(0);
              }}
              style={[styles.BoxDays]}>
              <Text style={[styles.forDays]}>All Starts</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setForOrder('Most Relevant');
                setShowSelection(0);
              }}
              style={[styles.BoxDays]}>
              <Text style={[styles.forDays]}>Most Relevant</Text>
            </Pressable>
          </View>
        ) : null}
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.MainText}>{title}</Text>
      <View style={[styles.Row,{justifyContent: 'space-between',paddingHorizontal:30}]}>
        <View style={styles.Row}>
          <Text style={[styles.forDays,{color:COLOR.GrayText}]}>Filter By</Text>
          <DropDown />
        </View>
        <View style={styles.Row}>
          <Text style={[styles.forDays,{color:COLOR.GrayText}]}>Sort By</Text>
          <DropDown />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 40,
    
  },
  Row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.INPUT_BG,
    paddingVertical: 7,
    zIndex: 1,
  },
  MainText: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    color: '#000',
    textAlign: 'left',
    paddingLeft: 30,
    marginVertical: 10,
    zIndex: 1,
  },
  OrderInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: 10,
  },
  forDays: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '400',
    color: '#000',
  },
  BoxDays: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 100,
    height: 30,
    backgroundColor: COLOR.White,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
  Drop: {
    position: 'absolute',
    width: 100,
    backgroundColor: COLOR.White,
    right: 0,
    top: 30,
    zIndex: 100000,
    overflow: 'hidden',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    zIndex: 10000,
  },
});

export default ReviewPager;
