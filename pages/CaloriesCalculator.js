import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, Platform, Picker, TouchableOpacity, Keyboard, Button }  from 'react-native';
import { CheckBox } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
   } from 'react-native-responsive-screen';
import { menBMR, womenBMR, activityIndicator } from "../utils/helper";
import { Colors } from '../data/data';

const CaloriesCalculator = props => {
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [feet, setFeet] = useState('');
    const [inches, setInches] = useState('');
    const [activity, setActivityFactor] = useState('bmr');
    const [dailyCalories, setDailyCalories] = useState('');
    const [showResult, setShowResult] = useState(false);

    const calculateCalories = () => {
        // if (
        //     feet.trim().length === 0 ||
        //     inches.trim().length === 0 ||
        //     weight.trim().length === 0 ||
        //     age.trim().length === 0
        // ) {
        //     alert("Fill all fields please!");
        // } else {
            let height = (feet*12 + parseInt(inches)) ;
            console.log('height: ', height)
            console.log( 'gender: ', gender)
            console.log( 'weight: ', weight)
            console.log( 'age: ', age)

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
            console.log('dailyCalories: ', dailyCalories)
            setShowResult(true);
        //}
    };

    function Separator() {
        return <View style={styles.separator} />;
    }
      
    function InputForm() {
        return (
            <ScrollView>
                <View style={styles.form}>
                    <View style={styles.formControl}>
                        <View style={styles.checkBoxContainer}>
                            <CheckBox
                                checked={gender === 'male' ? true : false}
                                onPress={ () => { setGender('male') }}
                            />
                            <Text style={{marginTop: 20}}> Male</Text>
                            <CheckBox
                                checked={gender === 'female' ? true : false}
                                onPress={ () => { setGender('female') }}
                            />
                            <Text style={{marginTop: 20}}>Female</Text>
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
                </View>

                <View style={styles.calculateButtonContainer}>
                    <TouchableOpacity
                        onPress={() => calculateCalories()}
                    >
                    <Text style={{color: Colors.secondaryColor}}>CALCULATE</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }

    function CalculationResult() {
        return (
          <View style={styles.container}>
            <Text>Calculation result: {dailyCalories}.</Text>
            <View style={styles.calculateButtonContainer}>
                <TouchableOpacity
                    onPress={() => Reset()}
                >
                <Text style={{color: Colors.secondaryColor}}>RESET</Text>
                </TouchableOpacity>
            </View>
          </View>
        )
    }

    function Reset() {
        setGender('');
        setAge('');
        setWeight('');
        setFeet('');
        setInches('');
        setActivityFactor('bmr');
        setDailyCalories('');
        setShowResult(false);
    }

    return (
        <View>
            <InputForm /> 
            { showResult ? (<CalculationResult />) : null }
        </View>
         

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
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
      margin: 40
    },
    formControl: {
      width: '80%',
      flexDirection: 'row'
    },
    label: {
        color: Colors.secondaryColor,
        fontFamily: 'open-sans-bold',
        fontSize: hp('1.9%'),
        marginVertical: 8
    },
    input: {
      paddingHorizontal: 2,
      paddingVertical: 5,
      borderBottomColor: '#ccc',
      borderBottomWidth: 1
    },
    pickerContainer: {
        flex:1,
        alignItems: 'center',
        width: wp('100%'),
        marginRight: 30
    },
    calculateButtonContainer: {
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 150,
    },
    calculateButton: {
        height: 80
        
    },
    calculateButtonText: {
        fontSize: hp('1.9%'),
    },
    checkBoxContainer: {
        flexDirection: "row",
        alignContent: "space-between",
        justifyContent: "space-around",
    },
    separator: {
        marginVertical: 5,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
  });
  
  export default CaloriesCalculator;