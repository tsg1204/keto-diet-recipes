import React, { useEffect } from 'react';
import { View, Text, StyleSheet , SafeAreaView, FlatList, TouchableOpacity, Platform} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
 } from 'react-native-responsive-screen';
import Constants from 'expo-constants';
import { Colors } from '../data/data';

const CalculationResultPage = props => {

    const result = props.route.params.dailyCalories;

  return (
    <View>
        <Text>Calculation Result Page with daily calories result: {result}</Text>
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
  },
});

export default CalculationResultPage;