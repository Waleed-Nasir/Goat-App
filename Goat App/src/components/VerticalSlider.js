/**
 * Sample React Native VerticalSlider
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { COLOR } from '../assets/colors';
const VerticalSlider = ({
    data = [],
    row = 0,
    Component = () => { },
    style = {},
    listStyle = {},
}) => {
    return (
        <View style={[styles.VerticalList, style]}>
            <FlatList
                {...listStyle}
                data={data}
                showsHorizontalScrollIndicator={false}
                style={{ paddingVertical: 10 }}
                ListHeaderComponent={() => (
                    <View
                        style={{
                            padding: 5,
                        }}
                    />
                )}
                ListFooterComponent={() => (
                    <View
                        style={{
                            padding: 5,
                        }}
                    />
                )}
                renderItem={({ item, index }) => (
                    <Component {...{ ...item, index: index, row: row }} />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    VerticalList: {
        width: '100%',
    },
    VerticalHeadingList: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    VerticalViewAll: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    VerticalViewAllText: {
        fontSize: 12,
        color: COLOR.White,
        paddingHorizontal: 5,
    },
});

export default VerticalSlider;