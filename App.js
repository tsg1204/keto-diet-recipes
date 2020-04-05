import React, { useState } from 'react';
import * as Font from 'expo-font';
import { AppLoading, Linking } from 'expo';
import { SafeAreaProvider  } from 'react-native-safe-area-context';
 import { Provider } from "react-redux";
 import { createStore, applyMiddleware, combineReducers } from 'redux';
 import ReduxThunk from 'redux-thunk';
 import { NavigationContainer, useLinking } from '@react-navigation/native';
 
//react native navigation https://reactnavigation.org/docs/4.x/getting-started/
import { AppNavigator, AppTabs } from './navigation/AppNavigator';
import recipesReducer from './store/reducers/recipesReducer';
import singleRecipeReducer from './store/reducers/singleRecipeReducer';

const rootReducer = combineReducers({
  recipes: recipesReducer,
  recipe: singleRecipeReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const prefix = Linking.makeUrl('/')
console.log('prefix: ', prefix)
const config = {
  Categories: {
    path: "categories", //?
    initialRouteName: "Categories",
    screens: {
      Categories: "categories",
    }
  },
  RecipeDetails: "recipe-details"
};

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
  const ref = React.useRef();

  const { getInitialState } = useLinking(ref, {
    prefixes: [prefix],
    config
  });

  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();

  React.useEffect(() => {
    getInitialState()
      .catch(() => {})
      .then(state => {
        if (state !== undefined) {
          setInitialState(state);
        }

        setIsReady(true);
      });
  }, [getInitialState]);

  if (!isReady) {
    return null;
  }

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
          <AppTabs initialState={initialState} />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>

  );
}

