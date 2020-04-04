import React, { useEffect }  from 'react';
import { View, Text, Dimensions, SafeAreaView, StyleSheet, FlatList, TouchableOpacity, Platform, ImageBackground } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
 } from 'react-native-responsive-screen';
 import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../data/data';
import { fetchFavoriteRecipes } from '../store/actions/recipes';

const FavoritesPage = ({ navigation }) => {
  const recipes = useSelector( state => state.recipes.favoriteRecipes);
  const catId = navigation.getParam('categoryId');

  const dispatch = useDispatch();

  useEffect(() => {
    //console.log('from fetchFavoriteRecipes')
    dispatch(fetchFavoriteRecipes());   
  }, [dispatch]);

  function ListItem(props) {
    const { id, image, title, duration, favorite, insideId } = props;
    return (
      <View style={styles.listItem} >
        <TouchableOpacity 
          onPress={() => {
            navigation.navigate('RecipeDetails', {
                itemId: id,
                recipeTitle: title,
                catId: catId,
                favorite: favorite,
                insideId: insideId
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
        favorite={itemData.item.favorite}
        insideId={itemData.item.id}
      />
    );
  };

  if (recipes.length === 0 ) {
    return (
      <View style={styles.container}>
        <Text>No favorite recipes found.</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item._id}
        renderItem={renderListItem}
        style={{ width: wp('100%') }}
      />
    </SafeAreaView>
  );
};

FavoritesPage['navigationOptions'] = {
  title: 'Favorite Recipes',
  headerStyle: {
    backgroundColor: Platform.OS === 'ios' ? '' : Colors.primaryColor,
  },
  headerTintColor: Colors.secondaryColor 
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
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
    flexDirection: 'row',

  },
  listHeader: {
    //height: hp('85%'),
  },
  listDetail: {
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
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

export default FavoritesPage;