/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    ImageBackground,
    StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import { SCREENS } from '../../App';
import { COLOR } from '../assets/colors';
import { Assets } from '../assets/images';
import Item from '../components/Item';
import Tabs from '../components/Tabs';
import Layout from '../Layout';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails } from '../store/slice/HomeSlices';
const { width } = Dimensions.get('screen')


const Orders = {
    0: [
        { OrderNo: 'Order # 1202134', Status: 'Rs 1,000.14', Type: 'COD' },
        { OrderNo: 'Order # 1202134', Status: 'Rs 1,00', Type: 'CHARGED' },
        { OrderNo: 'Order # 1202134', Status: 'Rs 1,000', Type: 'CHARGED' },
        { OrderNo: 'Order # 1202134', Status: 'Rs 3,00', Type: 'CHARGED' },
        { OrderNo: 'Order # 1202134', Status: 'Rs 5,000', Type: 'COD' },
        { OrderNo: 'Order # 1202134', Status: 'Rs 1,400', Type: 'COD' },
        { OrderNo: 'Order # 1202134', Status: 'Rs 1,000', Type: 'CHARGED' },
        { OrderNo: 'Order # 1202134', Status: 'Rs 1,900', Type: 'COD' },
    ],
    1: [
        { OrderNo: 'Order # 1202134', Status: 'Rs 1,00', Type: 'CHARGED' },
        { OrderNo: 'Order # 1202134', Status: 'Rs 1,000', Type: 'CHARGED' },
        { OrderNo: 'Order # 1202134', Status: 'Rs 3,00', Type: 'CHARGED' },
        { OrderNo: 'Order # 1202134', Status: 'Rs 1,000', Type: 'CHARGED' },
    ],
    2: [
        { OrderNo: 'Order # 1202134', Status: 'Rs 1,000.14', Type: 'COD' },
        { OrderNo: 'Order # 1202134', Status: 'Rs 5,000', Type: 'COD' },
        { OrderNo: 'Order # 1202134', Status: 'Rs 1,400', Type: 'COD' },
        { OrderNo: 'Order # 1202134', Status: 'Rs 1,900', Type: 'COD' },
    ]
}

const Deliveries = () => {
    const dispatch = useDispatch()
    const [current, handleSelction] = useState(0)
    const navigation = useNavigation();
    const { OrderList } = useSelector((State) => State.Home)

    const fetchOrderDetails = (id) => {
        dispatch(getOrderDetails({ orderId: id }))
        navigation.navigate(SCREENS.OderDetails)
    }


    return (
        <Layout
            Header={() => <Header />}
        >
            <View style={styles.Main}>
                <Tabs current={current} handleSelction={handleSelction} />
                <View style={{ height: 30 }} />
                {OrderList.map((item) => <Item {...item} onPress={() => fetchOrderDetails(item._id)} />)}
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
        padding: 25
    },


})

export default Deliveries;
