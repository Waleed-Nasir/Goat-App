import React from "react";
import { BaseToast, ErrorToast } from "react-native-toast-message";

/*
  1. Create the config
*/
const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "#a4de02" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "400",
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 15,
        color: "red",
      }}
      text2Style={{
        fontSize: 12,
      }}
    />
  ),
  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.
    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
  //   POB: ({text1, props}) => (
  //     <View {...props}>
  //       <Text>{text1}</Text>
  //       <Text>{props.uuid}</Text>
  //     </View>
  //   ),
};

export default toastConfig;