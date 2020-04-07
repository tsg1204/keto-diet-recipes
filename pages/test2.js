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
