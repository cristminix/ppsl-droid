import React from 'react';
import { View,StyleSheet, Text, Image, TouchableHighlight, TextInput, KeyboardAvoidingView } from 'react-native';
import Constants from 'expo-constants';

class LoginPage extends React.Component {
    state = {
        email:''
    };
    render() {
        return (
            <KeyboardAvoidingView style={styles.wrapper} behavior='padding'>
                <View style={styles.header}>
                        <Image style={styles.logo} source={ require('../../assets/logo.png') }/>
                        <Text style={styles.headerTitle}>PERUMDAM TKR</Text>
                </View> 
                
                <View style={styles.content}>
                    <Text style={styles.welcomeText}>Selamat datang,</Text>
                    <Text style={styles.defaultText}>Silahkan Login</Text>
                    <View style={styles.form}>
                        <View style={styles.formGroup}>
                        <TextInput style={styles.textInput}
                           value={this.state.email}
                           onChangeText={( email ) => this.setState({ email })}
                           placeholder={'Email'}
                           placeholderTextColor="#8F8EA0"
                           underlineColorAndroid='#EFEFEF'
                            />
                        </View>
                        <View style={styles.formGroup}>
                        <TextInput style={styles.textInput}
                           value={this.state.password}
                           onChangeText={( password ) => this.setState({ password })}
                           placeholder={'Password'}
                           placeholderTextColor="#8F8EA0"
                           underlineColorAndroid='#EFEFEF'
                            />
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.anchorRight}>Lupa Password</Text>
                        </View>
                        <View  style={styles.formGroup}>
                        <TouchableHighlight style={styles.btnLogin} onPress={()=> alert('')}>
                            <Text style={styles.btnLoginText}> Login </Text>
                        </TouchableHighlight>
                        </View>
                    </View>
                    <View style={styles.info}>
                        <Text style={{textAlign:'center'}}>Belum punya akun ? <Text style={styles.anchorBold}>Registrasi</Text></Text>
                    </View>
                    <View style={styles.help}>
                        <Text style={styles.anchorCenter}>Butuh Bantuan</Text>
                        <Image style={styles.inlineIcon} source={ require('../../assets/icon/help.png') }/>
                    </View>
                </View>
                
            </KeyboardAvoidingView>
        );
    }
}

export default LoginPage;

const styles = StyleSheet.create({
    wrapper:{
        paddingTop:Constants.statusBarHeight,
        flex:1,
        backgroundColor:'#F8F7FC' 
    },
    header:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    headerTitle:{
        flex:1,
        color:'#36227C',
        fontWeight:'bold',
        fontSize:20
    },
    logo:{
        flex:2,
        resizeMode:'contain',
        marginTop:10
    },
    content:{
        flex:2,
        backgroundColor:'white',
        borderTopLeftRadius:25,
        borderTopRightRadius: 25,
        padding:20
    },
    defaultText:{
        // fontSize:12,
        // letterSpacing:-0.02
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
    },
    help:{
        paddingVertical:10,
        flexDirection:'row',
        justifyContent:'center'
    },
    formGroup:{
        paddingVertical:4
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
        fontSize:14
    },
    inlineIcon:{
        position:'relative',
        margin:4
    }   
});