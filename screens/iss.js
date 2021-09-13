import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from "react-native";
import { GetIss, GetLocation, GetLocationURL } from "../api-callers/get-iss";
import StyleCommons from "../commons/style.json";
import MapView, { Marker } from "react-native-maps";

export default function ISSComponent(props) {
  const [mapRegion, setmapRegion] = React.useState({
    latitude: 43.6426,
    longitude: -79.3871,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [location, setCountryLocation] = React.useState("");

  React.useEffect(() => {
    HandleAPIsCall();
  }, []);

  const HandleAPIsCall = async () => {
    const issRes = await GetIss().catch((err) => {
      console.error(`GetIss error: ${err}`);
      return null;
    });

    const locationRes = await GetLocation(
      issRes[0]?.latitude,
      issRes[0]?.longitude
    ).catch((err) => {
      console.error(`GetLocation error: ${err}`);
      return null;
    });

    if (issRes[0]?.latitude && issRes[0]?.longitude) {
      UpdateCoordenates(issRes[0], locationRes.country_code);
    }

    if (locationRes?.country_code) {
      setCountryLocation(locationRes.country_code);
    }
  };

  const UpdateCoordenates = (coordenates, countryCode) => {
    const delta = countryCode ? 10 : 50;
    setmapRegion({
      latitude: coordenates.latitude,
      longitude: coordenates.longitude,
      latitudeDelta: delta,
      longitudeDelta: delta,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <ImageBackground
          source={require("../assets/aurora2.jpg")}
          resizeMode="stretch"
          style={styles.image}
        >
          <View style={styles.header}>
            <Text style={styles.firstMessage}>
              Where is the International Space Station now?
            </Text>
            {/* <Text style={styles.firstMessage}>{location}</Text> */}
            <View style={styles.issImageContainer}>
              <MapView style={styles.map} region={mapRegion}>
                <Marker coordinate={mapRegion} title="Marker" />
              </MapView>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}

const windowHeight = Dimensions.get("window").height;
const headerTextFontSize = windowHeight * 0.04;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 0.1,
    alignContent: "center",
    marginBottom: "20%",
    marginTop: windowHeight * 0.075,
  },
  footer: {
    flex: 1,
    alignContent: "center",
    marginBottom: "20%",
    marginTop: "5%",
  },
  image: {
    flex: 1,
    height: windowHeight,
  },
  issImageContainer: {
    alignItems: "center",
  },
  firstMessage: {
    color: StyleCommons.mainColor,
    marginTop: 0,
    fontWeight: "700",
    fontSize: headerTextFontSize,
    textAlign: "center",
    margin: 10,
  },
  map: {
    alignSelf: "stretch",
    height: windowHeight * 0.65,
    margin: "5%",
  },
});
