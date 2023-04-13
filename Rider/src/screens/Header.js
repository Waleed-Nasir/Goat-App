/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
    Dimensions,
    Image, StyleSheet, Text, View
} from 'react-native';
import { COLOR } from '../assets/colors';
import { Assets } from '../assets/images';
const { width } = Dimensions.get('screen')



const Header = () => {
    return (
        <View style={styles.Header}>
            <Image source={Assets.LogoMini} />
            <Text style={styles.Title}>GOAT PURE Rider App</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    Header: {
        backgroundColor: COLOR.DarkGreen,
        height: 90,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        flexDirection: 'row'
    },
    Title: {
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 22,
        lineHeight: 33,
        color: COLOR.White,
        paddingHorizontal: 15
    }

})

export default Header;
