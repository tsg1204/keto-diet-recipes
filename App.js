import React, { useState } from 'react';
import { Text, View , StyleSheet} from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

//react native navigation https://reactnavigation.org/docs/4.x/getting-started/
import MealsNavigator from './navigation/MealsNavigator';

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
    <MealsNavigator />
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
