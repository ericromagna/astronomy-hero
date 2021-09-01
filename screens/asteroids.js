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
import StyleCommons from "../commons/style.json";
import Asteroid from "../components/asteroid-component";
import moment from "moment";

export default function AsteroidsComponent(props) {
  const [fillEmpty, setFillEmpty] = React.useState(0); //Not filling greate about this....

  React.useEffect(() => {
    const asteroidNumber = props.asteroids.length;
    const fills = asteroidNumber > 9 ? 0 : 10 - asteroidNumber;
    setFillEmpty(fills);
  }, []);

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
    text: {
      color: StyleCommons.mainColor,
      marginLeft: "10%",
      marginRight: "10%",
      fontWeight: "700",
      fontSize: 18,
    },
    image: {
      flex: 1,
    },
    firstMessage: {
      color: StyleCommons.mainColor,
      marginTop: 0,
      fontWeight: "700",
      fontSize: headerTextFontSize,
      textAlign: "center",
    },
    message: {
      color: StyleCommons.mainColor,
      marginLeft: windowWidth / 10,
      marginRight: windowWidth / 10,
      marginTop: 0,
      fontWeight: "700",
      fontSize: normalTextFontSize,
      textAlign: "auto",
    },
    textFill: {
      height: windowHeight * fillEmpty * 0.1,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <ImageBackground
          source={require("../assets/aurora2.jpg")}
          resizeMode="stretch"
          style={styles.image}
        >
          <View style={styles.header}>
            <Text style={styles.message}>
              Closest Asteroids to Earth on {moment().format("MMM Do YY")}
            </Text>
            <Text></Text>
            {props?.asteroids.map((asteroid, index) => (
              <Asteroid asteroid={asteroid} key={index} />
            ))}
            <Text style={styles.textFill}></Text>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}
