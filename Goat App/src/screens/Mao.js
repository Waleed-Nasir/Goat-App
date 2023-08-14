import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
export default function AppMap() {
  const [position, setPosition] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  // useEffect(() => {
  //   Geolocation.getCurrentPosition((pos) => {
  //     const crd = pos.coords;
  //     setPosition({
  //       latitude: crd.latitude,
  //       longitude: crd.longitude,
  //       latitudeDelta: 0.0421,
  //       longitudeDelta: 0.0421,
  //     });
  //   }).catch((err) => {
  //     console.log(err);
  //   });
  // }, []);
  return (
    <View style={styles.container}>
      {/*Render our MapView*/}
      <MapView
        style={styles.map}
        //specify our coordinates.
        showsUserLocation
        provider={PROVIDER_GOOGLE}
        showsCompass = {true}
      showsMyLocationButton={true}
      chacheEnabled={false}
      zoomEnabled={true}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        // onUserLocationChange={(locationChangedResult) => {
        //   setPosition({
        //     latitude: locationChangedResult.nativeEvent.coordinate.latitude,
        //     longitude: locationChangedResult.nativeEvent.coordinate.longitude,
        //     latitudeDelta: 0.004,
        //     longitudeDelta: 0.004,
        //   });
        // }}
        onRegionChange={(r)=>{setPosition(r)}}
      >
        <Marker
          title="Yor are here"
          description="This is a description"
          coordinate={position}
        />
      </MapView>
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
