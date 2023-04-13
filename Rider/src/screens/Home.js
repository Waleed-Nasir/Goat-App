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
    Image,
    ImageBackground,
    StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import { COLOR } from '../assets/colors';
import { Assets } from '../assets/images';
import Layout from '../Layout';
import Header from './Header';
const { width } = Dimensions.get('screen')



const Home = () => {
    return (
        <Layout
            Header={() => <Header />}
        >
            <View style={styles.Main}>
                <TouchableOpacity style={styles.HomeButton}>
                    <Image source={Assets.GoOrders} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.HomeButton}>
                    <Image source={Assets.Hostory} />
                </TouchableOpacity>
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
        backgroundColor: COLOR.White
    },
    HomeButton: {
        marginVertical: 22
    }

})

export default Home;
