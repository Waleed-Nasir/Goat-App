/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {SCREENS} from '../../App';
import {COLOR} from '../assets/colors';
import {FONTFAMILY} from '../assets/fonts';
import {Assets} from '../assets/images';
import {Button} from '../components/Button';
import Input from '../components/Input';
const {width} = Dimensions.get('screen');

const SingUp = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.SingUp}>
      <Image
        source={Assets.SignUpTopBG}
        style={styles.Top}
        resizeMode={'stretch'}
      />
      <View style={styles.Main}>
        <Text style={styles.Heading}>Register</Text>
        <KeyboardAvoidingView
          style={{
            flex: 1,
            width: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
          behavior="padding"
          enabled>
          <ScrollView showsHorizontalScrollIndicator={false}>
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.SubText}>Please Enter Your Information</Text>
              <Input SectionStyle={{marginTop: 8}} placeholder="Full Name" />
              <Input SectionStyle={{marginTop: 8}} placeholder="Email" />
              <Input SectionStyle={{marginTop: 8}} placeholder="Password" />
              <Input
                SectionStyle={{marginTop: 8}}
                placeholder="Confirm Password"
              />
              <Input SectionStyle={{marginTop: 8}} placeholder="Phone" />
              <View style={styles.Extra} />
              <Button
                title="Create Account"
                onPress={() => {
                  navigation.navigate(SCREENS.Deliveries);
                }}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      <View style={styles.Bottom}>
        <Text style={styles.MiniText}>
          By creating your account, you agree to Goat Pure{' '}
          <Text style={styles.CL_Green}>Privacy Policy</Text> and{' '}
          <Text style={styles.CL_Green}>Terms of Use. </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  SingUp: {
    flex: 1,
    backgroundColor: COLOR.White,
  },
  Top: {
    flex: 0.2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: COLOR.White,
  },
  Main: {
    flex: 0.7,
    width: '100%',
    backgroundColor: COLOR.White,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 36,
    paddingTop: 20,
  },
  Heading: {
    // fontFamily: FONTFAMILY.ManropeMedium,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 48,
    lineHeight: 66,
    color: COLOR.DarkGreen,
    paddingBottom: 8,
  },
  SubText: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 22,
    color: COLOR.TextGreen,
    textAlign: 'center',
    paddingBottom: 16,
  },
  Message: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  Extra: {
    paddingVertical: 20,
  },
  Bottom: {
    flex: 0.1,
    width: '100%',
    paddingHorizontal: 36,
    backgroundColor: COLOR.White,
  },
  MiniText: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 19,
    color: COLOR.GrayText,
    textAlign: 'center',
    flex: 1,
  },
  CL_Green: {
    color: COLOR.DarkGreen,
  },
});

export default SingUp;
