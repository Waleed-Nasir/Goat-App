/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
    Dimensions,
    Image, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import { COLOR } from '../assets/colors';
import { Assets } from '../assets/images';


const Item = ({ _id = '', total = '', paymentMethod = '', onPress }) => {
    return (

        <TouchableOpacity style={styles.OrderView} onPress={onPress}>
            <View style={styles.OrderInfo}>
                <Image source={Assets.Checkx} style={styles.ph_10} />
                <View style={[styles.ph_10, { flex: 1 }]}>
                    <Text style={styles.OrderText} numberOfLines={1} ellipsizeMode='middle'>Order # {_id}</Text>
                    <Text style={[styles.OrderText, { fontSize: 12 }]}>{paymentMethod}</Text>
                </View>
            </View>
            <View style={styles.PriceInfo}>
                <Text style={styles.PriceText}>{total}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    Main: {
        width: '100%',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: COLOR.White,
        padding: 25
    },
    OrderView: {
        marginVertical: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 16,
        backgroundColor: COLOR.ButtonGreen,
        borderRadius: 6,
        flex: 1,
    },
    OrderInfo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    OrderText: {
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 22,
        color: COLOR.GrayText,
    },
    ph_10: {
        paddingHorizontal: 10,
    },
    PriceInfo: {
        minWidth: 90,
        padding: 5,
        backgroundColor: COLOR.DarkGreen,
    },
    PriceText: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 10,
        lineHeight: 12,
        color: COLOR.White,
        textAlign: 'center',
    },

})

export default Item;
