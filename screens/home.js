import React from 'react';
import { RefreshControl, ImageBackground, StyleSheet, Text,
  View, SafeAreaView, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useDispatch  } from 'react-redux';
import GetKpi from '../api-callers/get-kpi';
import GetAsteroids from '../api-callers/get-asteroids';
import StyleCommons  from '../commons/style.json';
import Gauge from '../components/main-gauge-component'
import Asteroid from '../components/asteroid-component'
import moment from 'moment';

export default function HomeComponent({ navigation }) {

  const [kpi, setKpi] = React.useState([]);
  const [asteroids, setAsteroids] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

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
  },[]);

  const dispatch = useDispatch();

  const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  const getAuroraMessage = () => {
    if (kpi.length === 0) {
      return "Retrieving data..."
    }

    const currentKpi = Number(kpi[kpi.length - 1]);
    if (currentKpi > 6) {
      return "Aurora is very active!"
    }
    else if (currentKpi > 3) {
      return "Aurora level is medium"
    }
    else {
      return "Aurora is quiet"
    }
  };

  //#region API MANAGEMENT
  /**
  * Call Asteroid api and direct response to handler.
  * @return {}
  */
  const callAsteroidApi = () => {
    GetAsteroids()
      .then(result => handleAsteroids(result))
      .catch(err => console.error(err));
  }

  /**
  * Call KPI api and direct response to handler.
  * @return {}
  */
  const callKPIApi = () => {
    GetKpi()
    .then(result => { handleKpi(result) })
    .catch(err => {console.error(err)});
  }

  /**
  * Handle the kpi from API.
  * @param  {kpi as string}
  */
  const handleKpi = (kpiAsString) => {
    //console.log(`${kpiAsString}`);
    const newKpi = kpiAsString.split(' ');
    dispatch({ type: 'UPDATE_KPI', kpi: newKpi});
    setKpi(newKpi);
  }

  /**
  * Handle Asteroids response.
  * @param  {asteroids as JSON} 
  */
  const handleAsteroids = (result) => {
    //console.log(`${JSON.stringify(result, null, 2)}`);

    //UTC -> Same AS Server
    const today = '' + moment().utc(false).format('YYYY-MM-DD');
    const AsteroidsArray = result.near_earth_objects[today];

    if (!AsteroidsArray) {
      return;
    }

    dispatch({ type: 'UPDATE_ASTEROIDS', asteroids: AsteroidsArray});
    setAsteroids(AsteroidsArray);
  }
  //#endregion

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
      <ImageBackground 
        source={require('../assets/aurora2.jpg')} 
        resizeMode="stretch" 
        style={styles.image}>
        <View 
          style= {styles.header}>
          <Text 
            style= {styles.firstMessage}>
              {getAuroraMessage()}
          </Text>
          <Gauge 
            style={styles.gauge} 
            kpi={kpi}
          />
        </View>
        <View 
          style= {styles.footer}>
        <Text 
          style= {styles.message}>
            Closest Asteroids to Earth on {moment().format("MMM Do YY")}
        </Text>
        <Text></Text>
        {
          asteroids.map((asteroid, index) => 
            <Asteroid asteroid={asteroid} key={index}/>
          )
        }
        </View>
        </ImageBackground>
        </ScrollView>
    </SafeAreaView>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const normalTextFontSize = windowHeight * 0.03;
const headerTextFontSize = windowHeight * 0.04;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flex: 0.1, 
    alignContent: 'center',
    marginBottom: '20%',
    marginTop: windowHeight* 0.075
  },
  footer: {
    flex: 1, 
    alignContent: 'center',
    marginBottom: '20%',
    marginTop: '5%'
  },
  buttons: {
    flex: 0.3, 
  },
  logo: {
    width: '100%',
    height: 200
  },
  newAccountButton: {
    alignItems: "center",
    padding: '3%',
    width: '80%',
    height: 50,
    marginLeft: '10%',
    marginTop: '10%',
    backgroundColor: StyleCommons.secundaryColor
  },
  text: {
    color: StyleCommons.mainColor,
    marginLeft: '10%',
    marginRight: '10%',
    fontWeight: '700',
    fontSize: 18
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  firstMessage : {
    color: StyleCommons.mainColor,
    marginTop: 0,
    fontWeight: '700',
    fontSize: headerTextFontSize,
    textAlign: 'center'
  },
  message : {
    color: StyleCommons.mainColor,
    marginLeft: windowWidth  / 10,
    marginRight: windowWidth  / 10,
    marginTop: 0,
    fontWeight: '700',
    fontSize: normalTextFontSize,
    textAlign: 'auto'
  },
  gauge: {
    marginTop: 0,
    padding: 0
  }
});
  

