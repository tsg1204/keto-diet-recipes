import React from 'react';
import { View, Text, Button, StyleSheet , SafeAreaView, FlatList, TouchableOpacity, Platform} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
 } from 'react-native-responsive-screen';
import Constants from 'expo-constants';

import { CATEGORIES, Colors } from '../data/data';
//https://reactnative.dev/docs/flatlist
//https://reactnative.dev/docs/platform-specific-code

const CategoriesPage = ({ navigation })=> {
  const renderGridItem = itemData => {
    return (
      <TouchableOpacity
        style={styles.gridItem}
        onPress={() => {
          navigation.navigate('CategoryMeals', {
            categoryId: itemData.item.id
          });
        }}
      >
        <View >
          <Text style={styles.title}>{itemData.item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

    //console.log('props from CategoriesScreen: ', props)
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          keyExtractor={(item) => item.id}
          data={CATEGORIES}
          renderItem={renderGridItem}
          //numColumns={2}
      />    
      </SafeAreaView>
    );
};

CategoriesPage['navigationOptions'] = {
  title: 'Keto Recipes Categories',
  headerStyle: {
    backgroundColor: Platform.OS === 'ios' ? '' : Colors.primaryColor,
  },
  headerTintColor: Colors.secondaryColor 
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridItem: {
    flex: 1,
    margin: 15,
    width: wp('40%'),
    backgroundColor: '#c5e1a5',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: hp('1.8%'),
    height: hp('5%'),
    color: Colors.secondaryColor,
    textAlign: 'center',
    //padding: 20,
    paddingTop: 15,
    justifyContent: 'space-evenly',    
  }
});

export default CategoriesPage;