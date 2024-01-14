import React from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView } from 'react-native';

const Layout = ({ Header = () => { }, Footer = () => { }, children }) => {
    return (
        <SafeAreaView style={styles.layout}>
            {Header()}
            <ScrollView style={styles.scroll} bounces={false} >
                {children}
            </ScrollView>
            {Footer()}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    layout: {
        width: '100%',
        backgroundColor: '#fff',
        flex: 1,
        // paddingHorizontal: 20,
    },
    scroll: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
});

export default Layout;