import React from 'react';
import { View, Text, StyleSheet , SafeAreaView, FlatList, TouchableOpacity, Platform, Button} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
 } from 'react-native-responsive-screen';
import Constants from 'expo-constants';
import { Colors } from '../data/data';

const CalculationResultPage = props => {
  //console.log('props from result page: ', props)
  
  const result = props.route.params.dailyCalories;

  return (
    <View style={styles.container}>
        <Text styles={styles.resultLabel}>YOUR PERSONAL RESULT of DAILY CALORIE INTAKE</Text>
        <View styles={styles.resultDesc}>
        <Text >This is the total number of calories daily you need in order to maintain your current weight.</Text>
        </View>        
        <View style={styles.resultDisplay}>
          <Text style={styles.resultText}>{result}</Text>
        </View>
        <TouchableOpacity
            onPress={() => {
              props.navigation.push('Calculator', {
                reset: true,
              })
            }}
          >
          <View style={styles.resetButtonContainer}>
            <Text style={styles.resetButton}>BACK TO CALCULATOR</Text>
          </View>
        </TouchableOpacity>
    </View>
  );

};

export const screenOptions = () =>  {
  return {
    headerTitle: 'Daily Calories Calculation Result',
    headerStyle: {
      backgroundColor: Colors.primaryColor,
    },
    headerTintColor: Colors.secondaryColor 
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('100%'),
  },
  resetButtonContainer: {
    marginTop: 20,
    borderColor: '#c5e1a5',
    borderWidth: 2,
    borderRadius: 25,
    width: wp('50%'),
    //color: Colors.secondaryColor,
    padding: 5,
    justifyContent: 'center',
    alignItems: "center",
    alignContent: 'center'
  },
  resetButton: {
    color: Colors.secondaryColor,
    padding: 10,
    justifyContent: 'center',
    alignItems: "center",
    alignContent: 'center'
  },
  resultLabel: {
    marginBottom: 20,
    color: Colors.secondaryColor,
    fontFamily: 'open-sans-bold',
    fontSize: hp('1.9%'),
  },
  resultDesc: {
    marginBottom: 30,
    color: Colors.secondaryColor,
    fontFamily: 'open-sans',
    fontSize: hp('1.8%'),
  },
  resultDisplay: {
    marginVertical: 20,
    borderWidth: 1,
    borderRadius: 30,
    width: wp('35%'),
    backgroundColor: Colors.primaryColor,
    //color: Colors.secondaryColor,
    padding: 40,
    justifyContent: 'center',
    alignItems: "center",
    alignContent: 'center'
  },
  resultText: {
    fontFamily: 'open-sans-bold',
    fontSize: hp('3%'),
  }
});

export default CalculationResultPage;