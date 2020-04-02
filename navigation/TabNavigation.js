import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: '#e91e63',
        }}
      >
        <Tab.Screen
          name="Favorite"
          component={Home}
          options={{
            tabBarLabel: 'Favorite',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }