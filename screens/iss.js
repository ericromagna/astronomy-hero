import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";
import moment from "moment";
import { GetIss, GetLocation, GetLocationURL } from "../api-callers/get-iss";
import StyleCommons from "../commons/style.json";

export default function ISSComponent(props) {
  const [iss, setIss] = React.useState({});
  const [local, setLocation] = React.useState({});
  const [localImage, setImage] = React.useState(
    "https://image.thum.io/get/png/width/1200/https://www.google.com/maps/@40.7856246,-73.9447593,14z"
  );

  React.useEffect(() => {
    HandleAPIsCall();
  }, []);

  const HandleAPIsCall = async () => {
    const issRes = await GetIss().catch((err) => {
      console.error(`GetIss error: ${err}`);
      return null;
    });

    setIss(issRes[0]);

    console.log(`${issRes[0]?.latitude}.${issRes[0]?.longitude}`);

    const locationRes = await GetLocation(
      issRes[0]?.latitude,
      issRes[0]?.longitude
    ).catch((err) => {
      console.error(`GetLocation error: ${err}`);
      return null;
    });

    console.log(`locationRes = ${JSON.stringify(locationRes, null, 2)}`);
    setLocation(locationRes);

    const url = await GetLocationURL(locationRes?.map_url).catch((err) => {
      console.error(`GetLocationURL error: ${err}`);
      return null;
    });

    console.log(`${locationRes?.map_url}`);
    console.log(`${url}`);
    //setImage(url);
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
            <Text>{local.map_url}</Text>
            <View style={styles.issImageContainer}>
              <Image
                style={styles.issImage}
                source={{
                  uri: localImage,
                }}
              />
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const normalTextFontSize = windowHeight * 0.03;
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
  issImage: {
    width: windowWidth * 0.9,
    height: windowWidth * 0.9,
  },
  firstMessage: {
    color: StyleCommons.mainColor,
    marginTop: 0,
    fontWeight: "700",
    fontSize: headerTextFontSize,
    textAlign: "center",
    margin: 10,
  },
});
