import React from 'react';
import { View,StyleSheet, Text, Image, TouchableHighlight, TextInput, KeyboardAvoidingView } from 'react-native';
import Constants from 'expo-constants';
import ForgetPage from './ForgetPage';
import RegisterPage from './RegisterPage';
import HelpPage from './HelpPage';

class LoginPage extends React.Component {
   
    // use in Stack navigator only
    static navigationOptions = {
        title: 'Login Page',
    };

    // constructor(props){
    //     super(props);
    //     console.log(this.props.navigation)
    // }
    state = {
        email:'',
        password:'',
        _ie_Focused: false,
        _ip_Focused: false,
        _ip_Secured: true,


        _ie_underlineColor  : '#EFEFEF',
        _ie_placeHolderText : 'Email',
        _ie_lbl_style: {display:'none'},
        _ie_clr_btn_style: {height: 0, width: 0, opacity: 0},

        _ip_underlineColor  : '#EFEFEF',
        _ip_placeHolderText : 'Password',
        _ip_lbl_style: {display:'none'},
        _ip_shp_o_btn_style: {},
        _ip_shp_c_btn_style: {height: 0, width: 0, opacity: 0}

    }; 

    _onInputEmailFocus = () => {
        this.setState({ 
            _ie_Focused: true,
            _ie_underlineColor: '#009EEE',
            _ie_placeHolderText: '',
            _ie_lbl_style: {display:'flex',color:'#009EEE',marginTop:4},
            _ie_clr_btn_style: {marginTop:30}

        });
    };
    _onInputEmailBlur = () => {
        this.setState({ 
            _ie_Focused: false,
            _ie_underlineColor: '#EFEFEF',
            _ie_placeHolderText : 'Email',
            _ie_lbl_style: {display:'none'},
            _ie_clr_btn_style: {height: 0, width: 0, opacity: 0}
        });
    };

    _onInputPasswordFocus = () => {
       this.setState({ 
            _ip_Focused: true,
            _ip_underlineColor: '#009EEE',
            _ip_placeHolderText: '',
            _ip_lbl_style: {display:'flex',color:'#009EEE',marginTop:4}
        });

       if(this.state._ip_Secured){  // jika password hidden
            this.setState({ 
                _ip_shp_o_btn_style: {marginTop:30}, // show eye-open
            });
       }else{
            this.setState({ 
                _ip_shp_c_btn_style: {marginTop:30,padding:10,width:40,height:40}, // show eye-close
            });
       }
    };
    _onInputPasswordBlur = () => {
       this.setState({ 
            _ip_Focused: false,
            _ip_underlineColor: '#EFEFEF',
            _ip_placeHolderText : 'Password',
            _ip_lbl_style: {display:'none'},
            
        });
       if(this.state._ip_Secured){  // jika password hidden
            this.setState({ 
                _ip_shp_o_btn_style: {marginTop:0}, // show eye-open
            });
       }else{
            this.setState({ 
                _ip_shp_c_btn_style: {marginTop:0,padding:10,width:40,height:40}, // show eye-close
            });
       }
    };

    _ie_clear = () => {
        this.setState({ email: '' });
    };

    _ip_viewPass = () => {
        console.log('please view password');
        this.setState({ 
            _ip_Secured : false,
            _ip_shp_o_btn_style: {height: 0, width: 0, opacity: 0}, // hide eye-open btn
            _ip_shp_c_btn_style: {marginTop: this.state._ip_Focused ? 30 : 0 ,padding:10,width:40,height:40}, // show eye-close
        });
    };

    _ip_hidePass = () => {
        console.log('please hide password');

        this.setState({ 
            _ip_Secured : true ,
            _ip_shp_c_btn_style: {height: 0, width: 0, opacity: 0}, // hide eye-close
            _ip_shp_o_btn_style: {marginTop: this.state._ip_Focused ? 30 : 0 } // show eye-open


        });
    };
    

    _onForgetPassword = () => {
        console.log('please navigate to Forget Password Page');
        this.props.navigation.navigate('ForgetPage')

    };

    _onRegister = () => {
        console.log('please navigate to Register Page');
        this.props.navigation.navigate('RegisterPage')

    };

    _onHelp = () => {
        console.log('please navigate to Help Page');
        this.props.navigation.navigate('HelpPage')
        // console.log(this.props.navigation)
    };

    _onSubmitForm = () => {
        console.log('Prosess Submit Form');

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
                        <TouchableHighlight onPress={this._ie_clear} style={[styles.formIconClose,this.state._ie_clr_btn_style]}>
                            <Image  source={ require('../../assets/icon/close.png') }
                                
                            />
                        </TouchableHighlight>       
                        

                        </View>
                        <View style={styles.formGroup}>
                        <Text style={[styles.defaultText,{paddingTop:5,paddingLeft:5},this.state._ip_lbl_style]}>Password</Text>

                        <TextInput style={styles.textInput}
                           value={this.state.password}
                           onChangeText={( password ) => this.setState({ password })}
                           onFocus={this._onInputPasswordFocus}
                           onBlur={this._onInputPasswordBlur}
                           placeholder={this.state._ip_placeHolderText}
                           placeholderTextColor="#8F8EA0"
                           underlineColorAndroid={this.state._ip_underlineColor}
                           secureTextEntry={this.state._ip_Secured}
                            />
                        <TouchableHighlight onPress={this._ip_viewPass} style={[styles.formIconViewPass,this.state._ip_shp_o_btn_style]}>
                            <Image source={ require('../../assets/icon/eye-open.png') }/>
                        </TouchableHighlight>

                        <TouchableHighlight onPress={this._ip_hidePass} style={[styles.formIconClose,this.state._ip_shp_c_btn_style]}>
                            <Image  source={ require('../../assets/icon/eye-close.png') }/>
                        </TouchableHighlight>

                        </View>

                        <View style={styles.formGroup}>
                        <TouchableHighlight onPress={this._onForgetPassword}>
                            <Text style={styles.anchorRight}>Lupa Password ?</Text>
                        </TouchableHighlight>

                        </View>

                        <View  style={styles.formGroup}>
                        <TouchableHighlight style={styles.btnLogin} onPress={this._onSubmitForm}>
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
        flexDirection:'row',
        justifyContent:'center'
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

    }      
});

export default LoginPage;