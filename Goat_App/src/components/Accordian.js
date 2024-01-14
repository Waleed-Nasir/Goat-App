import React, {Component, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import {COLOR} from '../assets/colors';
import {Assets} from '../assets/images';

const Accordian = ({
  title = '',
  details = '',
  image = false,
  BG = COLOR.ButtonGreen,
  showGoat = true,
  style = {},
  styleChild = {},
  textStyle = {},
  right = 6,
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  return (
    <View style={styles.parentHr}>
      <TouchableOpacity
        style={[styles.row, {backgroundColor: BG}, style]}
        onPress={() => toggleExpand()}>
        {showGoat ? (
          <Image source={Assets.Goat_MiniGoat} style={{right}} />
        ) : null}
        <View style={{flexDirection: 'row', flex: 1}}>
          <Text style={[styles.title, textStyle]} ellipsizeMode={'tail'}>
            {title}
          </Text>
        </View>
        <Image
          source={expanded ? Assets.Goat_C_Dash : Assets.Goat_C_Plus}
          size={30}
        />
      </TouchableOpacity>
      {expanded && (
        <View style={[styles.child, {backgroundColor: BG}, styleChild]}>
          {image ? (
            <Image
              source={image}
              resizeMethod={'auto'}
              resizeMode={'center'}
              style={{width: '100%'}}
            />
          ) : (
            <Text style={styles.childText}>{details}</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: COLOR.DarkGreen,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 56,
    paddingLeft: 25,
    paddingRight: 18,
    alignItems: 'center',
    // backgroundColor: COLOR.ButtonGreen,
  },
  parentHr: {
    width: '100%',
    marginVertical: 5,
  },
  child: {
    // backgroundColor: COLOR.ButtonGreen,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  childText: {
    color: COLOR.GrayText,
  },
});
export default Accordian;
