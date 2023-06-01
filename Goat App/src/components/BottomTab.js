import React, {useEffect, useRef} from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import {COLOR} from '../assets/colors';
import {Assets} from '../assets/images';

const tabBarSection = [
  {
    title: 'Home',
    showName: true,
    routeName: 'Home',
    icon: Assets.Goat_TabHome,
    selectedIcon: Assets.Goat_TabHome,
    style: 'Bottom_Icon_Buttom',
  },
  {
    title: 'Profile',
    showName: true,
    routeName: 'Settings',
    icon: Assets.Goat_TabUser,
    selectedIcon: Assets.Goat_TabUser,
    style: 'Bottom_Icon_Buttom',
  },
  {
    title: 'Wishlist',
    showName: false,
    routeName: 'WishList',
    icon: Assets.Goat_TabHeart,
    selectedIcon: Assets.Goat_TabHeart,
    style: 'Bottom_Icon_Buttom',
  },
  {
    title: 'Cart',
    showName: true,
    routeName: 'YourCart',
    icon: Assets.Goat_TabBucket,
    selectedIcon: Assets.Goat_TabBucket,
    style: 'Bottom_Icon_Buttom',
  },
];

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  ButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomTab: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLOR.White,
    borderRadius: 14,
  },
  Bottom_Icon_Buttom: {
    width: 20,
    height: 20,
  },
  bottomTabText: {
    fontSize: 12,
    fontWeight: '400',
    marginTop: 5,
    color: COLOR.GrayText,
  },
  tab: {
    width: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingBottom: Platform.OS === 'ios' ? 30 : 4,
  },
});
const V = {
  0: -2,
  1: 8,
  2: 18,
  3: 28,
};
const BottomTab = props => {
  const {state, navigation} = props;
  const TabIndex = state?.index;

  const nonSelectd = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(item.routeName, {name: item.title});
        }}
        style={[styles.container]}>
        <View style={styles.ButtonContainer}>
          <View style={[styles[item.style], styles.ButtonContainer]}>
            {[
              TabIndex === index ? (
                <Image
                  source={item.selectedIcon}
                  {...{...styles[item.style]}}
                  resizeMode={'center'}
                />
              ) : (
                <Image
                  source={item.icon}
                  {...{...styles[item.style]}}
                  resizeMode={'center'}
                />
              ),
            ]}
          </View>
          <Text style={styles.bottomTabText}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.tab}>
      <View style={styles.bottomTab} shadow={1}>
        {tabBarSection.map((item, index) => nonSelectd(item, index))}
      </View>
    </View>
  );
};

export default BottomTab;
