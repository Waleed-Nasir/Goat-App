/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {COLOR} from '../assets/colors';
import {FONTFAMILY} from '../assets/fonts';
import {Assets} from '../assets/images';
import {Button} from '../components/Button';
const {width, height} = Dimensions.get('screen');
import {SCREENS} from '../../App';

import {Animated} from 'react-native';

const FadeInView = props => {
  const fadeAnim = useRef(new Animated.Value(height)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1500,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        transform: [
          {
            translateY: fadeAnim,
          },
        ], // Bind opacity to animated value
      }}>
      {props.children}
    </Animated.View>
  );
};

const Welcome = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.Welcome}>
      <ImageBackground
        source={Assets.SignInTopBG}
        resizeMode={'cover'}
        style={styles.Top}>
        <FadeInView
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}>
          <Image source={Assets.LogoSmall} style={styles.Logo} />
          <Text style={styles.LogoHeading}>GOAT PURE</Text>
          <Text style={styles.LogoSubText}>
            Nourish Yourself With Pure &{'\n'}Organic Goat Products
          </Text>
        </FadeInView>
      </ImageBackground>
      <View style={styles.Main}>
        <Text style={styles.Heading}>Welcome</Text>
        <Text style={styles.SubText}>
          Pellentesque finibus dui sed porta blandit. Fusce maximus, nisi vel
          dictum.
        </Text>
        <Button
          title="Sign in"
          onPress={() => navigation.navigate(SCREENS.SingIn)}
        />
        <Button
          BG={COLOR.ButtonLightGreenGradient}
          color={COLOR.DarkGreen}
          title="Register"
          onPress={() => navigation.navigate(SCREENS.SingUp)}
        />
        <Text style={styles.Bro}  onPress={() => navigation.navigate(SCREENS.Home)}>Just Browse</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Welcome: {
    flex: 1,
  },
  Main: {
    flex: 0.5,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 40,
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
    fontWeight: '300',
    fontSize: 16,
    lineHeight: 22,
    color: COLOR.TextGreen,
    textAlign: 'center',
    paddingBottom: 36,
  },
  Top: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.White,
  },
  Logo: {
    marginBottom: 40,
  },
  Bro: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 22,
    color: COLOR.GrayText,
    textAlign: 'center',
    paddingVertical: 10,
    width: '100%',
  },
  LogoHeading: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 25,
    color: COLOR.DarkGreen,
    paddingBottom: 8,
  },
  LogoSubText: {
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: 15,
    color: COLOR.DarkGreen,
    textAlign: 'center',
  },
  
});

export default Welcome;
