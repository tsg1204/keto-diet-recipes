import React, { useState } from 'react';
import { Text, View , StyleSheet} from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { SafeAreaProvider , initialWindowSafeAreaInsets } from 'react-native-safe-area-context';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
 } from 'react-native-responsive-screen';
 import Constants from 'expo-constants';

//react native navigation https://reactnavigation.org/docs/4.x/getting-started/
import AppNavigator from './navigation/AppNavigator';

const fetchFonts = () => {
  //got google fonts for the app 
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  // useState to load fonts
  const [fontLoaded, setFontLoaded] = useState(false);
  //from example: have to use AppLoading component of Expo so fonts will be loaded first
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  };

  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
