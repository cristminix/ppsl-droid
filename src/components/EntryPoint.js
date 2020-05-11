import React from 'react';
import {  AsyncStorage,View, Text} from 'react-native';
import Constants from 'expo-constants';
import Spinner from 'react-native-loading-spinner-overlay';
import { NavigationEvents } from '@react-navigation/compat';

class EntryPoint extends React.Component {
    goBack=()=>{
        this.props.navigation.navigate('LoginPage');
    };
    state = {
        spinner:false,
        text:'hello',
        account:null
    };

    onFocusFunction = () => {
	  // do some stuff on every screen focus
	  console.log('onFocusFunction');
	}

    // add a focus listener onDidMount
async componentDidMount () {
  // this.focusListener = this.props.navigation.addListener('didFocus', () => {
    // this.onFocusFunction()
  // })
}

// and don't forget to remove the listener
componentWillUnmount () {
  // this.focusListener.remove()
}
	refreshData = ()=>{
		console.log('refreshData')
		this.setState({account:null});
		let text = '';
		console.log('onLayout');

    	AsyncStorage.getItem('account', (error, result) => {
			if (result) {
				let data = JSON.parse(result);
			    console.log(typeof data);
			    this.setState({account:data})
			}

			/////
			// if(this.state.account != null){
			// 	console.log('return')
   //  			return;
	  //   	}
		    
	    	this.setState({text:text});
	    	console.log(text);

			
	    	/////////////////////////
	    	// setTimeout(()=>{
	    		 text ='Starting app .... [ok]' ;
	    		 let account = this.state.account;
	    		 // console.log(account);
	    		 if(typeof account == 'object' && account != null){
	    		 	text += "\n" +'Checking async storage `account`.... [found]' + "\n";
	    		 	text += `\nRedirecting to HomePage\n`;

	    		 	// setTimeout(()=>{
	        			this.props.navigation.navigate('DashboardPage');
	    		 	// },3000);
	    		 }else{
	    		 	text += "\n" +'Checking async storage `account`.... ['+account+']' + "\n";
	    		 	text += `\nRedirecting to LoginPage\n`;
	    		 	// setTimeout(()=>{
	        			this.props.navigation.navigate('LoginPage');
	    		 	// },1000);
	    		 }

	    		 

	    		// Do checking async storage vars;


	    		this.setState({text:text});
			///
		});

		
    	console.log(text);
	}
    find_dimesions(layout){
    	const {x, y, width, height} = layout;
		
	  }

	render(){
		console.log('rendering');
		return (  
			<View>        
            <View  onLayout={(event) => { this.find_dimesions(event.nativeEvent.layout) }}>

            <NavigationEvents
      onWillFocus={payload => this.refreshData()}
      onWillBlur={payload => console.log('will blur', payload)}
      onDidBlur={payload => console.log('did blur', payload)}
    />
            </View>    
            </View>
		);
	}
}

export default EntryPoint;