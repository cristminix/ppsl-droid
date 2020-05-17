import React from 'react';
import {  AsyncStorage } from 'react-native';
import Config from '../../app/Config';

class LoginAction extends React.Component{
	state = {
        account:null,
        email:'',
        password:'',
        _btLoginDisabled: false,
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
        _ip_shp_c_btn_style: {height: 0, width: 0, opacity: 0},

        loadingText:'Login...',

        spinner:false

    }; 
    _updateFormView = () => {
        let ok = 0;
        if(this.state.email != '' ){
            this.setState({ _ie_lbl_style: {display:'flex',color:'#8F8EA0'} });
            ok += 1;
        }
        if(this.state.password != '' ){
            this.setState({ _ip_lbl_style: {display:'flex',color:'#8F8EA0'} });
            if(this.state._ip_Secured){  // jika password hidden
                this.setState({ 
                    _ip_shp_o_btn_style: {marginTop:30}, // show eye-c
                    
                });
           }else{
                this.setState({ 
                    _ip_shp_c_btn_style: {marginTop:30,padding:10,width:40,height:40}, // show eye-o
                });
                

           }
            ok += 1;
        }
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
        this._updateFormView();
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
                _ip_shp_o_btn_style: {marginTop:30}, // show eye-c
            });
       }else{
            this.setState({ 
                _ip_shp_c_btn_style: {marginTop:30,padding:10,width:40,height:40}, // show eye-o
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
                _ip_shp_o_btn_style: {marginTop:0}, // show eye-c
            });
       }else{
            this.setState({ 
                _ip_shp_c_btn_style: {marginTop:0,padding:10,width:40,height:40}, // show eye-o
                
            });
            
       }
       setTimeout(() => {
            this._updateFormView();
       },10);
       this._validateInput();
       

    };

    _ie_clear = () => {
        this.setState({ email: '' });
    };

    _ip_viewPass = () => {
        console.log('please view password');
        this.setState({ 
            _ip_Secured : false,
            _ip_shp_o_btn_style: {height: 0, width: 0, opacity: 0}, // hide eye-c btn
            _ip_shp_c_btn_style: {marginTop: this.state._ip_Focused ? 30 : (this.state.password != '' ? 30 : 0) ,padding:10,width:40,height:40}, // show eye-o
        });
        
    };

    _ip_hidePass = () => {
        console.log('please hide password');

        this.setState({ 
            _ip_Secured : true ,
            _ip_shp_c_btn_style: {height: 0, width: 0, opacity: 0}, // hide eye-o
            _ip_shp_o_btn_style: {marginTop: this.state._ip_Focused ? 30 : (this.state.password != '' ? 30 : 0) } // show eye-c


        });
       
    };
    

    _onForgetPassword = () => {
        this.props.navigation.navigate('ForgetPage',{sourcePage:'LoginPage'});
    };

    _onRegister = () => {
        this.props.navigation.navigate('RegisterPage',{sourcePage:'LoginPage'});
    };

    _onHelp = () => {
        this.props.navigation.navigate('HelpPage',{sourcePage:'LoginPage'});
    };

    _validateInput = ()=>{
        if(this.state.email.length >= 0 && this.state.password.length>= 0){
            this.setState({_btLoginDisabled:false});
        }else{
            this.setState({_btLoginDisabled:true});
        }
    };
    _onSubmitForm = () => {
        this._loginError(false);
        this.setState({spinner:true});
        var formData = new FormData();
        formData.append('username', this.state.email);
        formData.append('password', this.state.password);

        fetch(`${Config.api_endpoint}/loginService`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'X-API-KEY' : Config.api_key, 
                'X-APP-ID' : Config.api_appid
            },
            body: formData
        })
        .then((response) => 
            response.json().then((res) => {
                if(res.data !== null){
                    // SAVE LOGIN INFO TO ASYNC STORAGE
                    console.log(res);
                    AsyncStorage.setItem('account', JSON.stringify(res.data));
                    this.setState({account:res.data});
                    // if(this.state.account != null){
                    //     // 
                        setTimeout(()=>{
                            if(this.state.account != null){
                                this.props.navigation.navigate('EntryPoint')
                            }
                        },100);


                    // }
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
}

export default LoginAction;