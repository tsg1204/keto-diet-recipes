import React from 'react';
import { View, Text, Button, StyleSheet , SafeAreaView, FlatList, TouchableOpacity, Platform} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
 } from 'react-native-responsive-screen';
import Constants from 'expo-constants';

import { CATEGORIES } from '../data/dummy-data';
//https://reactnative.dev/docs/flatlist
//https://reactnative.dev/docs/platform-specific-code

const Colors = {
  primaryColor: '#8bc34a',
  secondaryColor: '#795548' 
}

const CategoriesPage = props => {
  const renderGridItem = itemData => {
    return (
      <TouchableOpacity
        style={styles.gridItem}
        onPress={() => {
          props.navigation.navigate({ routeName: 'CategoryMeals', params: {
            categoryId: itemData.item.id
          } });
        }}
      >
        <View>
          <Text>{itemData.item.title}</Text>
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
          numColumns={2}
      />    
      </SafeAreaView>
    );
};

CategoriesPage['navigationOptions'] = {
  headerTitle: 'Keto Recipes Categories',
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
    //borderColor: 'grey',
    //width: wp('100%'),
    //height: hp('100%')
  },
  gridItem: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    height: hp('20%')
  },
  title: {
    fontSize: hp('2%'),
  },
});

export default CategoriesPage;