import { StyleSheet, Text, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
export default function AppMap() {
  return (
    <View style={styles.container}>
      {/*Render our MapView*/}
      <MapView
        style={styles.map}
        //specify our coordinates.
        showsUserLocation
        provider={PROVIDER_GOOGLE}
      region={{
         latitude: 37.78825,
         longitude: -122.4324,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
      />
    </View>
  );
}
//create our styling code:
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
