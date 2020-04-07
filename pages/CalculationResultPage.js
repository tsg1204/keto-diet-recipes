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
        <Text>Your personal result: {result}</Text>
        <TouchableOpacity
            onPress={() => {
              props.navigation.push('Calculator', {
                reset: true,
              })
            }}
          >
          <Text style={styles.resetButton}>BACK TO CALCULATOR</Text>
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
  resetButton: {
    marginTop: 20,
    borderColor: '#c5e1a5',
    borderWidth: 2,
    borderRadius: 25,
    width: wp('40%'),
    color: Colors.secondaryColor,
    padding: 10,
    justifyContent: 'center',
    alignItems: "center",
    alignContent: 'center'
  }
});

export default CalculationResultPage;