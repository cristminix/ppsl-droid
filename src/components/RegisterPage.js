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
        email:'',
        password:'',
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
        _ip_placeHolderText : 'Password',
        _ip_lbl_style: {display:'none'},
        _ip_shp_o_btn_style: {},
        _ip_shp_c_btn_style: {height: 0, width: 0, opacity: 0}



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

        fetch('http://192.168.1.234:8080/ppsl_api/loginService', {
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
					<View style={styles.content}>
                        <Text style={{fontWeight:'bold',fontSize:16}}>Registrasi PPSL PERUMDAM TKR</Text>
                        <Text style={{marginVertical:10}}>Silahkan isi data dengan benar</Text>

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
                    </View>
                    {/* <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
  <Text style={styles.buttonText}>
    Sign in with Facebook
  </Text>
</LinearGradient> */}
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
    }
});

export default RegisterPage;