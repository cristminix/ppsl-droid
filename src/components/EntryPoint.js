import React from 'react';
import {  AsyncStorage,View, Text} from 'react-native';
import Constants from 'expo-constants';
import Spinner from 'react-native-loading-spinner-overlay';

class EntryPoint extends React.Component {
    goBack=()=>{
        this.props.navigation.navigate('LoginPage');
    };
    state = {
        spinner:false,
        text:'hello',
        account:null
    };

    

    componentDidMount(){
    	
		
    }
    find_dimesions(layout){
    	if(this.state.account != null){
    		return;
    	}
	    const {x, y, width, height} = layout;
	    let text ='Component did mount .... [ok]' + "\n";
    	this.setState({text:text});
    	console.log(text);

		AsyncStorage.getItem('account', (error, result) => {
			if (result) {
			    // console.log(JSON.parse(result));
			    this.setState({account:JSON.parse(result)})

			}
		});
    	/////////////////////////
    	setTimeout(()=>{
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
    	},1000);
		
    	console.log(text);
	  }

	render(){
		console.log('rendering');
		return (  
			        
            <View  onLayout={(event) => { this.find_dimesions(event.nativeEvent.layout) }}>
                <Text style={{padding:100,fontSize:14}}>{this.state.text}</Text>
            </View>    
		);
	}
}

export default EntryPoint;