import React from 'react';
import { View, Text, Dimensions, StyleSheet, FlatList, TouchableOpacity, Platform, ImageBackground } from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
 } from 'react-native-responsive-screen';

import { CATEGORIES, Colors, MEALS } from '../data/data';

const CategoryMealPage = ({ navigation }) => {
  //may need to use for web setup
  const currentWindow = Dimensions.get('window');
  //get category id from categories page via props.navigation
  const catId = navigation.getParam('categoryId');
  //retrive the selected category from categories list
  const meals = MEALS.filter( meal => meal.category.indexOf(catId) >= 0);

  function ListItem(props) {
    const { image, title, duration, onSelectItem } = props;
    return (
      <View style={styles.listItem}>
        <TouchableOpacity onPress={onSelectItem}>
          <View>
            <View style={{ ...styles.listRow, ...styles.listHeader }}>
              <ImageBackground
                source={{ uri: image }}
                style={styles.bgImage}
              >
                <View style={styles.titleContainer}>
                  <Text style={styles.title} numberOfLines={1}>
                    {title}
                  </Text>
                </View>
              </ImageBackground>
            </View>
            <View style={{ ...styles.listRow, ...styles.listDetail }}>
              <Text style={styles.duration}>Duration: {duration} min</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderListItem = itemData => {
    return (
      <ListItem
        title={itemData.item.title}
        image={itemData.item.imageUrl}
        duration={itemData.item.duration}
        onSelectItem={() => {
          navigation.navigate('MealDetail', {
              itemId: itemData.item.id
          });
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={meals}
        keyExtractor={(item) => item.id}
        renderItem={renderListItem}
        style={{ width: wp('100%') }}
      />
    </View>
  );
};

CategoryMealPage['navigationOptions'] = (navigationData) => {
  const catId = navigationData.navigation.getParam('categoryId');
  const selectedCat = CATEGORIES.find( cat => cat.id === catId);

  return {
    headerTitle: `Category: ${selectedCat.title}`,
    headerStyle: {
      backgroundColor: Platform.OS === 'ios' ? '' : Colors.primaryColor,
    },
    headerTintColor: Colors.secondaryColor 
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  listItem: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10,
    marginHorizontal: Platform.OS === 'ios' ? 30 : 100,
  },
  bgImage: {
    width: Platform.OS === 'ios' ? Dimensions.get('screen').width : Dimensions.get('window').width,
    height: Platform.OS === 'ios' ? Dimensions.get('screen').width*.5 : Dimensions.get('window').width*.2,
    justifyContent: 'flex-end',
  },
  listRow: {
    flexDirection: 'row'
  },
  listHeader: {
    //height: hp('85%'),
  },
  listDetail: {
    paddingHorizontal: 10,
    alignItems: 'center',
    //height: hp('5%'),
    fontFamily: 'open-sans-bold',
  },
  titleContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 5,
    paddingHorizontal: 12
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: hp('1.9%'),
    color: 'white',
    textAlign: 'center'
  },
  duration: {
    fontFamily: 'open-sans',
    fontSize: hp('1.8%'),
  }
});

export default CategoryMealPage;