import React, { Component, useState } from 'react';
import {
  AppRegistry,
  ScrollView,
  View,
  Text,
  SafeAreaView,
  Platform,
  TouchableOpacity
} from 'react-native';
import { CheckBox } from 'react-native-elements'
import { RaisedTextButton } from 'react-native-material-buttons';
import { TextField } from 'react-native-material-textfield';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
   } from 'react-native-responsive-screen';
import { menBMR, womenBMR, activityIndicator } from "../utils/helper";
import { Colors } from '../data/data';

let styles = {
  scroll: {
    backgroundColor: 'transparent',
  },

  container: {
    margin: 8,
    marginTop: Platform.select({ ios: 8, android: 32 }),
    flex: 1,
  },

  contentContainer: {
    padding: 8,
  },

  buttonContainer: {
    paddingTop: 8,
    margin: 8,
  },

  safeContainer: {
    flex: 1,
    backgroundColor: '#E8EAF6',
  },
};

let defaults = {
    age: '',
    weight: '',
    feet: '',
    inches: '',
    gender: 'femail',
    dailyCalories: '',
    activity: ''
  };

  class CaloriesCalculator extends Component {
    constructor(props) {
      super(props);

      this.onFocus = this.onFocus.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.onChangeText = this.onChangeText.bind(this);
      this.onSubmitAge = this.onSubmitAge.bind(this);
      this.onSubmitWeight = this.onSubmitWeight.bind(this);
      this.onSubmitFeet = this.onSubmitFeet.bind(this);
      this.onSubmitInches = this.onSubmitInches.bind(this);
      this.calculateCalories = this.calculateCalories.bind(this);
      this.setDailyCalories = this.setDailyCalories.bind(this);

      this.ageRef = this.updateRef.bind(this, 'age');
      this.weightRef = this.updateRef.bind(this, 'weight');
      this.feetRef = this.updateRef.bind(this, 'feet');
      this.inchesRef = this.updateRef.bind(this, 'inches');

      this.state = {
        secureTextEntry: true,
        ...defaults,
      };
    }

    onFocus() {
      let { errors = {} } = this.state;

      for (let name in errors) {
        let ref = this[name];

        if (ref && ref.isFocused()) {
          delete errors[name];
        }
      }

      this.setState({ errors });
    }

    onChangeText(text) {
      ['age', 'weight', 'feet', 'inches']
        .map((name) => ({ name, ref: this[name] }))
        .forEach(({ name, ref }) => {
          if (ref.isFocused()) {
            this.setState({ [name]: text });
          }
        });
    }

    onSubmitAge() {
      this.age.focus();
    }

    onSubmitWeight() {
      this.weight.focus();
    }

    onSubmitFeet() {
      this.feet.focus();
    }

    onSubmitInches() {
      this.inches.focus();
    }

    onSubmit() {
      let errors = {};

      ['age', 'weight', 'feet', 'inches']
        .forEach((name) => {
          let value = this[name].value();

          if (!value) {
            errors[name] = 'Should not be empty';
          } 
        });

      this.setState({ errors });
    }

    updateRef(name, ref) {
      this[name] = ref;
    }

    setDailyCalories(value) {
        defaults.dailyCalories = value;
    }


    calculateCalories() {
        let height = (this.feet*12 + parseInt(this.inches)) 

        if (this.gender === 'male') {
            let dailyCalories = menBMR(weight, height, age);
            dailyCalories = activityIndicator(dailyCalories, activity);
            setDailyCalories( dailyCalories );
        }
        if (this.gender === 'female') {
            let dailyCalories = womenBMR(weight, height, age);
            dailyCalories = activityIndicator(dailyCalories, activity);
            setDailyCalories( dailyCalories );
        }
    };

    render() {
        let { errors = {}, secureTextEntry, ...data } = this.state;
        let { age, weight, feet, inches} = data;

      return (
        <SafeAreaView style={styles.safeContainer}>
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps='handled'
          >
            <View style={styles.formControl}>
                <View style={styles.checkBoxContainer}>
                    <CheckBox
                        checked={this.gender === 'male' ? true : false}
                    />
                    <Text style={{marginTop: 20}}> Male</Text>
                    <CheckBox
                        checked={this.gender === 'female' ? true : false}
                    />
                    <Text style={{marginTop: 20}}>Female</Text>
                </View>
            </View>
            <View style={styles.container}>
                <Text style={styles.label}>Age</Text>
                <TextField
                    ref={this.ageRef}
                    value={defaults.age}
                    autoCorrect={false}
                    enablesReturnKeyAutomatically={true}
                    onFocus={this.onFocus}
                    onChangeText={this.onChangeText}
                    onSubmitEditing={this.onSubmitAge}
                    returnKeyType='next'
                    label='Age'
                    error={errors.age}
                />
                <Text style={styles.label}>Weight</Text>
                <TextField
                    ref={this.weightRef}
                    value={defaults.weight}
                    onFocus={this.onFocus}
                    onChangeText={this.onChangeText}
                    onSubmitEditing={this.onSubmitWeight}
                    returnKeyType='next'
                    label='Weight'
                    error={errors.weight}
                />
                <Text style={styles.label}>ft</Text>
                <TextField
                    ref={this.feetRef}
                    value={feet}
                    onFocus={this.onFocus}
                    onChangeText={this.onChangeText}
                    onSubmitEditing={this.onSubmitFeet}
                    returnKeyType='next'
                    label='ft'
                    error={errors.feet}
                />
                <Text style={styles.label}>in</Text>
                <TextField
                    ref={this.inchesRef}
                    value={defaults.inches}
                    enablesReturnKeyAutomatically={true}
                    onFocus={this.onFocus}
                    onChangeText={this.onChangeText}
                    onSubmitEditing={this.onSubmitInches}
                    returnKeyType='next'
                    label='in'
                    error={errors.inches}
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                onPress={() => {
                    this.calculateCalories();
                    props.navigation.navigate('CalculationResult', {
                        dailyCalories: dailyCalories,
                    });
                }}
                >
                <Text style={{color: Colors.secondaryColor}}>CALCULATE</Text>
            </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    }
  }

  export const screenOptions = () =>  {
    return {
      headerTitle: 'Daily Calories Calculator',
      headerStyle: {
        backgroundColor: Platform.OS === 'ios' ? '' : Colors.primaryColor,
      },
      headerTintColor: Colors.secondaryColor 
    }
  }

export default CaloriesCalculator;



<SafeAreaView style={styles.container}>
<FlatList
  keyExtractor={(item) => item._id}
  data={catList.sort((a,b) => a.id-b.id)}
  renderItem={renderGridItem}
  //numColumns={2}
/>    
</SafeAreaView>

   <View>
        <RecyclerListView 
          style={{flex: 1}}
          rowRenderer={rowRenderer}
          dataProvider={currentList}
          layoutProvider={layoutProvider}
        />
    </View>


    //current setup copy

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

const CaloriesCalculator = props => {
    //reset all calculator parameters when back from result page
    const resetCalculator = reset || null;
    if (resetCalculator) reset();

    const [gender, setGender] = useState('female');
    const [age, setAge] = useState('');

    const [weight, setWeight] = useState('');
    const [feet, setFeet] = useState('');
    const [inches, setInches] = useState('');
    const [activity, setActivityFactor] = useState('bmr');
    const [dailyCalories, setDailyCalories] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [inputs, setInputs] = useState({});
    const [reset, setReset] = useState(false);

    const focusNextField = (id) => {
        inputs[id].focus()
        console.log('inputs fields: ', inputs[id])
    }
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
                            placeholder="00"
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
                            placeholder="000"
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

const [gender, setGender] = useState('female');
const [age, setAge] = useState('');
const [inputAgeRef, setInputAgeFocus] = UseFocus()
const [weight, setWeight] = useState('');
const [inputWeightRef, setInputWeightFocus] = UseFocus()
const [feet, setFeet] = useState('');
const [inputFeetRef, setInputFeetFocus] = UseFocus()
const [inches, setInches] = useState('');
const [inputInchesRef, setInputInchesFocus] = UseFocus()
const [activity, setActivityFactor] = useState('bmr');
const [dailyCalories, setDailyCalories] = useState('');
const [showResult, setShowResult] = useState(false);

//original April 8
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

    const [weight, setWeight] = useState('');
    const [feet, setFeet] = useState('');
    const [inches, setInches] = useState('');
    const [activity, setActivityFactor] = useState('bmr');
    const [dailyCalories, setDailyCalories] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [inputs, setInputs] = useState(defaults);
    const [reset, setReset] = useState(false);

    console.log('default inputs: ', inputs)

    function focusNextField(id) {
        console.log('inputs fields: ', id)
        return inputs[id].focus()
    }

    const onChangeText = (text) => {
        ['age', 'weight', 'feet', 'inches']
          .map((name) => ({ name, ref: [name] }))
          .forEach(({ name, ref }) => {
            if (ref.current.focus()) {
              useState({ [name]: text });
            }
          });
      }

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
                            placeholder="00"
                            returnKeyType={ 'done' }
                            blurOnSubmit={ false }
                            value={age}
                            keyboardType='numeric'
                            numberOfLines={1}
                            onChangeText={text => {   
                                setAge(text);
                                inputs['age'] = text;

                                console.log('input age from onchageText: ', inputs['age'])
                            }}
                            onSubmitEditing={() => {focusNextField('weight')}}
                            ref={input => inputs['age'] = input}
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
                            onSubmitEditing={() => {
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
                                ref={input => inputs['inches'] = input}
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


<View style={styles.checkBoxContainer}>
<CheckBox
    checked={defalts.gender === 'male' ? true : false}
    onPress={ () => { setGender('male') }}
/>
<Text style={{marginTop: 20, fontSize: hp('1.8%'),fontFamily: 'open-sans',color: Colors.secondaryColor,}}> Male</Text>
<CheckBox
    checked={defaults.gender === 'female' ? true : false}
    onPress={ () => { setGender('female') }}
/>
<Text style={{marginTop: 20, fontSize: hp('1.8%'),fontFamily: 'open-sans',color: Colors.secondaryColor,}}>Female</Text>
</View>