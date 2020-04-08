import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, Platform, Picker, TouchableOpacity, Keyboard, Button }  from 'react-native';
import { CheckBox } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
   } from 'react-native-responsive-screen';
import { menBMR, womenBMR, activityIndicator } from "../utils/helper";
import { Colors } from '../data/data';

let defaults = {
    age: '',
    weight: '',
    feet: '',
    inches: ''
  };

const CaloriesCalculator = props => {
    //reset all calculator parameters when back from result page
    const resetCalculator = reset || null;
    if (resetCalculator) reset();

    const [gender, setGender] = useState('female');
    const [age, setAge] = useState('');
    const textAgeInput = useRef();

    const [weight, setWeight] = useState('');
    const textWeightInput = useRef();

    const [feet, setFeet] = useState('');
    const textFeetInput = useRef();

    const [inches, setInches] = useState('');
    const textInchesInput = useRef();

    const [activity, setActivityFactor] = useState('bmr');

    const [dailyCalories, setDailyCalories] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [inputs, setInputs] = useState(defaults);
    const [reset, setReset] = useState(false);

    useEffect(() => {
        textAgeInput.current && textAgeInput.current.focus()
        if( age.length >= 2 ) textWeightInput.current && textWeightInput.current.focus();
        if( weight.length >= 3 ) textFeetInput.current && textFeetInput.current.focus();
        if ( feet.length >= 1) textInchesInput.current && textInchesInput.current.focus();
    });

    const calculateCalories = () => {
        if (feet === '') setFeet('0');
        if (inches === '') setInches('0');
        let height = (parseInt(feet)*12 + parseInt(inches)) ;
        let daily = '';

        if (gender === 'male') {
            daily = menBMR(weight, height, age);
            daily = activityIndicator(daily, activity);
            setDailyCalories( daily );

        }
        if (gender === 'female') {
            daily = womenBMR(weight, height, age);
            daily = activityIndicator(daily, activity);
            setDailyCalories( daily );
            console.log('dailyCalories: ', daily)
        }
    };
    
    function InputForm() {
        return (
            <ScrollView keyboardShouldPersistTaps='handled'>
                <View style={styles.container}>
                    <View style={styles.checkBoxContainer}>
                        <CheckBox
                            checked={gender === 'male' ? true : false}
                            onPress={ () => { setGender('male') }}
                        />
                        <Text style={{marginTop: 20, fontSize: hp('1.8%'),fontFamily: 'open-sans',color: Colors.secondaryColor,}}> Male</Text>
                        <CheckBox
                            checked={gender === 'female' ? true : false}
                            onPress={ () => { setGender('female') }}
                        />
                        <Text style={{marginTop: 20, fontSize: hp('1.8%'),fontFamily: 'open-sans',color: Colors.secondaryColor,}}>Female</Text>
                    </View>
                    <View style={styles.ageWeight}>
                        <Text style={styles.label}>How old are you? </Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize='none'
                            autoCorrect={false}
                            placeholder="00"
                            returnKeyType={ 'done' }
                            blurOnSubmit={ false }
                            defaultValue={age}
                            keyboardType='numeric'
                            numberOfLines={1}
                            onChangeText={text => {   
                                setAge(text);
                            }}
                            ref={textAgeInput}
                        />
                    </View>   
                    <View style={styles.ageWeight}>
                        <Text style={styles.label}>How much do you weight? </Text>
                        <TextInput
                            style={styles.input}   
                            autoCapitalize='none'  
                            autoCorrect={false}                       
                            placeholder="000"
                            blurOnSubmit={ false }
                            value={weight}
                            keyboardType="numeric"
                            onChangeText={text => setWeight(text)}
                            returnKeyType={ 'next' }
                            ref={textWeightInput}
                        />
                    </View>  
                    <View style={styles.height}>
                            <Text style={styles.label}>How tall are you?  </Text>
                            <TextInput
                                style={styles.input}
                                autoCapitalize='none'
                                autoCorrect={false}
                                placeholder="0"
                                blurOnSubmit={ false }
                                value={feet}
                                keyboardType="numeric"
                                onChangeText={text => setFeet(text)}
                                returnKeyType={ 'next' }
                                ref={textFeetInput}
                            />
                            <Text style={styles.label}>ft</Text>
                            <Text style={styles.label}></Text>
                            <TextInput
                                style={styles.input}
                                autoCapitalize='none'
                                autoCorrect={false}
                                placeholder="00"
                                returnKeyType={ "next" }
                                blurOnSubmit={ false }
                                value={inches}
                                keyboardType="numeric"
                                onChangeText={text=> setInches(text)}
                                ref={textInchesInput}
                            />
                            <Text style={styles.label}>in</Text>
                        </View>
                    <View style={styles.formControl}>
                        <Text style={styles.label}>How active are you on daily basis?  </Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                style={{ minHeight: 40, width: 300, color: Colors.secondaryColor }}
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
                                    label="Moderate - exercise 1-3 times/week"
                                    value="moderate"
                                />
                                <Picker.Item
                                    label="Mild - exercise 3-5 times/week"
                                    value="mild"
                                />
                                <Picker.Item
                                    label="Heavy - exercise 6-7 times/week"
                                    value="heavy"
                                />
                                <Picker.Item
                                    label="Extreme - exercise(twice/day)"
                                    value="extreme"
                                />
                            </Picker>
                        </View>
                    </View>
                </View>
                <View style={styles.calculateButtonContainer}>
                    <TouchableOpacity
                        onPress={calculateCalories}
                    >
                    <Text style={{color: Colors.secondaryColor}}>CALCULATE</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }

    function CalculationResult() {
        console.log('props from Calc page: ', props.navigation)
        console.log('dailyCalories after calculation: ', dailyCalories)

        return (
            
            <View style={styles.container}>
                <Text>Your personal result: {dailyCalories}.</Text>
                <View style={styles.resetButtonContainer}>
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
        setReset(false)
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
            { (dailyCalories !== '' && dailyCalories !== 'NaN') ? (
                props.navigation.navigate('CalculationResult', {
                    dailyCalories: dailyCalories,
                })
               
            ) : null }
        </View>
    );
}
//md-calculator
export const screenOptions = () =>  {
    return {
      headerTitle: 'Daily Calories Calculator',
      headerStyle: {
        backgroundColor: Colors.primaryColor,
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
    formControl: {
      width: '80%',
      flexDirection: 'row'
    },
    label: {
        color: Colors.secondaryColor,
        fontFamily: 'open-sans',
        fontSize: hp('1.8%'),
        marginVertical: 8,
        marginStart: 10
    },
    input: {
      paddingHorizontal: 2,
      paddingVertical: 5,
      borderBottomColor: '#ccc',
      borderBottomWidth: 1,
      width: '10%',
      alignContent: 'space-between'
    },
    pickerContainer: {
        flex:1,
        marginTop: Platform.OS === 'ios' ? 0 : (Platform.OS === 'android' ? 10 : 10),
        alignItems: Platform.OS === 'ios' ? 'flex-end' : (Platform.OS === 'android' ? 'flex-start' : 'flex-start'),
        width: wp('100%'),
    },
    calculateButtonContainer: {
        borderColor: '#c5e1a5',
        borderWidth: 2,
        borderRadius: 25,
        marginLeft: '35%',
        width: wp('30%'),
        padding: 10,
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: Platform.OS === 'ios' ? 100 : (Platform.OS === 'android' ? 50 : 50)
    },
    resetButtonContainer: {
        borderColor: '#c5e1a5',
        borderWidth: 2,
        borderRadius: 25,
        width: wp('20%'),
        padding: 10,
        alignItems: "center",
        marginTop: Platform.OS === 'ios' ? 200 : (Platform.OS === 'android' ? 150 : 150)
    },
    calculateButtonText: {
        fontSize: hp('1.9%'),
    },
    checkBoxContainer: {
        flexDirection: 'row',
        alignContent: "space-between",
        justifyContent: "space-around",
        marginTop: 20,
    },
    separator: {
        marginVertical: 5,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    height: {
        flexDirection: 'row',
        marginBottom: 20
    },
    ageWeight: {
        flexDirection: 'row',
        marginBottom: 20
    }
  });
  
export default CaloriesCalculator;