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
import BottleModal from '../components/BottleModal';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '../../App';

const OPS = [
  'Cash On Delivery',
  'Jazzcash',
  'Easypaisa',
  'Visa OR Master Card',
];

const SupportRequest = () => {
  const [deliverymodalVisible, setdeliveryModalVisible] = useState(false);
  const navigation = useNavigation();
  return (
    <Layout Header={() => <Header showSlider={false} />}>
      <View style={[styles.padding20, styles.Row, styles.MT_40, styles.MB_10]}>
        <Text style={styles.HeadingText}>Contact Support</Text>
      </View>
      <View style={styles.padding20}>
        <Input placeholder="Your Name...." />
        <Input placeholder="Email..." />
        <Input placeholder="Phone Number..." />
        <View style={[styles.Row, styles.MT_40, styles.MB_10]}>
          <Image source={Assets.Goat_CirclePlus} />
          <Text style={[styles.HeadingText]}>Attach a file</Text>
        </View>
        <Input
          placeholder="Write Your Message here"
          InputProps={{numberOfLines: 10, multiline: true}}
          InputStyle={{height: 120}}
        />
        <View style={[styles.Row, styles.MT_40]}>
          <Button
            title="Submit Report"
            onPress={() => {
              setdeliveryModalVisible(true);
              setTimeout(() => {
                setdeliveryModalVisible(false);
                navigation.navigate(SCREENS.Home);
              }, 3000);
            }}
          />
        </View>
      </View>

      <BottleModal modalVisible={deliverymodalVisible}>
        <View style={[styles.Row, {marginVertical: 10}]}>
          <Text style={styles.TitleText}>
            Your report has been submitted!{'\n\n'}Our representative wil get
            back to you soon!
          </Text>
        </View>
      </BottleModal>
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
    fontWeight: '400',
    fontSize: 20,
    color: COLOR.DarkGreen,
    paddingHorizontal: 15,
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
  TitleText: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    color: COLOR.DarkGreen,
    textAlign: 'center',
  },
});

export default SupportRequest;
