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


const CategoriesFor = ({ title = '', isImage = null }) => {
    return (
        <View style={styles.Row}>
            <Text style={styles.MainText}>{title}</Text>
            {isImage ? <View>
                <Image source={isImage == true ? Assets.Goat_ForwardArrow : isImage} />
            </View> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    Row: {
        flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5, marginTop: 10
    },
    MainText: {
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 20,
        lineHeight: 26,
        color: COLOR.DarkGreen,
    },
})

export default CategoriesFor;
