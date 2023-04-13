/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {SCREENS} from '../../App';
import {COLOR} from '../assets/colors';
import {Button} from '../components/Button';
import Input from '../components/Input';
import Layout from '../Layout';
import Header from './Header';
const {width} = Dimensions.get('screen');

const Profile = () => {
  const navigation = useNavigation();
  return (
    <Layout Header={() => <Header showSlider={false} />}>
      <View style={[styles.Row, styles.MT_40, styles.padding20]}>
        <Text style={styles.HeadingText}>Settings</Text>
      </View>
      <View style={styles.padding20}>
        <Input placeholder="Name" />
        <Input placeholder="Email" />
        <Input placeholder="Pasword" />
        <View style={[styles.Row]}>
          <Button
            style={{flex: 0.49}}
            BG={[COLOR.DarkGreen, COLOR.DarkGreen]}
            title="Save"
            onPress={() => {}}
          />
          <Button
            BG={[COLOR.FullGreen, COLOR.FullGreen]}
            style={{flex: 0.49}}
            title="Change"
            onPress={() => {}}
          />
        </View>
      </View>
      <View style={[styles.Row, styles.MT_40, styles.padding20]}>
        <Text style={styles.HeadingText}>Change Password</Text>
      </View>
      <View style={styles.padding20}>
        <Input placeholder="Current Password" />
        <Input placeholder="New Password" />
        <Input placeholder="Re-Enter New Password" />
        <Button
          title="Update"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Button
          title="Logout"
          onPress={() => {
            navigation.navigate(SCREENS.Welcome);
          }}
        />
        <Button
          BG={[COLOR.Red, COLOR.Red]}
          title="Delete Account"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
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
    fontWeight: '500',
    fontSize: 20,
    color: COLOR.DarkGreen,
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  padding20: {
    paddingHorizontal: 30,
    width: '100%',
  },
  MT_40: {
    marginTop: 20,
  },
  MB_10: {
    marginBottom: 10,
  },

  MainText: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    color: COLOR.GrayText,
    marginHorizontal: 10,
    textAlign: 'center',
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
    justifyContent: 'space-between',
  },
  RowItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  Cart: {
    borderRadius: 10,
    backgroundColor: COLOR.ButtonGreen,
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 10,
  },
  IconButton: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
  },
  centerText: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 28,
    color: COLOR.Black,
    lineHeight: 38,
    marginTop: 20,
  },
  Title: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 12,
    color: COLOR.Gray,
    lineHeight: 18,
  },
  MainTitle: {
    fontSize: 10,
    color: COLOR.GrayText,
    fontStyle: 'normal',
    fontWeight: '300',
  },
  GreenRowBack: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.DarkGreen,
    padding: 3,
  },
  RequiredText: {
    textAlign: 'center',
    fontSize: 8,
    fontWeight: '600',
    color: COLOR.White,
  },
});

export default Profile;
