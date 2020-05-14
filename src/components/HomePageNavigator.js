import React from 'react';
import { View,StyleSheet, Text, Image, TouchableHighlight, TextInput, KeyboardAvoidingView } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardPage from './DashboardPage';
import TransaksiPage from './TransaksiPage';
import LaporanPage from './LaporanPage';
import ProfilePage from './ProfilePage';


class HomePageNavigator extends React.Component {
  render() {
    
    return (
    	<NavigationContainer>
	      <Stack.Navigator initialRouteName="DashboardPage" headerMode="none">
	        <Stack.Screen name="DashboardPage" component={DashboardPage}/>
	        <Stack.Screen name="TransaksiPage" component={TransaksiPage}/>
	        <Stack.Screen name="LaporanPage" component={LaporanPage} />
	        <Stack.Screen name="ProfilePage" component={ProfilePage} />
	      </Stack.Navigator>
	    </NavigationContainer>
    );
  }
}
const Stack = createStackNavigator();

export default HomePageNavigator;