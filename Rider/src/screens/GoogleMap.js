import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
export default function AppMap({ area }) {
  const [position, setPosition] = useState({
    latitude: 24.8607,
    longitude: 67.0011,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  const _mapView = useRef();

  useEffect(() => {
    if (area && area?.latitude && area.longitude) {
      const newLocation = {
        latitude: Number(area?.latitude),
        longitude: Number(area.longitude),
      };
      setPosition({ ...position, ...newLocation });
      _mapView?.current?.animateToRegion(newLocation, 1000);
    }
  }, [area, _mapView]);
  return (
    <View style={styles.container}>
      {/*Render our MapView*/}

      <MapView
        style={styles.map}
        showsUserLocation
        ref={_mapView}
        provider={PROVIDER_GOOGLE}
        showsCompass={true}
        showsMyLocationButton={true}
        chacheEnabled={false}
        zoomEnabled={false}
        region={position}
      >
        <Marker
          title="Your order deliver here"
          //   description="This is a description"
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
