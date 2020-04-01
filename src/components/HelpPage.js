import React from 'react';
import { View,StyleSheet, Text, Image, TouchableHighlight, TextInput, KeyboardAvoidingView } from 'react-native';
import Constants from 'expo-constants';

class HelpPage extends React.Component {
	render(){
		return (
			<View style={styles.wrapper}>
				<View style={styles.content}>
					<Text>This is help page</Text>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
    wrapper:{
        paddingTop:Constants.statusBarHeight,
        flex:1,
        backgroundColor:'#F8F7FC' 
    },
    content:{
        flex:2,
        backgroundColor:'white',
        borderTopLeftRadius:25,
        borderTopRightRadius: 25,
        padding:20
    }
});
export default HelpPage;
