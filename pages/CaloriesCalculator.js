import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, Platform, Picker, TouchableOpacity, Keyboard }  from 'react-native';
import { CheckBox } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
   } from 'react-native-responsive-screen';
import { menBMR, womenBMR, activityIndicator } from "../utils/helper";
import { Colors } from '../data/data';

const CaloriesCalculator = props => {
    const [gender, setGender] = useState('female');
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [feet, setFeet] = useState('');
    const [inches, setInches] = useState('');
    const [activity, setActivityFactor] = useState('bmr');
    const [dailyCalories, setDailyCalories] = useState('');

    const calculateCalories = () => {
        // if (
        //     feet.trim().length === 0 ||
        //     inches.trim().length === 0 ||
        //     weight.trim().length === 0 ||
        //     age.trim().length === 0
        // ) {
        //     alert("Fill all fields please!");
        // } else {
            let height = feet + inches ;
          
            if (gender === 'male') {
                let dailyCalories = menBMR(weight, height, age);
                dailyCalories = activityIndicator(dailyCalories, activity);
                setDailyCalories( dailyCalories );
            }
            if (gender === 'female') {
                let dailyCalories = womenBMR(weight, height, age);
                dailyCalories = activityIndicator(dailyCalories, activity);
                setDailyCalories( dailyCalories );
            }
        //}
    };

    function InputForm() {
        return (
            <ScrollView>
                <View style={styles.form}>
                    <View style={styles.formControl}>
                        <View style={{ flexDirection: 'row' }}>
                            <CheckBox
                                checked={gender === 'male' ? true : false}
                                onPress={ () => { setGender('male') }}
                            />
                            <Text> Male</Text>
                            <CheckBox
                                checked={gender === 'female' ? true : false}
                                onPress={ () => { setGender('female') }}
                            />
                            <Text>Female</Text>
                        </View>
                    </View>
                    <View style={styles.formControl}>
                        <Text style={styles.label}>Age</Text>
                        <TextInput
                            style={styles.input}
                            maxLength={12}
                            editable={true}
                            value={age}
                            keyboardType='numeric'
                            numberOfLines={1}
                            onBlur={Keyboard.dismiss}
                            onChangeText={text => setAge(text)}
                        />
                    </View>
                    <View style={styles.formControl}>
                        <Text style={styles.label}>Weight</Text>
                        <TextInput
                        style={styles.input}
                        maxLength={12}
                        editable={true}
                        value={weight}
                        keyboardType="numeric"
                        onChangeText={weight => setWeight(weight)}
                        />
                    </View>
                    <View style={styles.formControl}>
                        <Text style={styles.label}>Feet</Text>
                        <TextInput
                            style={styles.input}
                            maxLength={12}
                            editable={true}
                            value={feet}
                            keyboardType="numeric"
                            onChangeText={feet => setFeet(feet)}
                        />
                        <Text style={styles.label}>Inches</Text>
                        <TextInput
                            style={styles.input}
                            maxLength={12}
                            editable={true}
                            value={inches}
                            keyboardType="numeric"
                            onChangeText={inches => setInches(inches)}
                        />
                    </View>
                    <View style={styles.formControl}>
                    </View>
                    <View style={styles.formControl}>
                        <Text style={styles.label}>Activity factor</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                style={{ height: 40, width: 300 }}
                                selectedValue={activity}
                                onValueChange={(itemValue, itemIndex) => setActivityFactor(itemValue)}
                            >
                                <Picker.Item
                                    label="Basal Metabolic Rate (BMR)"
                                    value="bmr"
                                />
                                <Picker.Item
                                    label="Sedentary - little or no exercise"
                                    value="sedentary"
                                />
                                <Picker.Item
                                    label="Moderate - exercise/sports (1-3 times/week)"
                                    value="moderate"
                                />
                                <Picker.Item
                                    label="Mild - exercise/sports (3-5 times/week)"
                                    value="mild"
                                />
                                <Picker.Item
                                    label="Heavy - exercise/sports (6-7 times/week)"
                                    value="heavy"
                                />
                                <Picker.Item
                                    label="Extreme - very hard exercise/sports (twice/day)"
                                    value="extreme"
                                />
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.calculateButtonContainer}>
                        <TouchableOpacity
                            onPress={() => calculateCalories()}
                        >
                            <View >
                                <Text>Calculate</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }

    function CalculationResult() {
        return (
          <View style={styles.container}>
            <Text>Calculation result: {dailyCalories}</Text>
          </View>
        )
    }

    if (dailyCalories !== '') {
        return <CalculationResult />
    }

    return (
        <InputForm />   
    );
}
//md-calculator
export const screenOptions = () =>  {
    return {
      headerTitle: 'Daily Calories Calculator',
      headerStyle: {
        backgroundColor: Platform.OS === 'ios' ? '' : Colors.primaryColor,
      },
      headerTintColor: Colors.secondaryColor 
    }
  }
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
      margin: 20
    },
    formControl: {
      width: '80%',
      flexDirection: 'row'
    },
    label: {
        color: Colors.secondaryColor,
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
      paddingHorizontal: 2,
      paddingVertical: 5,
      borderBottomColor: '#ccc',
      borderBottomWidth: 1
    },
    pickerContainer: {
        flex: 1,
        paddingTop: 40,
        alignItems: 'flex-end',
        width: wp('100%'),
    },
    calculateButtonContainer: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    calculateButton: {
        height: 80,
    },
    calculateButtonText: {
        left: 10,
        fontSize: 28,
        color: "white"
    },
  });
  
  export default CaloriesCalculator;