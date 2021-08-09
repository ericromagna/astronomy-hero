import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, ImageBackground  } from 'react-native';
import StyleCommons from '../commons/style.json';

export default function AsteroidComponent(props) {
    const [hideText, setHideText] = React.useState(true);

    //#region Asteroid properties
    const estDiameterMaxSI = props?.asteroid?.estimated_diameter?.meters?.estimated_diameter_max;
    const estDiameterMinSI = props?.asteroid?.estimated_diameter.meters?.estimated_diameter_min;
    const estDiameterMaxUS = props?.asteroid?.estimated_diameter?.feet?.estimated_diameter_max; //feet
    const estDiameterMinUS = props?.asteroid?.estimated_diameter.feet?.estimated_diameter_min; //feet

    const isPoteniallyHazardous = props?.asteroid?.is_potentially_hazardous_asteroid ? 'Yes' : 'No';
    const closeApproachData = `${props?.asteroid?.close_approach_data[0]?.close_approach_date}`;

    const relVelocitySI = props?.asteroid.close_approach_data[0]?.relative_velocity?.kilometers_per_second;

    const relMissDistanceSI = Number(props?.asteroid?.close_approach_data[0]?.miss_distance?.kilometers).toFixed(2);
    const relMissDistanceUS = Number(props.asteroid?.close_approach_data[0]?.miss_distance?.miles).toFixed(2);
    let titleColor = props.asteroid?.is_potentially_hazardous_asteroid ? '#C21807' : StyleCommons.mainColor;

    //#endregion

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const containerWidth = windowWidth * 0.9;
    const containerHeight = windowHeight * 0.1;//07;
    const adaptiveFontSize = containerHeight * 0.25;
    const adaptiveMarginLeft = (windowWidth - containerWidth) / 2;

    let displayHiddenText = hideText ? 'none' : 'flex';
    let constainerSizeWithText = hideText ? containerHeight : containerHeight * 6;
    let textAlignment = hideText ? 'center' : 'justify';
    let justifyContent = hideText ? 'center' : 'flex-start';

    const styles = StyleSheet.create({ 
        container:{
            flexDirection:'row',
            flexWrap:'wrap'
        },
        asteroid :{
            width: containerHeight * 0.80,
            height:containerHeight * 0.80
        },
        text: {
            color: titleColor,
            marginLeft: 0,
            fontSize: adaptiveFontSize,
            lineHeight: containerHeight,
            fontFamily: "sans-serif",
            textAlign: textAlignment
        },
        image: {
            flex: 1,
            justifyContent: justifyContent,
            marginLeft: adaptiveMarginLeft,
            marginBottom: containerHeight * 0.1,
            width: containerWidth ,
            height: constainerSizeWithText
        },
        hiddenTextContainer : {
            display: displayHiddenText
        },
        hiddenText: {
            color: '#fff',
            padding: 7,
            fontSize: 20
        }
    });

    const handleClick = () => {
        setHideText(!hideText);
    }

    return (
        <ImageBackground source={require('../assets/deep-black-sky.jpg')} resizeMode="cover" style={styles.image}>
            <TouchableOpacity 
                style = {styles.newAccountButton} 
                onPress={() => handleClick()}
            >
                <View style={styles.container}>
                    <Image
                        style={styles.asteroid}
                        source={require('../assets/asteroid.gif')}
                    />
                    <Text 
                        style={styles.text}>
                        {props.asteroid.name}
                    </Text>
                    <View style={styles.hiddenTextContainer}>
                        <Text style={styles.hiddenText}>
                            Is a potentially hazardous asteroid ? {isPoteniallyHazardous}
                        </Text>
                        <Text style={styles.hiddenText}>
                            Closest Day Approach: {closeApproachData}
                        </Text>
                        <Text style={styles.hiddenText}>
                            Diameter (max): {estDiameterMaxSI}m, {estDiameterMaxUS}ft
                        </Text>
                        <Text style={styles.hiddenText}>
                            Diameter (min): {estDiameterMinSI}m, {estDiameterMinUS}ft
                        </Text>
                        <Text style={styles.hiddenText}>
                            Est Diameter (min): {estDiameterMinSI}m, {estDiameterMinUS}ft
                        </Text>
                        <Text style={styles.hiddenText}>
                            Relative Velocity: {relVelocitySI} km/s
                        </Text>
                        <Text style={styles.hiddenText}>
                            Missing Distance: {relMissDistanceSI}km, {relMissDistanceUS}mi
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </ImageBackground>
      );
}