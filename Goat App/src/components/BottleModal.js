import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { COLOR } from "../assets/colors";

const BottleModal = ({ HeaderText = false, children, modalVisible = false }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
            <View style={styles.centeredView}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {HeaderText ? <Text style={styles.HeaderText}>{HeaderText}</Text> : null}
                        {children}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 14,
        width: '100%'
    },
    modalView: {
        backgroundColor: COLOR.ButtonGreen,
        borderRadius: 4,
        padding: 26,
        alignItems: "center",
        width: '100%',
        borderColor: COLOR.DarkGreen,
        borderWidth: 1
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    HeaderText: {
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 14,
        color: COLOR.White,
        textAlign: 'center',
        backgroundColor: COLOR.DarkGreen,
        padding: 10,
        width: '100%'
    },
});

export default BottleModal;