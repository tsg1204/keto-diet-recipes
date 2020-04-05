import React, { useState } from 'react';
import * as Font from 'expo-font';
import { AppLoading, Linking } from 'expo';
import { SafeAreaProvider  } from 'react-native-safe-area-context';
 import { Provider } from "react-redux";
 import { createStore, applyMiddleware, combineReducers } from 'redux';
 import ReduxThunk from 'redux-thunk';
 import { NavigationContainer } from '@react-navigation/native';
 
//react native navigation https://reactnavigation.org/docs/4.x/getting-started/
import { AppNavigator, AppTabs } from './navigation/AppNavigator';
import recipesReducer from './store/reducers/recipesReducer';
import singleRecipeReducer from './store/reducers/singleRecipeReducer';

const rootReducer = combineReducers({
  recipes: recipesReducer,
  recipe: singleRecipeReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
const prefix = Linking.makeUrl('/');

const fetchFonts = () => {
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
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer >
          <AppNavigator  uriPrefix={prefix} />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>

  );
}

