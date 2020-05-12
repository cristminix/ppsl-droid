import React from 'react';
import {  AsyncStorage,View, Text} from 'react-native';
import Constants from 'expo-constants';
import Spinner from 'react-native-loading-spinner-overlay';
import { NavigationEvents } from '@react-navigation/compat';

class EntryPoint extends React.Component {
   
    state = {
        spinner:false,
        text:'',
        account:null
    };

    
	refreshData = ()=>{
		console.log('refreshData')
		this.setState({account:null});
		let text = '';

    	AsyncStorage.getItem('account', (error, result) => {
			if (result) {
				let data = JSON.parse(result);
			    this.setState({account:data})
			}
		    
	    	this.setState({text:text});
    		text ='Starting app .... [ok]' ;
    		let account = this.state.account;
    		if(typeof account == 'object' && account != null){
    		 	text += "\n" +'Checking async storage `account`.... [found]' + "\n";
    		 	text += `\nRedirecting to HomePage\n`;

        			this.props.navigation.navigate('DashboardPage');
    		}else{
    		 	text += "\n" +'Checking async storage `account`.... ['+account+']' + "\n";
    		 	text += `\nRedirecting to LoginPage\n`;
        		this.props.navigation.navigate('LoginPage');
    		}
    		this.setState({text:text});
		});

	}

	render(){
		return (  
			<View>        
            	<View >
            		<NavigationEvents onWillFocus={payload => this.refreshData()} />
    				<Text>{this.state.text}</Text>
            	</View>    
            </View>
		);
	}
}

export default EntryPoint;