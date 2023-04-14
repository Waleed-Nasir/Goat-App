/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
    Dimensions,
    Image,
    ImageBackground,
    StyleSheet, View
} from 'react-native';
import { SCREENS } from '../../App';
import { Assets } from '../assets/images';
import { useSelector } from 'react-redux';
const { width } = Dimensions.get('screen')



const Splash = () => {
    const navigation = useNavigation();
    const AccessToken = useSelector((state) => state.Auth.accessToken);

    useEffect(() => {
        setTimeout(() => {
            if (AccessToken) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: SCREENS.Deliveries }],
                });
            } else {
                navigation.replace(SCREENS.Welcome);
            }
        }, 3000);
    }, []);

    return (
        <View style={styles.Splash}>
            <ImageBackground source={Assets.BG} resizeMode={'stretch'} style={styles.Center}>
                <Image source={Assets.Logo} style={styles.Logo} />
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    Splash: {
        paddingVertical: 40
    },
    Center: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    Logo: {
        width: width / 1.5,
        height: width / 1.5,
    }

})

export default Splash;
