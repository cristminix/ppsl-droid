import React from 'react';
import { View,StyleSheet, Text, Image, TouchableHighlight, TextInput, KeyboardAvoidingView } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ForgetPage from './ForgetPage';
import RegisterPage from './RegisterPage';
import HelpPage from './HelpPage';
import LoginPage from './LoginPage';


class LoginPageNavigator extends React.Component {
  render() {
    
    return (
    	<NavigationContainer>
	      <Stack.Navigator initialRouteName="RegisterPage" headerMode="none">
	        <Stack.Screen name="LoginPage" component={LoginPage}/>
	        <Stack.Screen name="RegisterPage" component={RegisterPage} />
	        <Stack.Screen name="ForgetPage" component={ForgetPage} />
	        <Stack.Screen name="HelpPage" component={HelpPage} />
	      </Stack.Navigator>
	    </NavigationContainer>
    );
  }
}
const Stack = createStackNavigator();

export default LoginPageNavigator;