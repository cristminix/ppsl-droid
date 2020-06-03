import React from 'react';
import { View,StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Notifications } from 'expo';
import LoginPage from './LoginPage';
import HelpPage from './HelpPage';
import ForgetPage from './ForgetPage';
import RegisterPage from './RegisterPage';
import DashboardPage from './DashboardPage';
import TransaksiPage from './TransaksiPage';
import LaporanPage from './LaporanPage';
import ProfilePage from './ProfilePage';
import HomePageNavigator from './HomePageNavigator';
import LoginPageNavigator from './LoginPageNavigator';
import EntryPoint from './EntryPoint';
import ChangeProfilePage from './ChangeProfilePage';
import ChangePasswdPage from './ChangePasswdPage';
import SurveyPage from './SurveyPage';
import NotificationPage from './NotificationPage';

class PPSLApp extends React.Component{
	render(){
        return(<NavigationContainer>
        	      <Stack.Navigator initialRouteName="EntryPoint" headerMode="none">
        	        <Stack.Screen name="EntryPoint" component={EntryPoint}/>
        	        <Stack.Screen name="LoginPage" component={LoginPage}/>
        	        <Stack.Screen name="RegisterPage" component={RegisterPage} />
        	        <Stack.Screen name="ForgetPage" component={ForgetPage} />
        	        <Stack.Screen name="HelpPage" component={HelpPage} />
        	        <Stack.Screen name="DashboardPage" component={DashboardPage}/>
        	        <Stack.Screen name="TransaksiPage" component={TransaksiPage}/>
        	        <Stack.Screen name="LaporanPage" component={LaporanPage} />
        	        <Stack.Screen name="ProfilePage" component={ProfilePage} />
        	        <Stack.Screen name="ChangeProfilePage" component={ChangeProfilePage} />
        	        <Stack.Screen name="ChangePasswdPage" component={ChangePasswdPage} />
        	        <Stack.Screen name="SurveyPage" component={SurveyPage} />
        	        <Stack.Screen name="NotificationPage" component={NotificationPage} />
        	      </Stack.Navigator>
        	    </NavigationContainer>)
    }
		

}
const Stack = createStackNavigator();
export default PPSLApp;
