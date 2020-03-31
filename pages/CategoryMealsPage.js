import React from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, Platform, ImageBackground} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
 } from 'react-native-responsive-screen';
import { CATEGORIES, Colors, MEALS } from '../data/data';

const CategoryMealPage = ({ navigation }) => {
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
              <Text>Duration: {duration} min</Text>
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
        style={{ width: '100%' }}
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
    padding: 15
  },
  listItem: {
    // height: hp('100%'),
    // width: wp('100%'),
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10
  },
  bgImage: {
    width: wp('100%'),
    height: hp('100%'),
    justifyContent: 'flex-end',
  },
  listRow: {
    flexDirection: 'row'
  },
  listHeader: {
    height: hp('85%'),
  },
  listDetail: {
    paddingHorizontal: 10,
    alignItems: 'center',
    height: hp('32%'),
  },
  titleContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 5,
    paddingHorizontal: 12
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    color: 'white',
    textAlign: 'center'
  }
});

export default CategoryMealPage;