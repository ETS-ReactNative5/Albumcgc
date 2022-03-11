import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import Photos from './Photos';
const Stack = createStackNavigator();


const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'HomeScreen'}
      options={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Photos"
        component={Photos}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

function  Navigator()  {
  return (
    <NavigationContainer>
      <AppStack/>
    </NavigationContainer>
  );
}

export default Navigator;