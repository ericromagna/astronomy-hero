import React from 'react';
import { ImageBackground, StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useSelector, useDispatch  } from 'react-redux';
import GetKpi from '../api-callers/get-kpi';
import GetAsteroids from '../api-callers/get-asteroids';
import StyleCommons  from '../commons/style.json';
import Gauge from '../components/main-gauge-component'
import Asteroid from '../components/asteroid-component'
import moment from 'moment';

export default function HomeComponent({ navigation }) {

  const [kpi, setKpi] = React.useState([1,2,2,4]);
  const [asteroids, setAsteroids] = React.useState([
    {
      "links": {
        "self": "http://www.neowsapp.com/rest/v1/neo/2136770?api_key=A8QOwQlPLCc2EYkcNhYxj1SZKIHh83v6tkp55y7e"
      },
      "id": "2136770",
      "neo_reference_id": "2136770",
      "name": "136770 (1996 PC1)",
      "nasa_jpl_url": "http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=2136770",
      "absolute_magnitude_h": 20.6,
      "estimated_diameter": {
        "kilometers": {
          "estimated_diameter_min": 0.2016299194,
          "estimated_diameter_max": 0.4508582062
        },
        "meters": {
          "estimated_diameter_min": 201.6299194428,
          "estimated_diameter_max": 450.8582061718
        },
        "miles": {
          "estimated_diameter_min": 0.1252869847,
          "estimated_diameter_max": 0.2801502144
        },
        "feet": {
          "estimated_diameter_min": 661.5155049046,
          "estimated_diameter_max": 1479.1936371367
        }
      },
      "is_potentially_hazardous_asteroid": false,
      "close_approach_data": [
        {
          "close_approach_date": "2021-08-09",
          "close_approach_date_full": "2021-Aug-09 22:31",
          "epoch_date_close_approach": 1628548260000,
          "relative_velocity": {
            "kilometers_per_second": "21.1550840676",
            "kilometers_per_hour": "76158.3026432912",
            "miles_per_hour": "47321.8075507717"
          },
          "miss_distance": {
            "astronomical": "0.3268795598",
            "lunar": "127.1561487622",
            "kilometers": "48900485.892617626",
            "miles": "30385352.9461341988"
          },
          "orbiting_body": "Earth"
        }
      ],
      "is_sentry_object": false
    },
    {
      "links": {
        "self": "http://www.neowsapp.com/rest/v1/neo/3574131?api_key=A8QOwQlPLCc2EYkcNhYxj1SZKIHh83v6tkp55y7e"
      },
      "id": "3574131",
      "neo_reference_id": "3574131",
      "name": "(2011 OE16)",
      "nasa_jpl_url": "http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=3574131",
      "absolute_magnitude_h": 23.8,
      "estimated_diameter": {
        "kilometers": {
          "estimated_diameter_min": 0.046190746,
          "estimated_diameter_max": 0.1032856481
        },
        "meters": {
          "estimated_diameter_min": 46.1907460282,
          "estimated_diameter_max": 103.2856480504
        },
        "miles": {
          "estimated_diameter_min": 0.0287015901,
          "estimated_diameter_max": 0.0641787064
        },
        "feet": {
          "estimated_diameter_min": 151.544447199,
          "estimated_diameter_max": 338.8636855496
        }
      },
      "is_potentially_hazardous_asteroid": false,
      "close_approach_data": [
        {
          "close_approach_date": "2021-08-09",
          "close_approach_date_full": "2021-Aug-09 00:25",
          "epoch_date_close_approach": 1628468700000,
          "relative_velocity": {
            "kilometers_per_second": "6.3249294826",
            "kilometers_per_hour": "22769.7461372515",
            "miles_per_hour": "14148.2347595605"
          },
          "miss_distance": {
            "astronomical": "0.1949056413",
            "lunar": "75.8182944657",
            "kilometers": "29157468.789464031",
            "miles": "18117610.9809883878"
          },
          "orbiting_body": "Earth"
        }
      ],
      "is_sentry_object": false
    },
    {
      "links": {
        "self": "http://www.neowsapp.com/rest/v1/neo/3616350?api_key=A8QOwQlPLCc2EYkcNhYxj1SZKIHh83v6tkp55y7e"
      },
      "id": "3616350",
      "neo_reference_id": "3616350",
      "name": "(2012 VK5)",
      "nasa_jpl_url": "http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=3616350",
      "absolute_magnitude_h": 24.8,
      "estimated_diameter": {
        "kilometers": {
          "estimated_diameter_min": 0.0291443905,
          "estimated_diameter_max": 0.0651688382
        },
        "meters": {
          "estimated_diameter_min": 29.1443904535,
          "estimated_diameter_max": 65.1688382168
        },
        "miles": {
          "estimated_diameter_min": 0.018109479,
          "estimated_diameter_max": 0.0404940262
        },
        "feet": {
          "estimated_diameter_min": 95.6180819754,
          "estimated_diameter_max": 213.8085311752
        }
      },
      "is_potentially_hazardous_asteroid": false,
      "close_approach_data": [
        {
          "close_approach_date": "2021-08-09",
          "close_approach_date_full": "2021-Aug-09 17:58",
          "epoch_date_close_approach": 1628531880000,
          "relative_velocity": {
            "kilometers_per_second": "7.4948010794",
            "kilometers_per_hour": "26981.2838858539",
            "miles_per_hour": "16765.1205345185"
          },
          "miss_distance": {
            "astronomical": "0.0898755612",
            "lunar": "34.9615933068",
            "kilometers": "13445192.520574644",
            "miles": "8354455.2310483272"
          },
          "orbiting_body": "Earth"
        }
      ],
      "is_sentry_object": false
    },
    {
      "links": {
        "self": "http://www.neowsapp.com/rest/v1/neo/2136770?api_key=A8QOwQlPLCc2EYkcNhYxj1SZKIHh83v6tkp55y7e"
      },
      "id": "2136770",
      "neo_reference_id": "2136770",
      "name": "136770 (1996 PC1)",
      "nasa_jpl_url": "http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=2136770",
      "absolute_magnitude_h": 20.6,
      "estimated_diameter": {
        "kilometers": {
          "estimated_diameter_min": 0.2016299194,
          "estimated_diameter_max": 0.4508582062
        },
        "meters": {
          "estimated_diameter_min": 201.6299194428,
          "estimated_diameter_max": 450.8582061718
        },
        "miles": {
          "estimated_diameter_min": 0.1252869847,
          "estimated_diameter_max": 0.2801502144
        },
        "feet": {
          "estimated_diameter_min": 661.5155049046,
          "estimated_diameter_max": 1479.1936371367
        }
      },
      "is_potentially_hazardous_asteroid": false,
      "close_approach_data": [
        {
          "close_approach_date": "2021-08-09",
          "close_approach_date_full": "2021-Aug-09 22:31",
          "epoch_date_close_approach": 1628548260000,
          "relative_velocity": {
            "kilometers_per_second": "21.1550840676",
            "kilometers_per_hour": "76158.3026432912",
            "miles_per_hour": "47321.8075507717"
          },
          "miss_distance": {
            "astronomical": "0.3268795598",
            "lunar": "127.1561487622",
            "kilometers": "48900485.892617626",
            "miles": "30385352.9461341988"
          },
          "orbiting_body": "Earth"
        }
      ],
      "is_sentry_object": false
    },
    {
      "links": {
        "self": "http://www.neowsapp.com/rest/v1/neo/3574131?api_key=A8QOwQlPLCc2EYkcNhYxj1SZKIHh83v6tkp55y7e"
      },
      "id": "3574131",
      "neo_reference_id": "3574131",
      "name": "(2011 OE16)",
      "nasa_jpl_url": "http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=3574131",
      "absolute_magnitude_h": 23.8,
      "estimated_diameter": {
        "kilometers": {
          "estimated_diameter_min": 0.046190746,
          "estimated_diameter_max": 0.1032856481
        },
        "meters": {
          "estimated_diameter_min": 46.1907460282,
          "estimated_diameter_max": 103.2856480504
        },
        "miles": {
          "estimated_diameter_min": 0.0287015901,
          "estimated_diameter_max": 0.0641787064
        },
        "feet": {
          "estimated_diameter_min": 151.544447199,
          "estimated_diameter_max": 338.8636855496
        }
      },
      "is_potentially_hazardous_asteroid": false,
      "close_approach_data": [
        {
          "close_approach_date": "2021-08-09",
          "close_approach_date_full": "2021-Aug-09 00:25",
          "epoch_date_close_approach": 1628468700000,
          "relative_velocity": {
            "kilometers_per_second": "6.3249294826",
            "kilometers_per_hour": "22769.7461372515",
            "miles_per_hour": "14148.2347595605"
          },
          "miss_distance": {
            "astronomical": "0.1949056413",
            "lunar": "75.8182944657",
            "kilometers": "29157468.789464031",
            "miles": "18117610.9809883878"
          },
          "orbiting_body": "Earth"
        }
      ],
      "is_sentry_object": false
    },
    {
      "links": {
        "self": "http://www.neowsapp.com/rest/v1/neo/3616350?api_key=A8QOwQlPLCc2EYkcNhYxj1SZKIHh83v6tkp55y7e"
      },
      "id": "3616350",
      "neo_reference_id": "3616350",
      "name": "(2012 VK5)",
      "nasa_jpl_url": "http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=3616350",
      "absolute_magnitude_h": 24.8,
      "estimated_diameter": {
        "kilometers": {
          "estimated_diameter_min": 0.0291443905,
          "estimated_diameter_max": 0.0651688382
        },
        "meters": {
          "estimated_diameter_min": 29.1443904535,
          "estimated_diameter_max": 65.1688382168
        },
        "miles": {
          "estimated_diameter_min": 0.018109479,
          "estimated_diameter_max": 0.0404940262
        },
        "feet": {
          "estimated_diameter_min": 95.6180819754,
          "estimated_diameter_max": 213.8085311752
        }
      },
      "is_potentially_hazardous_asteroid": false,
      "close_approach_data": [
        {
          "close_approach_date": "2021-08-09",
          "close_approach_date_full": "2021-Aug-09 17:58",
          "epoch_date_close_approach": 1628531880000,
          "relative_velocity": {
            "kilometers_per_second": "7.4948010794",
            "kilometers_per_hour": "26981.2838858539",
            "miles_per_hour": "16765.1205345185"
          },
          "miss_distance": {
            "astronomical": "0.0898755612",
            "lunar": "34.9615933068",
            "kilometers": "13445192.520574644",
            "miles": "8354455.2310483272"
          },
          "orbiting_body": "Earth"
        }
      ],
      "is_sentry_object": false
    }
  ]);

  React.useEffect(() => {
    console.log("use effect");
    //Get the Kpi and then the asteroids
    //the handle will save the results in the redux store and in states
    
    //TODO: AVOIDING CALLING AWS IN PRODUTION
    //REMOVE THESE
    
    //callAsteroidApi();
    //callKPIApi();
  },[]);

  // const rdkpi = useSelector(state => {
  //   return state.kpi;
  // });

  const dispatch = useDispatch();


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
    //TODO: unboxing and saving in the store and state
    console.log(`${kpiAsString}`);
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
    const today = '' + moment().format('YYYY-MM-DD');
    const AsteroidsArray = result.near_earth_objects[today];
    dispatch({ type: 'UPDATE_ASTEROIDS', asteroids: AsteroidsArray});
    setAsteroids(AsteroidsArray);
  }

  //#endregion

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView >
      <ImageBackground source={require('../assets/dark-stars.jpg')} resizeMode="cover" style={styles.image}>
        <View style= {styles.header}>
          <Text style= {styles.firstMessage}>New Aurora state... Note, change this to include languages dictionaries</Text>
          <Gauge style={styles.gauge} kpi={kpi}/>
        </View>
        <View style= {styles.footer}>
        {
          asteroids.map((asteroid, index) => 
            <Asteroid asteroid={asteroid} key={index}/>
          )
        }
        <TouchableOpacity 
            style = {styles.newAccountButton} 
            onPress={() =>
              navigation.navigate('Login')
            }
          >
          <Text style={{color: 'black'}}>Login</Text>
        </TouchableOpacity>
        </View>
        </ImageBackground>
        </ScrollView>
    </SafeAreaView>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const normalTextFontSize = windowHeight / 40;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 0.1, 
    alignContent: 'center',
    marginBottom: '20%',
    marginTop: '5%'
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
  

