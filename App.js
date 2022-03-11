/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
//  import 'react-native-gesture-handler';

import * as React from 'react';
import {Text, TouchableOpacity, View, Linking, Platform} from 'react-native';
import {Provider} from 'react-redux';
import Navigator from './src/Navigator';
import configureStore from './src/redux/store';

const store = configureStore();

export default function App() {
  // let [loading, setloading] = React.useState([])
  // React.useEffect(async() => {
  // }, [])

  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
