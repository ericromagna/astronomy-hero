import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Button,
} from "react-native";
import moment from "moment";
import StyleCommons from "../commons/style.json";
import Gauge from "../components/main-gauge-component";

export default function AuroraComponent(props) {
  React.useEffect(() => {
    //Get the Kpi and then the asteroids
    //the handle will save the results in the redux store and in states
  }, []);

  const getAuroraMessage = () => {
    if (props.kpi.length === 0) {
      return "Retrieving data...";
    }

    const currentKpi = Number(props.kpi[props.kpi.length - 1]);
    if (currentKpi > 6) {
      return "Aurora is very active!";
    } else if (currentKpi > 3) {
      return "Aurora level is medium";
    } else {
      return "Aurora is quiet";
    }
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
            <Text style={styles.firstMessage}>KPI Index at</Text>
            <Text style={styles.firstMessage}>{moment().toLocaleString()}</Text>
            <Gauge style={styles.gauge} kpi={props.kpi} />
            <Text style={styles.firstMessage}>{getAuroraMessage()}</Text>
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
  buttons: {
    flex: 0.3,
    width: 10,
  },
  logo: {
    width: "100%",
    height: 200,
  },
  newAccountButton: {
    alignItems: "center",
    padding: "3%",
    width: "80%",
    height: 50,
    marginLeft: "10%",
    marginTop: "10%",
    backgroundColor: StyleCommons.secundaryColor,
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
    height: windowHeight,
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
  gauge: {
    marginTop: 0,
    padding: 0,
  },
  footer: {},
});
