import React from 'react';
import {
    Dimensions, Image, Platform, StyleSheet,
    Text, TextInput, View
} from 'react-native';
import { COLOR } from '../assets/colors';

const { width } = Dimensions.get('screen');
const Input = ({
    leftIcon = false,
    rightIcon = false,
    label = '',
    placeholder = '',
    LableStyle = {},
    InputStyle = {},
    SectionStyle = {},
    InputProps = {},
    IconPress = () => { },
    ExtraStyle={}
}) => {
    return (
        <View style={[styles.Input,ExtraStyle]}>
            {/* <Text style={[styles.label, LableStyle]}>{label}</Text> */}
            <View style={[styles.SectionStyle, SectionStyle]}>
                {leftIcon ? (
                    <Image source={leftIcon} style={styles.ImageStyle} />
                ) : null}
                <TextInput
                    style={[styles.InputStyle, InputStyle]}
                    placeholder={placeholder}
                    underlineColorAndroid="transparent"
                    placeholderTextColor={COLOR.INPUT_PLACEHOLDE}
                    {...InputProps}
                />
                {rightIcon ? (null
                    //   <ICON
                    //     onPress={IconPress}
                    //     icon={rightIcon}
                    //     style={[styles.ImageStyle, {marginHorizontal: 5}]}
                    //     bg={'theme.0'}
                    //   />
                ) : null}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    Input: {
        width: '100%',
        marginVertical: 7,
    },
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR.INPUT_BG,
        borderWidth: 1,
        borderColor: COLOR.DarkGreen,
        borderRadius: 6,
        paddingHorizontal:16
    },
    ImageStyle: {
        padding: 8,
        height: 18,
        width: 18,
        resizeMode: 'stretch',
        alignItems: 'center',
        marginHorizontal: 14,
    },
    InputStyle: {
        flex: 1,
        height: Platform.isPad ? 60 : 40,
    },
    label: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
});

export default Input;