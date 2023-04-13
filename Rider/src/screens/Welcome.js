/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    Dimensions,
    Image,
    ImageBackground,
    StyleSheet, View,
    Text
} from 'react-native';
import { COLOR } from '../assets/colors';
import { FONTFAMILY } from '../assets/fonts';
import { Assets } from '../assets/images';
import { Button } from '../components/Button';
const { width } = Dimensions.get('screen')
import { SCREENS } from '../../App';



const Welcome = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.Welcome}>
            <View style={styles.Main}>
                <Text style={styles.Heading}>Welcome</Text>
                <Text style={styles.SubText}>Pellentesque finibus dui sed porta blandit. Fusce maximus, nisi vel dictum.</Text>
                <Button title='Sign in'  onPress={()=>navigation.navigate(SCREENS.SingIn)}/>
                <Button BG={COLOR.ButtonLightGreenGradient} color={COLOR.DarkGreen} title='Register'  onPress={()=>navigation.navigate(SCREENS.SingUp)}/>
                <View style={styles.Extra} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    Welcome: {
        flex: 1,
    },
    Main: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 40
    },
    Heading: {
        // fontFamily: FONTFAMILY.ManropeMedium,
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 48,
        lineHeight: 66,
        color: COLOR.DarkGreen,
        paddingBottom: 8
    },
    SubText: {
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 22,
        color: COLOR.TextGreen,
        textAlign: 'center',
        paddingBottom: 36
    },
    Extra: {
        height: 120
    }

})

export default Welcome;
