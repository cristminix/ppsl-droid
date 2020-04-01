import React from 'react';
import { View,StyleSheet, Text, Image, TouchableHighlight, TextInput, KeyboardAvoidingView } from 'react-native';
import Constants from 'expo-constants';
import { Right } from 'native-base';

class LoginPage extends React.Component {
    state = {
        email:'',
        password:'',
        _ie_Focused: false,
        _ip_Focused: false,


        _ie_underlineColor  : '#EFEFEF',
        _ie_placeHolderText : 'Email',
        _ie_lbl_style: {display:'none'},
        _ie_clr_btn_style: {height: 0, width: 0, opacity: 0},

        _ip_underlineColor  : '#EFEFEF',
        _ip_placeHolderText : 'Password'
    }; 

    _onInputEmailFocus = () => {
        this.setState({ 
            _ie_Focused: true,
            _ie_underlineColor: '#009EEE',
            _ie_placeHolderText: '',
            _ie_lbl_style: {display:'flex',color:'#009EEE',marginTop:4},
             _ie_clr_btn_style: {marginTop:45}

        });
    };
    _onInputEmailBlur = () => {
        this.setState({ 
            _ie_Focused: true,
            _ie_underlineColor: '#EFEFEF',
            _ie_placeHolderText : 'Email',
            _ie_lbl_style: {display:'none'},
             _ie_clr_btn_style: {height: 0, width: 0, opacity: 0},


        });
    };

    _onInputPasswordFocusChange = () => {
        this.setState({ email: '' });
    }
    _ie_clear = () => {

    };
    render() {
        return (
            <KeyboardAvoidingView style={styles.wrapper} behavior='padding'>
                <View style={styles.header}>
                        <Image style={styles.logo} source={ require('../../assets/logo.png') }/>
                        <Text style={styles.headerTitle}>PERUMDAM TKR</Text>
                </View> 
                
                <View style={styles.content}>
                    <Text style={[styles.welcomeText,{paddingHorizontal:5}]}>Selamat datang,</Text>
                    <Text style={[styles.defaultText,{paddingHorizontal:5}]}>Silahkan Login</Text>


                    <View style={styles.form}>
                        <View style={styles.formGroup}>
                        <Text style={[styles.defaultText,{paddingTop:5,paddingLeft:5},this.state._ie_lbl_style]}>Email</Text>

                        <TextInput style={styles.textInput}
                           value={this.state.email}
                           onChangeText={( email ) => this.setState({ email })}
                           placeholder={this.state._ie_placeHolderText}
                           onFocus={this._onInputEmailFocus}
                           onBlur={this._onInputEmailBlur}
                           placeholderTextColor="#8F8EA0"
                           underlineColorAndroid={this.state._ie_underlineColor}
                            />
                        <Image style={[styles.formIconClose,this.state._ie_clr_btn_style]} source={ require('../../assets/icon/close.png') }
                            onPress={this._ie_clear()}
                        />

                        </View>
                        <View style={styles.formGroup}>
                        <TextInput style={styles.textInput}
                           value={this.state.password}
                           onChangeText={( password ) => this.setState({ password })}
                           onFocus={this._onInputPasswordFocusChange}
                           placeholder={'Password'}
                           placeholderTextColor="#8F8EA0"
                           underlineColorAndroid='#EFEFEF'
                           secureTextEntry={true}
                            />
                        <Image style={styles.formIconViewPass} source={ require('../../assets/icon/eye-open.png') }/>
                        <Image style={styles.formIconHidePass} source={ require('../../assets/icon/eye-close.png') }/>

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
        marginTop:18,
        right:0

    },
    formIconViewPass:{
        position:'absolute',
        marginTop:20,
        right:0
    },
    formIconHidePass:{
        position:'absolute',
        marginTop:20,
        right:1,
        height: 0, width: 0, opacity: 0
    }      
});

export default LoginPage;