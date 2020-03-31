import React from 'react';
import { View, Text, Button, StyleSheet , SafeAreaView, FlatList} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
 } from 'react-native-responsive-screen';
import Constants from 'expo-constants';

import { CATEGORIES } from '../data/dummy-data';
//https://reactnative.dev/docs/flatlist

function Item({ title }) {
  return (
    <View style={styles.gridItem}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const CategoriesPage = props => {
    //console.log('props from CategoriesScreen: ', props)
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          keyExtractor={(item) => item.id}
          data={CATEGORIES}
          renderItem={({ item }) => <Item title={item.title} />}
          numColumns={2}
      />    
      </SafeAreaView>
    );
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
  },
  title: {
    fontSize: 26,
  },
});

export default CategoriesPage;