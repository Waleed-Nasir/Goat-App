import React, { useState } from "react";
import { StyleSheet, Text, View, Modal, TextInput, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";

export default function LoaderModal(props) {
  const visibility = useSelector((state) => state.Loader.isVisible);

  const renderContent = () => (
    <View style={styles.modal}>
      <View style={styles.body}>
        <ActivityIndicator  />
      </View>
    </View>
  );

  return (
    <Modal
      visible={props?.visibility ? props?.visibility : visibility}
      statusBarTranslucent
      animationType="fade"
      transparent={true}
      onRequestClose={() => {
        props.setVisibility(!props?.visibility);
      }}
    >
      {renderContent()}
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    backgroundColor: '#ffffff30',
  },
  body: {
    alignSelf: "center",
  },
});