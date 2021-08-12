import React from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, Dimensions  } from 'react-native';
import StyleCommons from '../commons/style.json'

export default function MainGaugeComponent(props) {
    const windowWidth = Dimensions.get('window').width;
    //const windowHeight = Dimensions.get('window').height;
    const adaptiveFontSize = windowWidth / 1.5;
    const adaptiveMarginLeft = (windowWidth - adaptiveFontSize) / 1;

    const backgroundColorsKpi = StyleCommons.backgroundColorsKpi;

    const GetColorsByKpi = () => {
        return backgroundColorsKpi[props.kpi[props.kpi.length - 1 ]];
    }

    const styles = StyleSheet.create({
        text: {
            color: GetColorsByKpi(),
            marginLeft: adaptiveMarginLeft,
            marginTop: 0,
            fontSize: adaptiveFontSize,
            fontFamily: "sans-serif"
        }
    });

    return (
        <Text style={styles.text}>{props.kpi[props.kpi.length - 1 ]}</Text>
      );
}