import React from 'react';
import { View,StyleSheet, Text, Image, TouchableHighlight, TextInput, KeyboardAvoidingView,SafeAreaView,Dimensions ,ScrollView } from 'react-native';
import Constants from 'expo-constants';
// import LoginPage from './LoginPage';
import LinearGradient from 'react-native-linear-gradient';
class RegisterPage extends React.Component {
    goBack=()=>{
        this.props.navigation.navigate('LoginPage');
    };
    state = {
        nik:'',
        email:'',
        password:'',
        no_hp:'',
        repeat_password:'',
        foto_ktp: '',
        foto_ktp_selfi:'',

        _default_lbl_style: {},
        _nik_underlineColor : '#EFEFEF',
        _nik_placeHolderText : 'NIK',
        _nik_lbl_style : {display:'none'},

        _no_hp_underlineColor : '#EFEFEF',
        _no_hp_placeHolderText : 'Nomor HP',
        _no_hp_lbl_style : {display:'none'},

        _btLoginDisabled: true,
        _form_HasError: false,
        _form_errorMessage: 'Email atau password salah.',
        _form_err_msg_style:{ display:'none'},

        _ie_Focused: false,
        _ip_Focused: false,
        _ip_Secured: true,


        _ie_underlineColor  : '#EFEFEF',
        _ie_placeHolderText : 'Email',
        _ie_lbl_style: {display:'none'},
        _ie_clr_btn_style: {height: 0, width: 0, opacity: 0},

        _ip_underlineColor  : '#EFEFEF',
        _ip_placeHolderText : 'Kata Sandi',
        _ip_lbl_style: {display:'none'},
        _ip_shp_o_btn_style: {},
        _ip_shp_c_btn_style: {height: 0, width: 0, opacity: 0},

        _irp_underlineColor  : '#EFEFEF',
        _irp_placeHolderText : 'Ulangi Kata Sandi',
        _irp_lbl_style: {display:'none'},
        _irp_shp_o_btn_style: {},
        _irp_shp_c_btn_style: {height: 0, width: 0, opacity: 0}
        , spinner:false

    }; 
    componentDidMount() {
    // setInterval(() => {
    //   this.setState({
    //     spinner: !this.state.spinner
    //   });
    // }, 3000);
  }
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
        this._validateInput();
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
    _onInputRPasswordFocus = () => {
        this.setState({ 
             _irp_Focused: true,
             _irp_underlineColor: '#009EEE',
             _irp_placeHolderText: '',
             _irp_lbl_style: {display:'flex',color:'#009EEE',marginTop:4}
         });
 
        if(this.state._irp_Secured){  // jika password hidden
             this.setState({ 
                 _irp_shp_o_btn_style: {marginTop:30}, // show eye-open
             });
        }else{
             this.setState({ 
                 _irp_shp_c_btn_style: {marginTop:30,padding:10,width:40,height:40}, // show eye-close
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
       this._validateInput();

    };
    _onInputRPasswordBlur = () => {
        this.setState({ 
             _irp_Focused: false,
             _irp_underlineColor: '#EFEFEF',
             _irp_placeHolderText : 'Password',
             _irp_lbl_style: {display:'none'},
             
         });
        if(this.state._irp_Secured){  // jika password hidden
             this.setState({ 
                 _irp_shp_o_btn_style: {marginTop:0}, // show eye-open
             });
        }else{
             this.setState({ 
                 _irp_shp_c_btn_style: {marginTop:0,padding:10,width:40,height:40}, // show eye-close
             });
        }
        this._validateInput();
 
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
    _irp_viewPass = () => {
        console.log('please view password');
        this.setState({ 
            _irp_Secured : false,
            _irp_shp_o_btn_style: {height: 0, width: 0, opacity: 0}, // hide eye-open btn
            _irp_shp_c_btn_style: {marginTop: this.state._ip_Focused ? 30 : 0 ,padding:10,width:40,height:40}, // show eye-close
        });
    };

    _irp_hidePass = () => {
        console.log('please hide password');

        this.setState({ 
            _irp_Secured : true ,
            _irp_shp_c_btn_style: {height: 0, width: 0, opacity: 0}, // hide eye-close
            _irp_shp_o_btn_style: {marginTop: this.state._ip_Focused ? 30 : 0 } // show eye-open


        });
    };

    _validateInput = ()=>{
        if(this.state.email.length >= 4 && this.state.password.length>= 4){
            this.setState({_btLoginDisabled:false});
        }else{
            this.setState({_btLoginDisabled:true});
        }
    };
    _onSubmitForm = () => {
        // console.log('Prosess Submit Form');
        this._loginError(false);
        // show spinner
        this.setState({spinner:true});
        // 
        // X-API-KEY = 9c05c647d185d704fa3b5add357dd08777d05b99
        // X-APP-ID. = ppsl-droid
        // let config = {};
        // axios.get(`http://192.168.1.45:8080/ppsl_api/loginService`,{headers: config})
        //     .then(res => {
        // const categories = res.data;
        // console.log(categories);
        // this.setState({ categories });

        var formData = new FormData();
        formData.append('username', this.state.email);
        formData.append('password', this.state.password);

        fetch('http://192.168.1.234:8080/ppsl_api/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'X-API-KEY' : '9c05c647d185d704fa3b5add357dd08777d05b99', 
                'X-APP-ID' : 'ppsl-droid'
            },
            body: formData
        })
        .then(response => 
            response.json().then((res) => {
                if(res.data !== null){
                    // SAVE LOGIN INFO TO ASYNC STORAGE
                    console.log(res.data.msg);
                    // Redirect to home page
                }else{
                    // Disalay login error message
                    this._loginError(true);
                }

            this.setState({ spinner:false });

            })
        )
        .catch((error) => {
            console.log(error)
            this.setState({ spinner:false });
        })
        .done();
    };
    _loginError = (state) => {
        if(state){
            this.setState({_form_err_msg_style:{display:'flex'}});
        }else{
            this.setState({_form_err_msg_style:{display:'none'}});

        }
    };
    _onInputNikFocus = () => {
        this.setState({ 
            _nik_Focused: true,
            _nik_underlineColor: '#009EEE',
            _nik_placeHolderText: '',
            _nik_lbl_style: {display:'flex',color:'#009EEE',marginTop:4},
        });
    };
    _onInputNiklBlur = () => {
        this.setState({ 
            _nik_Focused: false,
            _nik_underlineColor: '#EFEFEF',
            _nik_placeHolderText : 'NIK',
            _nik_lbl_style: {display:'none'},
        });
        this._validateInput();
    }; 
    _onInputNoHpFocus = () => {
        this.setState({ 
            _no_hp_Focused: true,
            _no_hp_underlineColor: '#009EEE',
            _no_hp_placeHolderText: '',
            _no_hp_lbl_style: {display:'flex',color:'#009EEE',marginTop:4},
        });
    };
    _onInputNoHplBlur = () => {
        this.setState({ 
            _no_hp_Focused: false,
            _no_hp_underlineColor: '#EFEFEF',
            _no_hp_placeHolderText : 'Nomor HP',
            _no_hp_lbl_style: {display:'none'},
        });
        this._validateInput();
    };  
	render(){
			return (
				<View style={styles.wrapper}>
					<View style={styles.header}>
                        <View style={{paddingHorizontal:10,paddingVertical:20}}>
                        <Image onPress={()=>{this.goBack()}} style={styles.logo} source={ require('../../assets/icon/chevron-left.png') }/>
                        </View>
						<View style={{flex:1,textAlign:'left',paddingLeft:120,paddingVertical:20}}>
                            <Text style={{color:'#ffffff',fontSize:14}}>Registrasi</Text>
                        </View>
					</View>
                    <SafeAreaView style={styles.content}>
                    <ScrollView style={{padding:20}}>
					
                        <Text style={{fontWeight:'bold',fontSize:16}}>Registrasi PPSL PERUMDAM TKR</Text>
                        <Text style={{marginVertical:10}}>Silahkan isi data dengan benar</Text>
                        <View style={styles.form}>
                            <View style={styles.formGroup}>
                                <Text style={[styles.defaultText,{paddingTop:5,paddingLeft:5},this.state._nik_lbl_style]}>NIK</Text>
                                <TextInput style={styles.textInput}
                                value={this.state.nik}
                                onChangeText={( nik ) => this.setState({ nik })}
                                onKeyPress={this._validateInput}
                                placeholder={this.state._nik_placeHolderText}
                                onFocus={this._onInputNikFocus}
                                onBlur={this._onInputNiklBlur}
                                placeholderTextColor="#8F8EA0"
                                autoCapitalize = 'none'
                                underlineColorAndroid={this.state._nik_underlineColor}
                                    />
                            </View>
                            <View style={styles.formGroup}>
                                <Text style={[styles.defaultText,{paddingTop:5,paddingLeft:5},this.state._no_hp_lbl_style]}>Nomor HP</Text>
                                <TextInput style={styles.textInput}
                                value={this.state.no_hp}
                                onChangeText={( no_hp ) => this.setState({ no_hp })}
                                onKeyPress={this._validateInput}
                                placeholder={this.state._no_hp_placeHolderText}
                                onFocus={this._onInputNoHpFocus}
                                onBlur={this._onInputNoHplBlur}
                                placeholderTextColor="#8F8EA0"
                                autoCapitalize = 'none'
                                underlineColorAndroid={this.state._no_hp_underlineColor}
                                    />
                            </View>
                            <View style={styles.formGroup}>
                            <Text style={[styles.defaultText,{paddingTop:5,paddingLeft:5},this.state._ie_lbl_style]}>Email</Text>

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
                            <Text style={[styles.defaultText,{paddingTop:5,paddingLeft:5},this.state._ip_lbl_style]}>Kata Sandi</Text>

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
                            <Text style={[styles.defaultText,{paddingTop:5,paddingLeft:5},this.state._irp_lbl_style]}>Ulangi Kata Sandi</Text>

                            <TextInput style={styles.textInput}
                            value={this.state.repeat_password}
                            onChangeText={( repeat_password ) => this.setState({ repeat_password })}
                            onFocus={this._onInputRPasswordFocus}
                            onBlur={this._onInputRPasswordBlur}
                            onKeyPress={this._validateInput}
                            placeholder={this.state._irp_placeHolderText}
                            placeholderTextColor="#8F8EA0"
                            underlineColorAndroid={this.state._irp_underlineColor}
                            secureTextEntry={this.state._irp_Secured}
                                />
                            <TouchableHighlight onPress={this._irp_viewPass} style={[styles.formIconViewPass,this.state._irp_shp_o_btn_style]}>
                                <Image source={ require('../../assets/icon/eye-close.png') }/>
                            </TouchableHighlight>

                            <TouchableHighlight onPress={this._irp_hidePass} style={[styles.formIconClose,this.state._irp_shp_c_btn_style]}>
                                <Image  source={ require('../../assets/icon/eye-open.png') }/>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={[styles.defaultText,{paddingTop:5,paddingLeft:5},this.state._default_lbl_style]}>Foto KTP</Text>
                            <View style={styles.photoUploadWrp}>

                            </View>
                        </View>
                        </View>
                    </ScrollView>
                    </SafeAreaView>
                   
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
    header:{
        // flex:1,
        flexDirection:'row',
        backgroundColor:'#00A4F6',
        // color:'#FFF'
    },
    content:{
        flex:2,
        backgroundColor:'white',
        borderTopLeftRadius:25,
        borderTopRightRadius: 25,
        padding:20
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
        padding:20,
        paddingBottom:0
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
        // paddingVertical:8,
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

export default RegisterPage;