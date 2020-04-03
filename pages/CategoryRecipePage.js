import React, { useEffect }  from 'react';
import { View, Text, Dimensions, StyleSheet, FlatList, TouchableOpacity, Platform, ImageBackground } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
 } from 'react-native-responsive-screen';

import { Colors } from '../data/data';
import { fetchRecipes } from '../store/actions/recipes';

const CategoryRecipePage = ({ navigation }) => {
  //may need to use for web setup
  const currentWindow = Dimensions.get('window');
  //get category id from categories page 
  const catId = navigation.getParam('categoryId');
  //console.log('category id from CategoryRecipePage: ', catId)

  const recipes = useSelector( state => state.recipes.recipes)
  //retrive recipes of selected category 
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecipes(catId));
  }, [dispatch, catId]);

  //console.log('recipes from available: ', recipes)

  function ListItem(props) {
    const { id, image, title, duration, testId } = props;
    return (
      <View style={styles.listItem} >
        <TouchableOpacity 
          onPress={() => {
            navigation.navigate('RecipeDetails', {
                itemId: id,
                recipeTitle: title,
                catId: catId,
                testId: testId
            });
          }}          
        >
          <View key={id}>
            <View style={{ ...styles.listRow, ...styles.listHeader }} >
              <ImageBackground
                source={{ uri: image }}
                style={styles.bgImage}
              >
                <View style={styles.titleContainer} >
                  <Text style={styles.title} numberOfLines={1} >
                    {title}
                  </Text>
                </View>
              </ImageBackground>
            </View>
            <View style={{ ...styles.listRow, ...styles.listDetail }} >
              <Text style={styles.duration} >Duration: {duration} min</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderListItem = itemData => {
    return (
      <ListItem
        key={itemData.item._id}
        id={itemData.item._id}
        testId={itemData.item.id}
        title={itemData.item.title}
        image={itemData.item.imageUrl}
        duration={itemData.item.duration}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item._id}
        renderItem={renderListItem}
        style={{ width: wp('100%') }}
      />
    </View>
  );
};

CategoryRecipePage['navigationOptions'] = (navigationData) => {
  const categoryTitle = navigationData.navigation.getParam('catTitle');

  return {
    headerTitle: `Category: ${categoryTitle}`,
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
    marginHorizontal: Platform.OS === 'ios' ? 15 : 100,
  },
  bgImage: {
    //have to adjust images size
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
    fontSize: hp('1.7%'),
  }
});

export default CategoryRecipePage;