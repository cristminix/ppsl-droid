import React from 'react';
import { View,StyleSheet, Text, Image, TouchableHighlight, TextInput, KeyboardAvoidingView ,SafeAreaView, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import Spinner from 'react-native-loading-spinner-overlay';

class ForgetPage extends React.Component {
    
    state = {
        spinner:false,
        email:'',
        _ie_underlineColor  : '#EFEFEF',
        _ie_placeHolderText : 'Email',
        _ie_lbl_style: {display:'none'},
        _ie_clr_btn_style: {height: 0, width: 0, opacity: 0},
    };

    goBack=()=>{
        this.props.navigation.navigate('LoginPage');
    };

	render(){
        let icons = {
            back :  require('../../assets/icon/chevron-left.png') 
        };
		return (
			<KeyboardAvoidingView style={styles.wrapper} behavior={Platform.OS === "ios" ? "padding" : null}> 
                <Spinner visible={this.state.spinner} textContent={'Memuat data...'} textStyle={styles.spinnerTextStyle}/>
                <View style={styles.header}>
                    <View style={{paddingHorizontal:10,paddingVertical:20}}>
                    <TouchableHighlight underlayColor='transparent' onPress={()=>{this.goBack()}} >
                        <Image style={{width:22}} source={icons.back}/>
                    </TouchableHighlight>
                    </View>
                    <View style={{flex:1,alignItems:'center',paddingVertical:20}}>
                        <Text style={{color:'#ffffff',fontSize:14,marginLeft:-22}}>Lupa Sandi</Text>
                    </View>
                </View>
                <SafeAreaView style={styles.content}>
                    <ScrollView style={{padding:5}}>
                    
                        <Text style={{fontWeight:'bold',fontSize:16,color:'#3A3E4A'}}>Kesulitan Mengakses akun Anda?</Text>
                        <Text style={{marginVertical:10,fontSize:12,color:'#8F8EA0',lineHeight:16}}>Lupa kata sandi? masukkan email login Anda dibawah ini. Kami akan mengirimkan pesan email beserta tautan untuk reset kata sandi Anda.</Text>
                        <View style={styles.form}>
                            <View style={styles.formGroup}>
                                <Text style={[{paddingTop:5,paddingLeft:5},this.state._ie_lbl_style]}>Email</Text>

                                <TextInput style={styles.textInput}
                                value={this.state.email}
                                onChangeText={( email ) => this.setState({ email })}
                                onKeyPress={this._validateInput}
                                placeholder={this.state._ie_placeHolderText}
                                onFocus={this._onInputEmailFocus}
                                onBlur={this._onInputEmailBlur}
                                placeholderTextColor="#8F8EA0"
                                autoCapitalize = 'none'
                                underlineColorAndroid={this.state._ie_underlineColor}
                                    />
                                <TouchableHighlight underlayColor='transparent' onPress={this._ie_clear} style={[styles.formIconClose,this.state._ie_clr_btn_style]}>
                                    <Image  source={icons.close}/>
                                </TouchableHighlight>       
                            </View>
                        </View>    
                    </ScrollView>
                </SafeAreaView>
            </KeyboardAvoidingView>    
		);
	}
}
const styles = StyleSheet.create({
    formIcon:{
        position:'absolute',
        marginTop:20,
        right:0
    },
    formIconClose:{
        position:'absolute',
        marginTop:0,
        right:0,
        
        width:40,
        height:40,
        padding:10

    },
    textInput:{
        paddingVertical:10,
        paddingHorizontal:5,
        fontSize:14
    },
    spinnerTextStyle:{

    },
    wrapper:{
        paddingTop:Constants.statusBarHeight,
        flex:1,
        backgroundColor:'#F8F7FC' 
    },
    header:{
        flexDirection:'row',
        backgroundColor:'#00A4F6',
    },
    content:{
        flex:1,
        backgroundColor:'white',
        padding:20
    },
 
    formGroup:{
        paddingVertical:2
    },
    btnLogin:{
        backgroundColor:'#CACACC',
        borderRadius:50,
        padding:12,
        marginTop:10
    },
    btnLoginText:{
        color:'#fff',
        fontSize:14,
        fontWeight:'bold',
        textAlign:'center'
    },
  
  
    errorMessage:{
        backgroundColor:'#e22134',
        marginVertical:15,
        alignItems:'center',
        padding:10,
        borderRadius:5,
        marginBottom:10
    }    
});

export default ForgetPage;