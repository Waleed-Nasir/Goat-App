import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLOR} from '../assets/colors';
import {Assets} from '../assets/images';

const tabBarSection = [
  {
    title: 'Deliveries',
    showName: true,
    routeName: 'Deliveries',
    icon: Assets.Home,
    selectedIcon: Assets.Home,
    style: 'Bottom_Icon_Buttom',
  },
  {
    title: 'Profile',
    showName: true,
    routeName: 'Profile',
    icon: Assets.User,
    selectedIcon: Assets.User,
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
    backgroundColor: COLOR.DarkGreen,
    height: 70,
  },
  Bottom_Icon_Buttom: {
    width: 20,
    height: 20,
  },
  bottomTabText: {
    fontSize: 12,
    fontWeight: '400',
    marginTop: 5,
    color: COLOR.White,
  },
  tab: {
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingBottom: Platform.OS === 'ios' ? 30 : 4,
  },
});
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
