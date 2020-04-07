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

// const UseFocus = () => {
//     console.log('focus changed')
//     const htmlElRef = useRef(null)
//     const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()}

//     return [ htmlElRef,  setFocus ] 
// }

const CaloriesCalculator = props => {
    const [gender, setGender] = useState('female');
    const [age, setAge] = useState('');
    //const [inputAgeRef, setInputAgeFocus] = UseFocus()
    //console.log('inputAge:' , inputAgeRef)
    //console.log('setFocus: ', setInputAgeFocus)

    const [weight, setWeight] = useState('');
    //const [inputWeightRef, setInputWeightFocus] = UseFocus()
    const [feet, setFeet] = useState('');
    //const [inputFeetRef, setInputFeetFocus] = UseFocus()
    const [inches, setInches] = useState('');
    //const [inputInchesRef, setInputInchesFocus] = UseFocus()
    const [activity, setActivityFactor] = useState('bmr');
    const [dailyCalories, setDailyCalories] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [inputs, setInputs] = useState({});

    const focusNextField = (id) => {
        inputs[id].focus()
        console.log('inputs fields: ', inputs[id])
    }

    const calculateCalories = () => {
        let height = (feet*12 + parseInt(inches)) ;

        if (gender === 'male') {
            let daily = menBMR(weight, height, age);
            daily = activityIndicator(daily, activity);
            setDailyCalories( daily );

        }
        if (gender === 'female') {
            let daily = womenBMR(weight, height, age);
            daily = activityIndicator(daily, activity);
            setDailyCalories( daily );
            console.log('dailyCalories: ', dailyCalories)

            // props.navigation.navigate('CalculationResult', {
            //     dailyCalories:  dailyCalories ,
            // });
        }
        //console.log('dailyCalories: ', dailyCalories)
        setShowResult(true);
    };

    function Separator() {
        return <View style={styles.separator} />;
    }
    
    function InputForm() {
        return (
            <ScrollView>
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
                            placeholder="21"
                            returnKeyType={ 'next' }
                            blurOnSubmit={ false }
                            value={age}
                            keyboardType='numeric'
                            numberOfLines={1}
                            onChangeText={text => {
                                setAge(text)
                            }}
                            onSubmitEditing={() => {
                                setInputs('weight')
                                focusNextField('weight')                            }}
                            //ref={inputAgeRef}
                        />
                    </View>   
                    <View style={styles.ageWeight}>
                        <Text style={styles.label}>How much do you weight? </Text>
                        <TextInput
                            style={styles.input}   
                            autoCapitalize='none'  
                            autoCorrect={false}                       
                            placeholder="152"
                            blurOnSubmit={ false }
                            value={weight}
                            keyboardType="numeric"
                            onChangeText={text => setWeight(text)}
                            onSubmitEditing={() => {
                                setInputs('feet')
                                focusNextField('feet')
                            }}
                            returnKeyType={ 'next' }
                            ref={input => inputs['weight'] = input}
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
                                onSubmitEditing={() => {
                                    setInputs('inches')
                                    focusNextField('inches')
                                }}
                                returnKeyType={ 'next' }
                                ref={input => inputs['feet'] = input}
                            />
                            <Text style={styles.label}>ft</Text>
                            <Text style={styles.label}></Text>
                            <TextInput
                                style={styles.input}
                                autoCapitalize='none'
                                autoCorrect={false}
                                placeholder="00"
                                returnKeyType={ "done" }
                                blurOnSubmit={ false }
                                value={inches}
                                keyboardType="numeric"
                                onChangeText={text=> setInches(text)}
                            />
                            <Text style={styles.label}>in</Text>
                        </View>
                    <View style={styles.formControl}>
                        <Text style={styles.label}>How active are you on daily basis?  </Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                style={{ height: 40, width: 300, fontSize: hp('1.2%') }}
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
            { dailyCalories !== '' ? (<CalculationResult />) : null }
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
        //marginEnd: 10,
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
        marginTop: Platform.OS === 'ios' ? 200 : (Platform.OS === 'android' ? 150 : 150)
    },
    resetButtonContainer: {
        borderColor: '#c5e1a5',
        borderWidth: 2,
        borderRadius: 25,
        width: wp('20%'),
        padding: 10,
        //justifyContent: "flex-end",
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
