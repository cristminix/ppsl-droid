import React from 'react';
import {  AsyncStorage,View,StyleSheet, Text, Image, TouchableHighlight, TextInput, KeyboardAvoidingView,SafeAreaView,Dimensions ,ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Spinner from 'react-native-loading-spinner-overlay';
import LoginAction from './actions/LoginAction';

class LoginPage extends LoginAction{
   
    render() {
        return (
            <KeyboardAvoidingView style={styles.wrapper} behavior={Platform.OS === "ios" ? "padding" : null}>
                <Spinner visible={this.state.spinner} textContent={'Loading...'} textStyle={styles.spinnerTextStyle} /> 
                <View style={styles.header}>
                        <View style={{alignItems:'center'}}>
                            <Image style={styles.logo} source={ require('../../assets/logo.png') }/>
                        <Text style={styles.headerTitle}>PERUMDAM TKR</Text>
                        </View>
                        
                </View> 
                
                <SafeAreaView style={styles.content}>
                <ScrollView style={{paddingVertical:20}}>
                    <Text style={[styles.welcomeText,{padding:5}]}>Selamat datang,</Text>
                    <Text style={{paddingHorizontal:5}}>Silahkan Login</Text>
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
                            <TouchableHighlight onPress={this._ie_clear} style={[styles.formIconClose,this.state._ie_clr_btn_style]}>
                                <Image  source={ require('../../assets/icon/close.png') }
                                    
                                />
                            </TouchableHighlight>       
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={[{paddingTop:5,paddingLeft:5},this.state._ip_lbl_style]}>Password</Text>

                            <TextInput style={styles.textInput}
                            value={this.state.password}
                            onChangeText={( password ) => this.setState({ password })}
                            onFocus={this._onInputPasswordFocus}
                            onBlur={this._onInputPasswordBlur}
                            onKeyPress={this._validateInput}
                            placeholder={this.state._ip_placeHolderText}
                            placeholderTextColor="#8F8EA0"
                            underlineColorAndroid={this.state._ip_underlineColor}
                            secureTextEntry={this.state._ip_Secured}
                                />
                            <TouchableHighlight onPress={this._ip_viewPass} style={[styles.formIconViewPass,this.state._ip_shp_o_btn_style]}>
                                <Image source={ require('../../assets/icon/eye-close.png') }/>
                            </TouchableHighlight>

                            <TouchableHighlight onPress={this._ip_hidePass} style={[styles.formIconClose,this.state._ip_shp_c_btn_style]}>
                                <Image  source={ require('../../assets/icon/eye-open.png') }/>
                            </TouchableHighlight>
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.anchorRight} onPress={this._onForgetPassword}>Lupa Password ?</Text>

                        </View>

                        <View  style={styles.formGroup}>
                            <View  style={[styles.errorMessage,this.state._form_err_msg_style]}>
                                <Text style={{color:'#ffffff',padding:4}}>{this.state._form_errorMessage}</Text>
                            </View>
                        </View>

                        <View  style={styles.formGroup}>
                        <TouchableHighlight style={styles.btnLogin} onPress={this._onSubmitForm} disabled={this.state._btLoginDisabled}>
                            <Text style={styles.btnLoginText}> Login </Text>
                        </TouchableHighlight>
                        </View>
                    </View>
                    <View style={styles.info}>
                        <Text style={{textAlign:'center'}}>Belum punya akun ? </Text> 
                        <TouchableHighlight onPress={this._onRegister}>
                            <Text style={styles.anchorBold}>Registrasi</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.help}>
                    <TouchableHighlight onPress={this._onHelp}>
                        <Text style={styles.anchorCenter}>Butuh Bantuan</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this._onHelp}>
                        <Image style={styles.inlineIcon} source={ require('../../assets/icon/help.png') }/>
                    </TouchableHighlight>
                    </View>
                </ScrollView>    
                </SafeAreaView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    wrapper:{
        paddingTop:Constants.statusBarHeight,
        flex:1,
        backgroundColor:'#F8F7FC' 
    },
    header:{
        alignItems:'center',
        justifyContent:'center'
    },
    headerTitle:{
        color:'#36227C',
        fontWeight:'bold',
        fontSize:20,
        marginBottom:10,
        marginTop:-10,
    },
    logo:{
        width:200,height:200,
        resizeMode:'contain',
        marginTop:10
    },
    content:{
        flex:1,
        backgroundColor:'white',
        borderTopLeftRadius:25,
        borderTopRightRadius: 25,
        padding:10,
        paddingBottom:0
    },
    anchor:{
        color:'#009EEE',
        textDecorationLine:'underline'
    },
    anchorRight:{
        color:'#009EEE',
        textDecorationLine:'underline',
        textAlign:'right'
    },
    anchorCenter:{
        color:'#009EEE',
        textDecorationLine:'underline',
        textAlign:'center'
    },
    anchorBold:{
        color:'#009EEE',
        fontWeight:'bold'
    },
    welcomeText:{
        color:'#3A3E4A',
        fontWeight:'bold',
        fontSize:16,
    },  
    info:{
        paddingVertical:20,
        flexDirection:'row',
        justifyContent:'center'
    },
    help:{
        flexDirection:'row',
        justifyContent:'center'
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
    textInput:{
        paddingVertical:10,
        paddingHorizontal:5,
        fontSize:14
    },
    inlineIcon:{
        position:'relative',
        margin:4
    },
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
    formIconViewPass:{
        position:'absolute',
        marginTop:0,
        right:0,
        
        width:40,
        height:40,
        padding:10
    },
    formIconHidePass:{
        position:'absolute',
        marginTop:0,
        right:0,
        width:40,
        height:40,
        padding:10

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

export default LoginPage;