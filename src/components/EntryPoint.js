import React from 'react';
import {  AsyncStorage,View, Text} from 'react-native';
import Constants from 'expo-constants';
import { NavigationEvents } from '@react-navigation/compat';

class EntryPoint extends React.Component {
   
state = {
text:'',
account:null
};


refreshData = ()=>{
let text = '';
this.setState({account:null});


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