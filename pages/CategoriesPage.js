import React, { useEffect } from 'react';
import { View, Text, StyleSheet , SafeAreaView, FlatList, TouchableOpacity, Platform} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
 } from 'react-native-responsive-screen';
import Constants from 'expo-constants';

import { Colors } from '../data/data';
import { fetchCategories } from '../store/actions/recipes';
//https://reactnative.dev/docs/flatlist
//https://reactnative.dev/docs/platform-specific-code

const CategoriesPage = props => {
  const catList = useSelector(state => state.recipes.categories);
  //console.log('catList from CategoriesPage:', catList)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const renderGridItem = itemData => {
    return (
      <TouchableOpacity
        style={styles.gridItem}
        onPress={() => {
          props.navigation.navigate('CategoryRecipes', {
            categoryId: itemData.item._id,
            catTitle: itemData.item.title
          });
        }}
      >
        <View >
          <Text style={styles.title}>{itemData.item.title.toUpperCase()}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        keyExtractor={(item) => item._id}
        data={catList.sort((a,b) => a.id-b.id)}
        renderItem={renderGridItem}
        //numColumns={2}
    />    
    </SafeAreaView>
  );
};

export const screenOptions = () =>  {
  return {
    headerTitle: 'Keto Recipes Categories',
    headerStyle: {
      backgroundColor: Platform.OS === 'ios' ? '' : Colors.primaryColor,
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
  gridItem: {
    flex: 1,
    margin: 15,
    width: wp('40%'),
    //backgroundColor: '#c5e1a5',
    borderColor: '#c5e1a5',
    borderWidth: 2,
    borderRadius: 25
  },
  title: {
    fontFamily: 'open-sans',
    fontSize: hp('1.6%'),
    height: hp('5%'),
    color: Colors.secondaryColor,
    textAlign: 'center',
    paddingTop: 15,
    justifyContent: 'space-evenly', 

  }
});

export default CategoriesPage;