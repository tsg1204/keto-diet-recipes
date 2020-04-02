import React, { useState } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { SafeAreaProvider  } from 'react-native-safe-area-context';
 import { Provider } from "react-redux";
 import { createStore, applyMiddleware, combineReducers } from 'redux';
 import ReduxThunk from 'redux-thunk';
 
//react native navigation https://reactnavigation.org/docs/4.x/getting-started/
import AppNavigator from './navigation/AppNavigator';
import recipesReducer from './store/reducers/recipesReducer';

const rootReducer = combineReducers({
  recipes: recipesReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

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
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>

  );
}

