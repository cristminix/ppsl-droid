import React from 'react';
import {  AsyncStorage } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
// import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay';
import Config from '../../app/Config';
import Store from '../../app/Store';
import Session from '../../app/Session';
import Constants from 'expo-constants';
class RegisterAction extends React.Component{
goBack=()=>{
        this.props.navigation.navigate('LoginPage');
    };
    state = {
        _btRegisterDisabled:true,
        registerSuccess : false,
        // nama_lengkap:'',
        // nik:'',
        // email:'',
        // passwd:'',
        // nomor_hp:'',
        // repeat_password:'',
        // foto_ktp: '',
        // foto_ktp_selfi:'',
        nama_lengkap: '',
        nik :'',
        email :'',
        passwd:'',
        nomor_hp :'',
        repeat_passwd:'',
        
        foto_ktp: null,
        foto_ktp_selfi: null,

        _default_lbl_style: {},
        _gry_lbl_style: {color:'#8F8EA0'},
        _nik_underlineColor : '#EFEFEF',
        _nik_placeHolderText : 'NIK',
        _nik_lbl_style : {display:'none'},

        _no_hp_underlineColor : '#EFEFEF',
        _no_hp_placeHolderText : 'Nomor HP',
        _no_hp_lbl_style : {display:'none'},

        _btLoginDisabled: true,
        _form_HasError: false,
        _form_errorMessage: 'form not complete',
        _form_err_msg_style:{ height: 0, width: 0, opacity: 0},

        _ie_Focused: false,
        _ip_Focused: false,
        _ip_Secured: true,
        _irp_Focused: false,
        _irp_Secured: true,


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
        _irp_shp_c_btn_style: {height: 0, width: 0, opacity: 0},

        _in_underlineColor  : '#EFEFEF',
        _in_placeHolderText : 'Nama Lengkap',
        _in_lbl_style: {display:'none'},
        _in_clr_btn_style: {height: 0, width: 0, opacity: 0},

        spinner:false
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
        
 
     };
    _onInputNamaLengkapFocus = () => {
        this.setState({ 
            _in_Focused: true,
            _in_underlineColor: '#009EEE',
            _in_placeHolderText: '',
            _in_lbl_style: {display:'flex',color:'#009EEE',marginTop:4},
            _in_clr_btn_style: {marginTop:30}

        });
    };
    _onInputNamaLengkapBlur = () => {
        this.setState({ 
            _in_Focused: false,
            _in_underlineColor: '#EFEFEF',
            _in_placeHolderText : 'Nama Lengkap',
            _in_lbl_style: {display:'none'},
            _in_clr_btn_style: {height: 0, width: 0, opacity: 0}
        });
        
    };
    _ie_clear = () => {
        this.setState({ email: '' });
    };

    _ip_viewPass = () => {
        this.setState({ 
            _ip_Secured : false,
            _ip_shp_o_btn_style: {height: 0, width: 0, opacity: 0}, // hide eye-open btn
            _ip_shp_c_btn_style: {marginTop: this.state._ip_Focused ? 30 : 0 ,padding:10,width:40,height:40}, // show eye-close
        });
    };

    _ip_hidePass = () => {
        this.setState({ 
            _ip_Secured : true ,
            _ip_shp_c_btn_style: {height: 0, width: 0, opacity: 0}, // hide eye-close
            _ip_shp_o_btn_style: {marginTop: this.state._ip_Focused ? 30 : 0 } // show eye-open


        });
    };
    _irp_viewPass = () => {
        this.setState({ 
            _irp_Secured : false,
            _irp_shp_o_btn_style: {height: 0, width: 0, opacity: 0}, // hide eye-open btn
            _irp_shp_c_btn_style: {marginTop: this.state._ip_Focused ? 30 : 0 ,padding:10,width:40,height:40}, // show eye-close
        });
    };

    _irp_hidePass = () => {
        this.setState({ 
            _irp_Secured : true ,
            _irp_shp_c_btn_style: {height: 0, width: 0, opacity: 0}, // hide eye-close
            _irp_shp_o_btn_style: {marginTop: this.state._ip_Focused ? 30 : 0 } // show eye-open
        });
    };

    
    
    _onSubmitForm = () => {
        this._registerError(false);
        this.setState({spinner:true});
        
        Store.RegisterService.doRegister(this.state.nama_lengkap, this.state.nik, this.state.nomor_hp, 
        	this.state.email, this.state.passwd, this.state.repeat_passwd, this.state.foto_ktp, this.state.foto_ktp_selfi, (res) => {
        	console.log(res);
        	if(res.success == true){
        		this._registerError(false);

        		this.setState({
		    		formErrorMsgStyle:{display:'none'},
		    		_form_errorMessage: '',
		    		registerSuccess: true
		    	});
        	}else{
        		this._registerError(true);
        		this.setState({
		    		formErrorMsgStyle:{display:'flex'},
		    		_form_errorMessage: res.msg
		    	});
        	}
        	this.setState({spinner:false});
        },(error) => {
        	this.setState({spinner:false});
        });

    };
    
    _registerError = (stt, msg) => {

        let _state = {_form_err_msg_style:{height: 'auto', width: 'auto',flex:1, opacity: 1}};
        if(!stt){
            _state = {_form_err_msg_style:{height: 0, width: 0, opacity: 0}};
        } 
        
        this.setState(_state);
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
        
    };  

	componentDidMount() {
    	this.getPermissionAsync();
	}

	getPermissionAsync = async () => {
		if (Constants.platform.ios) {
	  		const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
	  		if (status !== 'granted') {
	    		alert('Sorry, we need camera roll permissions to make this work!');
	  		}
		}
	};

	_pickImageKtp = async () => {
		try {
	  		let result = await ImagePicker.launchImageLibraryAsync({
		    	mediaTypes: ImagePicker.MediaTypeOptions.All,
		    	allowsEditing: true,
		    	aspect: [4, 3],
		    	quality: 1,
		  	});
		  	if (!result.cancelled) {
		    	this.setState({ 
		    		image_ktp: result.uri, 
		    		foto_ktp: result.uri 
		    	});
		  	}
	  		console.log(result);
		} catch (E) {
	  		console.log(E);
		}
	};

	_pickImageKtpSelfie = async () => {
		try {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.cancelled) {
			this.setState({ 
				image_ktp_selfie: result.uri, 
				foto_ktp_selfi: result.uri 
			});
		}
			console.log(result);
		} catch (E) {
			console.log(E);
		}
	};

    _updateFormView = () => {
        let ok = 0;
        if(this.state.nama_lengkap != '' ){
            this.setState({ _in_lbl_style: {display:'flex',color:'#8F8EA0'} });
            ok += 1;
        }
        if(this.state.nik != '' ){
            this.setState({ _nik_lbl_style: {display:'flex',color:'#8F8EA0'} });
            ok += 1;
        }
        if(this.state.nomor_hp != '' ){
            this.setState({ _no_hp_lbl_style: {display:'flex',color:'#8F8EA0'} });
            ok += 1;

        }

        if(this.state.email != '' ){
            this.setState({ _ie_lbl_style: {display:'flex',color:'#8F8EA0'} });
            ok += 1;

        }
        if(this.state.passwd != '' ){
            this.setState({ _ip_lbl_style: {display:'flex',color:'#8F8EA0'} });
            ok += 1;

        }
        if(this.state.repeat_passwd != '' ){
            this.setState({ _irp_lbl_style: {display:'flex',color:'#8F8EA0'} });
            ok += 1;

        }
        if(ok >= 5){
            this.setState({ _btRegisterDisabled: false });
        }
        this.setState({
    		formErrorMsgStyle:{display:'none'}
    	});
    };

    onRefresh = () => {
    	this.setState({
    		formErrorMsgStyle:{display:'none'},
    		registerSuccess: false
    	});
    }
}

export default RegisterAction;