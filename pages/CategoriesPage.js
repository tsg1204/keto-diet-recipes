import React from 'react';
import { View, Text, Button, StyleSheet , SafeAreaView} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
 } from 'react-native-responsive-screen';

const CategoriesPage = props => {
    console.log('props from CategoriesScreen: ', props)
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
        <Text>The Categories Page! Testing responsive.</Text>
        <Button title="Go to Meals!" onPress={() => {
            props.navigation.navigate('CategoryMeals');
        }} />
        <Button title="Go to Favorite Meals!" onPress={() => {
          props.navigation.navigate('FavoriteMeal');
      }} />
      </View>      
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'grey',
    width: wp('100%'),
    height: hp('100%')
  }
});

export default CategoriesPage;