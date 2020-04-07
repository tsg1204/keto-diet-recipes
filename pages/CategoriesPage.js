import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet , SafeAreaView, FlatList, TouchableOpacity, Platform, Dimensions} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
 } from 'react-native-responsive-screen';
import Constants from 'expo-constants';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';

import { Colors } from '../data/data';
import { fetchCategories } from '../store/actions/recipes';
import { TextInput } from 'react-native-gesture-handler';
//https://reactnative.dev/docs/flatlist
//https://reactnative.dev/docs/platform-specific-code
const SCREEN_WIDTH = Dimensions.get('window').width;

const CategoriesPage = props => {
  const catList = useSelector(state => state.recipes.categories);
  //console.log('catList from CategoriesPage:', catList)
  //test: implementing RecyclerListView
  // const newList = [];
  // for(let i = 0; i < catList.length; i++) {
  //   newList.push({
  //     type:'NORMAL',
  //     item: {
  //       id: catList._id,
  //       title: catList.title,
  //       recipes: catList.recipes
  //     }
  //   })
  // }

  // let [currentList, setCurrentList] = useState([]);
  // setCurrentList(currentList = new DataProvider((r1, r2) => r1 != r2).cloneWithRows(newList));
  // console.log('currentList: ', currentList);

  // const layoutProvider = new LayoutProvider((i) => {
  //   return currentList.getDataForIndex(i).type;
  // }, (type, dim) => {
  //   switch (type) {
  //     case 'NORMAL':
  //       dim.width = SCREEN_WIDTH;
  //       dim.height = 100;
  //       break;
  //     default:
  //       dim.width = 0;
  //       dim.height = 0;
  //   }
  // })

  //end test

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

  const rowRenderer = (type, data) => {
    const { id, title, recipes } = data.item;
    return (
      <View>
        <Text>{title}</Text>
      </View>
    )
  }

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
      backgroundColor: Colors.primaryColor,
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