/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
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
import { SCREENS } from '../../App';
import { COLOR } from '../assets/colors';
import { FONTFAMILY } from '../assets/fonts';
import { Assets } from '../assets/images';
import { Button } from '../components/Button';
import Input from '../components/Input';
import { Validator } from '../utils/Constant';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slice/AuthSlicer';
const { width } = Dimensions.get('screen');

const SingIn = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState(__DEV__ ? "test2@test.com" : "");
  const [password, setpassword] = useState(__DEV__ ? "12345678" : "");
  const [ShowPassword, setShowPassword] = useState(false);
  const AccessToken = useSelector((state) => state.Auth.accessToken);

  const SignIn = () => {
    let params = { email, password };
    const isValid = Validator(params);
    if (isValid) {
      dispatch(login(params));
    }
  };

  useEffect(() => {
    if (AccessToken) {
      navigation.reset({
        index: 0,
        routes: [{ name: SCREENS.Deliveries }],
      });
    }
  }, [AccessToken]);
  return (
    <View style={styles.SingIn}>
      <ImageBackground
        source={Assets.SignInTopBG}
        resizeMode={'stretch'}
        style={styles.Top}>
        <Image source={Assets.LogoSmall} style={styles.Logo} />
      </ImageBackground>
      <ScrollView
        style={{ flex: 1, backgroundColor: COLOR.White }}
        contentContainerStyle={{ flexGrow: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          keyboardVerticalOffset={100}
          behavior={'position'}>
          <View style={styles.Main}>
            <Text style={styles.Heading}>Sing In</Text>
            <Text style={styles.SubText}>Welcome back, We missed you.</Text>
            <Input
              InputProps={{
                value: email,
                placeholder: "Example@mail.com",
                onChangeText: setEmail,
              }}
            />
            <Input placeholder="Password"
              rightIcon={ShowPassword ? Assets.EyeGray : Assets.EyeSlashGray}
              IconPress={() => {
                setShowPassword(!ShowPassword);
              }}
              InputProps={{
                value: password,
                secureTextEntry: !ShowPassword,
                placeholder: "********",
                onChangeText: setpassword,
              }}
            />
            <View style={styles.Message}>
              {/* <Text style={styles.Error}>Email or password is incorrect.</Text> */}
              <Text style={styles.MiniText}>Forget password</Text>
            </View>
            <Button
              title="Sign in"
              onPress={() => {
                SignIn()

              }}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  SingIn: {
    flex: 1,
  },
  Top: {
    flex: 0.4,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: COLOR.White,
  },
  Logo: {
    marginBottom: 40,
  },
  Main: {
    flex: 0.6,
    width: '100%',
    backgroundColor: COLOR.White,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 36,
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
    paddingBottom: 36,
  },
  Message: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  MiniText: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 19,
    color: COLOR.TextGreen,
    textAlign: 'right',
    paddingBottom: 26,
    paddingTop: 6,
    flex: 1,
  },
  Error: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 19,
    color: COLOR.Error,
    textAlign: 'left',
    paddingBottom: 26,
    paddingTop: 6,
    flex: 1,
  },
});

export default SingIn;
