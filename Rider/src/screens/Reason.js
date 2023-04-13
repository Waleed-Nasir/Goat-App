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
    Image,
    ImageBackground,
    Pressable,
    StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import { COLOR } from '../assets/colors';
import { Assets } from '../assets/images';
import Layout from '../Layout';
import Header from './Header';
import MapView from 'react-native-maps';
import BottleModal from '../components/BottleModal';
import Input from '../components/Input';
import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '../../App';
const { width } = Dimensions.get('screen')



const Reason = () => {
    const navigation = useNavigation();
    const [ReasonFor, setReasonFor] = useState(['Customer Unavailable', 'Wrong Address', 'Customer Out of reach', 'Other reason....']);
    const [Selected, setSelected] = useState(null);

    return (
        <Layout
            Header={() => <Header />}
        >
            <View style={styles.Main}>
                <Pressable style={styles.HeaderBack}>
                    <View style={styles.ph_10}>
                        <Text style={styles.HeaderText}>Reason For Not Delivered?</Text>
                    </View>
                </Pressable>
            </View>

            <View style={[styles.MainView, { paddingTop: 0 }]}>

                {ReasonFor?.map((item, index) => <TouchableOpacity onPress={() => setSelected(index)} key={index} style={styles.OrderView}>
                    <View style={styles.OrderInfo}>
                        <View style={styles.ph_10}>
                            <Text style={styles.OrderText}>{item}</Text>
                        </View>
                    </View>
                    <View style={styles.PriceInfo}>
                        {Selected === index ? <View style={styles.checked} /> : null}
                    </View>
                </TouchableOpacity>)}
                <Input ExtraStyle={{ marginBottom: 30 }} placeholder='Write a Reason......' InputProps={{ numberOfLines: 10, multiline: true }} InputStyle={{ height: 120 }} />
                <Button title='Submit' onPress={() => { navigation.goBack() }} />
            </View>

        </Layout>
    );
};

const styles = StyleSheet.create({
    Main: {
        width: '100%',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: COLOR.White,
    },
    MainView: {
        padding: 26,
    },
    Row: {
        flexDirection: 'row',
        marginVertical: 10,
    },

    HeaderBack: {
        width: '100%',
        // height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 60,
        paddingBottom: 10
    },
    HeaderText: {
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 22,
        lineHeight: 28,
        color: COLOR.DarkGreen,
        textAlign: 'right'
    },
    OrderView: {
        marginVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 16,
        backgroundColor: COLOR.ButtonGreen,
        borderRadius: 6
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
        color: COLOR.DarkGreen,
    },
    ph_10: {
        paddingHorizontal: 10
    },
    PriceInfo: {
        width: 16,
        height: 16,
        backgroundColor: COLOR.GrayBox,
        padding: 3
    },
    PriceText: {
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 8,
        lineHeight: 12,
        color: COLOR.White,
        textAlign: 'center',
    },
    checked: {
        width: '100%',
        height: '100%',
        backgroundColor: COLOR.DarkGreen
    }

})

export default Reason;

