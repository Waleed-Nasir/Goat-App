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
import { useDispatch, useSelector } from 'react-redux';
import { postClaimBottel } from '../store/slice/HomeSlices';
const { width } = Dimensions.get('screen')



const OderDetails = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [deliverymodalVisible, setdeliveryModalVisible] = useState(false);
    const [OrderConfirm, setOrderConfirm] = useState(false);
    const [OrderConfirmSure, setOrderConfirmSure] = useState(false);
    const { OrderDetails } = useSelector((State) => State.Home)
    const [BottelCount, setBottelCount] = useState({
        '1 ltr Bottles': 0,
        '1/2 ltr Bottles': 0
    })
    // const handleConfirm = () => {
    //     if (!OrderConfirmSure) {
    //         setOrderConfirmSure(true)
    //     } else if (OrderConfirm === false) {
    //         setOrderConfirmSure(false)
    //         setOrderConfirm(true)
    //         setTimeout(() => {
    //             setOrderConfirm(false)
    //             setModalVisible(false)
    //         }, 2000);
    //     } else {
    //         setModalVisible(false)
    //     }
    // }

    const CLAIM = {
        "Cash to be Collected": () => <View style={styles.PriceTag}>
            <Text style={styles.PriceText}>Rs {OrderDetails.total}</Text>
        </View>,
        '1 ltr Bottles': (value) => <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.BottleTag}>
            <Text style={styles.BottleText}>{BottelCount['1 ltr Bottles']}</Text>
            <Text style={styles.BottleText}>Claim</Text>
        </TouchableOpacity>,
        '1/2 ltr Bottles': (value) => <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.BottleTag}>
            <Text style={styles.BottleText}>{BottelCount['1/2 ltr Bottles']}</Text>
            <Text style={styles.BottleText}>Claim</Text>
        </TouchableOpacity>,
    }



    const ClaimBottels = {
        "claimedBottles": [
            {
                "_id": OrderDetails?._id,
                "type": "1-liter-bottle",
                "quantity": BottelCount['1 ltr Bottles']
            },
            {
                "_id": OrderDetails?._id,
                "type": "half-liter-bottle",
                "quantity": BottelCount['1/2 ltr Bottles']
            }
        ]
    }

    const value = {
        'Drop Off': 'Flat 123, Block 2332, Gulshan e iqbal, karachi 232132 NL : Sadequain Banqueut',
        'Order #': OrderDetails?._id,
        'Name': OrderDetails?.customer?.name,
        'Contact Number': OrderDetails?.customer?.phone,
        "Cash to be Collected": false,
        '1 ltr Bottles': false,
        '1/2 ltr Bottles': false,
        'Special Instructions': 'qwd',
    }

    const getPostClaimBottel = () => {
        dispatch(postClaimBottel(ClaimBottels))
    }

    return (
        <Layout
            Header={() => <Header />}
        >
            <View style={styles.Main}>
                <Pressable style={styles.HeaderBack} onPress={() => { navigation.goBack() }}>
                    <Image source={Assets.Back} resizeMode={'cover'} />
                    <View style={styles.ph_10}>
                        <Text style={styles.HeaderText}>Order Details</Text>
                    </View>
                </Pressable>
                <Pressable onPress={() => { navigation.navigate(SCREENS.MapView) }} style={styles.detailsMap}>
                    <Image source={Assets.MiniMap} resizeMode={'cover'} />
                </Pressable>
                <View style={styles.MainView}>
                    <View style={styles.OrderView}>
                        {Object.keys(value).map((item) => <View style={styles.Row}>
                            <View style={styles.OrderInfo}>
                                <View style={styles.ph_10}>
                                    <Text style={styles.TitleText}>{item}</Text>
                                </View>
                            </View>
                            <View style={styles.PriceInfo}>
                                {value[item] != false ? <Text style={styles.InfoText}>{value[item]}</Text> : CLAIM[item] && CLAIM[item](100)
                                }
                            </View>
                        </View>)}
                    </View>
                </View>

            </View>
            <BottleModal modalVisible={modalVisible} HeaderText={OrderConfirm ? '' : 'Please enter the empty bottles received from the customer'} >
                {OrderConfirm ? <View style={styles.ph_10}>
                    <Text style={styles.TitleText}>Please keep the bootles safe!
                        The warehouse Manager will ask for the bottles?</Text>
                </View> : <>
                    <View style={[styles.Row, { marginBottom: 0 }]}>
                        <View style={styles.OrderInfo}>
                            <View style={styles.ph_10}>
                                <Text style={styles.TitleText}>1 ltr Bottles</Text>
                            </View>
                        </View>
                        <View style={styles.PriceInfo}>
                            <Input
                                InputProps={{
                                    value: BottelCount['1 ltr Bottles'],
                                    placeholder: "0",
                                    onChangeText: (value) => setBottelCount((pre) => ({ ...pre, '1 ltr Bottles': value })),
                                    keyboardType: "numeric",
                                }}
                                ExtraStyle={{ width: 80 }} />
                        </View>
                    </View>
                    <View style={[styles.Row, { marginTop: 0 }]}>
                        <View style={styles.OrderInfo}>
                            <View style={styles.ph_10}>
                                <Text style={styles.TitleText}>1/2 ltr Bottles</Text>
                            </View>
                        </View>
                        <View style={styles.PriceInfo}>
                            <Input
                                InputProps={{
                                    value: BottelCount['1/2 ltr Bottles'],
                                    placeholder: "0",
                                    onChangeText: (value) => setBottelCount((pre) => ({ ...pre, '1/2 ltr Bottles': value })),
                                    keyboardType: "numeric",
                                }}
                                ExtraStyle={{ width: 80 }} />
                        </View>
                    </View>
                </>}
                {!OrderConfirm && <Button title='Click To Confirm' onPress={() => {
                    getPostClaimBottel()
                    setOrderConfirm(true)
                    setTimeout(() => {
                        setOrderConfirm(false)
                        setModalVisible(false)
                    }, 2000);
                }} />}
            </BottleModal>
            <View style={[styles.MainView, { paddingTop: 0 }]}>
                <Button title='DELIVERED' onPress={() => setdeliveryModalVisible(true)} />
                <Button title='Get Help With Order' onPress={() => { navigation.navigate(SCREENS.Reason) }} />
                <Button style={{ borderRadius: 0 }} BG={[COLOR.Red, COLOR.Red]} title='NOT DELIVERED' onPress={() => { navigation.navigate(SCREENS.Reason) }} />
            </View>
            <BottleModal modalVisible={deliverymodalVisible} HeaderText={OrderConfirmSure ? 'Order Delivery is Confirmed' : 'Are you Sure?'} >
                {OrderConfirmSure ? <Image source={Assets.Done} style={{ marginTop: 20 }} /> :
                    <>
                        <View style={[styles.Row, { marginVertical: 30 }]}>
                            <Text style={styles.TitleText}>Please confirm if  the order has been delivered</Text>
                        </View>
                        <View style={[styles.Row, { marginTop: 0 }]}>
                            <View style={[styles.OrderInfo, { marginHorizontal: 3 }]}>
                                <Button BG={[COLOR.DarkGreen, COLOR.DarkGreen,]} title='Cancel' onPress={() => {
                                    setOrderConfirmSure(false)
                                    setdeliveryModalVisible(false)
                                }} />
                            </View>
                            <View style={[styles.PriceInfo, { marginHorizontal: 3 }]}>
                                <Button title='CONFIRM' onPress={() => {
                                    setOrderConfirmSure(true)
                                    setTimeout(() => {
                                        setOrderConfirmSure(false)
                                        setdeliveryModalVisible(false)
                                    }, 2000);
                                }} />
                            </View>
                        </View>
                    </>}

            </BottleModal>
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
    OrderView: {
        marginVertical: 22,
        // flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: COLOR.ButtonGreen,
        borderRadius: 6,
    },
    OrderInfo: {
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    TitleText: {
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 22,
        color: COLOR.GrayText,
        textAlign: 'left'
    },
    InfoText: {
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 22,
        color: COLOR.GrayText,
        textAlign: 'right'
    },
    ph_10: {
        paddingHorizontal: 10
    },
    PriceInfo: {
        width: '50%',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    PriceTag: {
        width: '100%',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    PriceText: {
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 14,
        color: COLOR.White,
        textAlign: 'center',
        backgroundColor: COLOR.DarkGreen,
        paddingHorizontal: 20,
        paddingVertical: 6
    },
    BottleTag: {
        maxWidth: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    BottleText: {
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 14,
        color: COLOR.White,
        textAlign: 'center',
        backgroundColor: COLOR.DarkGreen,
        paddingHorizontal: 14,
        paddingVertical: 6, marginLeft: 20
    },
    detailsMap: {
        width: width,
        height: width - 130
    },
    HeaderBack: {
        width: '100%',
        // height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10
    },
    HeaderText: {
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 20,
        lineHeight: 28,
        color: COLOR.DarkGreen,
        textAlign: 'right'
    }

})

export default OderDetails;


