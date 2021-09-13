import React from "react";
import {
  RefreshControl,
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
import GetKpi from "../api-callers/get-kpi";
import GetAsteroids from "../api-callers/get-asteroids";
import Aurora from "./aurora";
import Asteroids from "./asteroids";
import ISS from "./iss";

export default function HomeComponent({ navigation }) {
  const [kpi, setKpi] = React.useState([]);
  const [asteroids, setAsteroids] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [mainComponent, setMainComponent] = React.useState("aurora");
  const [footerSelected, setFooterSelected] = React.useState({
    aurora: true,
    asteroids: false,
    iss: false,
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    callKPIApi();
    callAsteroidApi();
    wait(700).then(setRefreshing(false));
  }, []);

  React.useEffect(() => {
    //Get the Kpi and then the asteroids
    //the handle will save the results in the redux store and in states

    callAsteroidApi();
    callKPIApi();
  }, []);

  const dispatch = useDispatch();

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const getMainComponent = () => {
    switch (mainComponent) {
      case "aurora":
        return <Aurora kpi={kpi} asteroids={asteroids} />;
      case "asteroids":
        return <Asteroids asteroids={asteroids} />;
      case "ISS":
        return <ISS />;
      default:
        return <Aurora kpi={kpi} asteroids={asteroids} />;
    }
  };
  //#region Handle Screen Changes
  const handleAuroraClick = () => {
    setMainComponent("aurora");
    setFooterSelected({
      aurora: true,
      asteroids: false,
      iss: false,
    });
  };
  const handleAsteroidsClick = () => {
    setMainComponent("asteroids");
    setFooterSelected({
      aurora: false,
      asteroids: true,
      iss: false,
    });
  };
  const handleISSClick = () => {
    setMainComponent("ISS");
    setFooterSelected({
      aurora: false,
      asteroids: false,
      iss: true,
    });
  };
  const getFooterColor = (selected) => {
    return selected ? "#3c1361" : "#A1A1A1";
  };
  //#endregion

  //#region API MANAGEMENT
  /**
   * Call Asteroid api and direct response to handler.
   * @return {}
   */
  const callAsteroidApi = () => {
    GetAsteroids()
      .then((result) => handleAsteroids(result))
      .catch((err) => console.error(err));
  };

  /**
   * Call KPI api and direct response to handler.
   * @return {}
   */
  const callKPIApi = () => {
    GetKpi()
      .then((result) => {
        handleKpi(result);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  /**
   * Handle the kpi from API.
   * @param  {kpi as string}
   */
  const handleKpi = (kpiAsString) => {
    let newKpi;
    if (!kpiAsString) {
      return;
    } else if (kpiAsString === 1) {
      newKpi = [kpiAsString];
    } else {
      newKpi = kpiAsString.split(" ");
    }

    dispatch({ type: "UPDATE_KPI", kpi: newKpi });
    setKpi(newKpi);
  };

  /**
   * Handle Asteroids response.
   * @param  {asteroids as JSON}
   */
  const handleAsteroids = (result) => {
    //console.log(`${JSON.stringify(result, null, 2)}`);

    //UTC -> Same AS Server
    const today = "" + moment().utc(false).format("YYYY-MM-DD");
    const AsteroidsArray = result.near_earth_objects[today];

    if (!AsteroidsArray) {
      return;
    }

    dispatch({ type: "UPDATE_ASTEROIDS", asteroids: AsteroidsArray });
    setAsteroids(AsteroidsArray);
  };
  //#endregion

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    footer: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    footerAsteroid: {
      height: windowHeight * 0.1,
      width: windowWidth * 0.3333,
      backgroundColor: getFooterColor(footerSelected.asteroids),
      textAlign: "center",
      justifyContent: "center",
      borderWidth: 0.5,
      borderColor: "white",
    },
    footerISS: {
      height: windowHeight * 0.1,
      width: windowWidth * 0.3333,
      backgroundColor: getFooterColor(footerSelected.iss),
      justifyContent: "center",
      borderWidth: 0.5,
      borderColor: "white",
    },
    footerAurora: {
      height: windowHeight * 0.1,
      width: windowWidth * 0.3333,
      backgroundColor: getFooterColor(footerSelected.aurora),
      justifyContent: "center",
      borderWidth: 0.5,
      borderColor: "white",
    },
    footerText: {
      textAlign: "center",
      color: "white",
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {getMainComponent()}
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => handleAuroraClick()}
          style={styles.footerAurora}
        >
          <Text style={styles.footerText}>Aurora</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerAsteroid}
          onPress={() => handleAsteroidsClick()}
        >
          <Text style={styles.footerText}>Asteroids Today</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerISS}
          onPress={() => handleISSClick()}
        >
          <Text style={styles.footerText}>ISS Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
