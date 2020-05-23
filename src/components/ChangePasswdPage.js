import React from 'react';
import { View,StyleSheet, Text, Image, TouchableHighlight, TextInput, KeyboardAvoidingView ,SafeAreaView, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import Spinner from 'react-native-loading-spinner-overlay';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationEvents } from '@react-navigation/compat';
import Config from '../app/Config';
import Store from '../app/Store';
import Session from '../app/Session';

class ChangePasswdPage extends React.Component {
    goto=(nav)=>{
        this.props.navigation.navigate(nav,{sourcePage:'ChangePasswdPage'});
    };
    goBack=()=>{
        this.props.navigation.navigate('ProfilePage');
    };
    state = {
        spinner:false,
        old_passwd: '',
        new_passwd:'',
        repeat_new_passwd:'',
        user_id:'',

        _ip_Focused: false,
        _ip_Secured: true,
        _inp_Focused: false,
        _inp_Secured: true,
        _irp_Focused: false,
        _irp_Secured: true,

        _ip_underlineColor  : '#EFEFEF',
        _ip_placeHolderText : 'Kata Sandi Lama',
        _ip_lbl_style: {display:'none'},
        _ip_shp_o_btn_style: {},
        _ip_shp_c_btn_style: {height: 0, width: 0, opacity: 0},

        _inp_underlineColor  : '#EFEFEF',
        _inp_placeHolderText : 'Kata Sandi Baru',
        _inp_lbl_style: {display:'none'},
        _inp_shp_o_btn_style: {},
        _inp_shp_c_btn_style: {height: 0, width: 0, opacity: 0},

        _irp_underlineColor  : '#EFEFEF',
        _irp_placeHolderText : 'Ulangi Kata Sandi Baru',
        _irp_lbl_style: {display:'none'},
        _irp_shp_o_btn_style: {},
        _irp_shp_c_btn_style: {height: 0, width: 0, opacity: 0},

        formErrorMsg:'',
        fomsErrorShown: false,
        formErrorMsgStyle: {display:'none'},
        changePasswordSucces: false
    };
    _inp_viewPass = () => {
        console.log('please view password');
        this.setState({ 
            _inp_Secured : false,
            _inp_shp_o_btn_style: {height: 0, width: 0, opacity: 0}, // hide eye-open btn
            _inp_shp_c_btn_style: {marginTop: this.state._ip_Focused ? 30 : (this.state.new_password != '' ? 30 : 0) ,padding:10,width:40,height:40}, // show eye-close
        });
    };

    _inp_hidePass = () => {
        console.log('please hide password');

        this.setState({ 
            _inp_Secured : true ,
            _inp_shp_c_btn_style: {height: 0, width: 0, opacity: 0}, // hide eye-close
            _inp_shp_o_btn_style: {marginTop: this.state._ip_Focused ? 30 : (this.state.new_password != '' ? 30 : 0)  } // show eye-open


        });
    };
    _ip_viewPass = () => {
        console.log('please view password');
        this.setState({ 
            _ip_Secured : false,
            _ip_shp_o_btn_style: {height: 0, width: 0, opacity: 0}, // hide eye-open btn
            _ip_shp_c_btn_style: {marginTop: this.state._ip_Focused ? 30 : (this.state.old_password != '' ? 30 : 0)  ,padding:10,width:40,height:40}, // show eye-close
        });
    };

    _ip_hidePass = () => {
        console.log('please hide password');

        this.setState({ 
            _ip_Secured : true ,
            _ip_shp_c_btn_style: {height: 0, width: 0, opacity: 0}, // hide eye-close
            _ip_shp_o_btn_style: {marginTop: this.state._ip_Focused ? 30 : (this.state.old_password != '' ? 30 : 0)  } // show eye-open


        });
    };
    _irp_viewPass = () => {
        console.log('please view password');
        this.setState({ 
            _irp_Secured : false,
            _irp_shp_o_btn_style: {height: 0, width: 0, opacity: 0}, // hide eye-open btn
            _irp_shp_c_btn_style: {marginTop: this.state._ip_Focused ? 30 : (this.state.repeat_new_passwd != '' ? 30 : 0)  ,padding:10,width:40,height:40}, // show eye-close
        });
    };

    _irp_hidePass = () => {
        console.log('please hide password');

        this.setState({ 
            _irp_Secured : true ,
            _irp_shp_c_btn_style: {height: 0, width: 0, opacity: 0}, // hide eye-close
            _irp_shp_o_btn_style: {marginTop: this.state._ip_Focused ? 30 : (this.state.repeat_new_passwd != '' ? 30 : 0)  } // show eye-open


        });
    };
    _onInputOldPasswordFocus = () => {
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
    _onInputNewPasswordFocus = () => {
        this.setState({ 
             _inp_Focused: true,
             _inp_underlineColor: '#009EEE',
             _inp_placeHolderText: '',
             _inp_lbl_style: {display:'flex',color:'#009EEE',marginTop:4}
         });
 
        if(this.state._ip_Secured){  // jika password hidden
             this.setState({ 
                 _inp_shp_o_btn_style: {marginTop:30}, // show eye-open
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
      _onInputOldPasswordBlur = () => {
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
     _onInputNewPasswordBlur = () => {
        this.setState({ 
             _inp_Focused: false,
             _inp_underlineColor: '#EFEFEF',
             _inp_placeHolderText : 'Password',
             _inp_lbl_style: {display:'none'},
             
         });
        if(this.state._inp_Secured){  // jika password hidden
             this.setState({ 
                 _inp_shp_o_btn_style: {marginTop:0}, // show eye-open
             });
        }else{
             this.setState({ 
                 _inp_shp_c_btn_style: {marginTop:0,padding:10,width:40,height:40}, // show eye-close
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
    _validateInput = ()=>{
        // if(this.state.old_passwd.length >= 4 && this.state.password.length>= 4){
        //     this.setState({_btLoginDisabled:false});
        // }else{
        //     this.setState({_btLoginDisabled:true});
        // }
        setTimeout(()=>{
            this._updateFormView();
        },100);
    };
    _updateFormView = () => {
        let ok = 0;
        if(this.state.old_passwd != '' ){
            this.setState({
                _ip_lbl_style: {display:'flex',color:'#8F8EA0',marginTop:4}
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
            ok += 1;
        }
        if(this.state.new_passwd != '' ){
            this.setState({
                _inp_lbl_style: {display:'flex',color:'#8F8EA0',marginTop:4}
            });
            if(this.state._inp_Secured){  // jika password hidden
                this.setState({ 
                    _inp_shp_o_btn_style: {marginTop:30}, // show eye-c
                    
                });
            }else{
                this.setState({ 
                    _inp_shp_c_btn_style: {marginTop:30,padding:10,width:40,height:40}, // show eye-o
                });
            } 
            ok += 1;
        }
        if(this.state.repeat_new_passwd != '' ){
            this.setState({
                _irp_lbl_style: {display:'flex',color:'#8F8EA0',marginTop:4}
            }); 
            if(this.state._irp_Secured){  // jika password hidden
                this.setState({ 
                    _irp_shp_o_btn_style: {marginTop:30}, // show eye-c
                    
                });
           }else{
                this.setState({ 
                    _irp_shp_c_btn_style: {marginTop:30,padding:10,width:40,height:40}, // show eye-o
                });
            }
            ok += 1;
        }
        this.setState({  
            _form_err_msg_style:{ display:'none'}
        });
    }
    onRefresh = () => {
        if(Config.enable_dummy){  
            this.setState(Config.dummy.ChangePasswdPage);
        }
        this.setState({
            changePasswordSucces : false,
            fomsErrorShown:false,
            formErrorMsgStyle:{display:'none'},
            formErrorMsg:''
        });
        Session.getAccount((account)=>{
            this.setState({'user_id':account.user_id});
            setTimeout(()=>{
                this._updateFormView();
            },100);
        })
        
    };
    formSubmit = ()=>{
        this.setState({spinner:true});
        Store.LoginService.changePassword(this.state.user_id,this.state.old_passwd, this.state.new_passwd, this.state.repeat_new_passwd,(res)=>{
            console.log(res);
            if(res.data.success){
                this.setState({
                    changePasswordSucces : true
                    
                });
            }else{
                this.setState({
                    changePasswordSucces : false,
                    formErrorMsg: res.msg,
                    fomsErrorShown:true,
                    formErrorMsgStyle:{display:'flex'},

                    
                });
            };
            this.setState({spinner:false});

        },(error)=>{
            console.log(error);
            this.setState({spinner:false});

        });
    }
    render(){
        let icons = {
            back :  require('../../assets/icon/chevron-left.png') 
        };
        return (
            <KeyboardAvoidingView style={styles.wrapper} behavior={Platform.OS === "ios" ? "padding" : null}>
                
                <Spinner visible={this.state.spinner} textContent={''} textStyle={styles.spinnerTextStyle} />
                <NavigationEvents onWillFocus={payload => this.onRefresh()} />
                <View>
                <LinearGradient colors={['#009EEE', '#00A4F6']} start={[0.0, 0.101]} style={[{paddingVertical:20},styles.headerGradient]}>

                    <View style={{paddingHorizontal:10,paddingVertical:0}}>
                    <TouchableHighlight underlayColor='transparent' onPress={()=>{this.goBack()}} >
                        <Image style={{width:22}} source={icons.back}/>
                    </TouchableHighlight>
                    </View>
                    <View style={{flex:1,alignItems:'center',paddingVertical:0}}>
                        <Text style={{color:'#ffffff',fontSize:14,marginLeft:-22,marginTop:-20}}>Lupa Sandi</Text>
                    </View>
                    </LinearGradient>
                </View>
                    <SafeAreaView style={styles.content}>
                    <ScrollView style={{paddingVertical:10}}>
                    <View style={{display: this.state.changePasswordSucces?'flex':'none'}}>
                        <Text style={{fontWeight:'bold',fontSize:16,marginVertical:5}}>Kata sandi Anda telah dirubah.</Text>
                    </View>    
                    <View style={{display: !this.state.changePasswordSucces?'flex':'none'}}>
                        <Text style={{fontWeight:'bold',fontSize:16,marginVertical:5}}>Masukkan kata sandi lama Anda terlebih dahulu kemudian kata sandi baru.</Text>
                        <View style={styles.form}>
                        <View style={styles.formGroup}>
                            <Text style={[styles.defaultText,{paddingTop:5,paddingLeft:5},this.state._ip_lbl_style]}>Kata Sandi Lama</Text>

                            <TextInput style={styles.textInput}
                            value={this.state.old_passwd}
                            onChangeText={( old_passwd ) => this.setState({ old_passwd })}
                            onFocus={this._onInputOldPasswordFocus}
                            onBlur={this._onInputOldPasswordBlur}
                            onKeyPress={this._validateInput}
                            placeholder={this.state._ip_placeHolderText}
                            placeholderTextColor="#8F8EA0"
                            underlineColorAndroid={this.state._ip_underlineColor}
                            secureTextEntry={this.state._ip_Secured}
                                />
                            <TouchableHighlight underlayColor='transparent' onPress={this._ip_viewPass} style={[styles.formIconViewPass,this.state._ip_shp_o_btn_style]}>
                                <Image source={ require('../../assets/icon/eye-close.png') }/>
                            </TouchableHighlight>

                            <TouchableHighlight underlayColor='transparent' onPress={this._ip_hidePass} style={[styles.formIconClose,this.state._ip_shp_c_btn_style]}>
                                <Image  source={ require('../../assets/icon/eye-open.png') }/>
                            </TouchableHighlight>

                            <View style={{flexDirection:'row-reverse',paddingVertical:10,paddingHorizontal:5}}>
                                <Text style={[styles.anchor]} onPress={() => {this.goto('ForgetPage')}}>Lupa Password ?</Text>
                            </View>
                        </View>
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={[styles.defaultText,{paddingTop:5,paddingLeft:5},this.state._inp_lbl_style]}>Kata Sandi Baru</Text>

                            <TextInput style={styles.textInput}
                            value={this.state.new_passwd}
                            onChangeText={( new_passwd ) => this.setState({ new_passwd })}
                            onFocus={this._onInputNewPasswordFocus}
                            onBlur={this._onInputNewPasswordBlur}
                            onKeyPress={this._validateInput}
                            placeholder={this.state._inp_placeHolderText}
                            placeholderTextColor="#8F8EA0"
                            underlineColorAndroid={this.state._inp_underlineColor}
                            secureTextEntry={this.state._inp_Secured}
                                />
                            <TouchableHighlight underlayColor='transparent' onPress={this._inp_viewPass} style={[styles.formIconViewPass,this.state._inp_shp_o_btn_style]}>
                                <Image source={ require('../../assets/icon/eye-close.png') }/>
                            </TouchableHighlight>

                            <TouchableHighlight underlayColor='transparent' onPress={this._inp_hidePass} style={[styles.formIconClose,this.state._inp_shp_c_btn_style]}>
                                <Image  source={ require('../../assets/icon/eye-open.png') }/>
                            </TouchableHighlight>
                            <View style={{padding:5}}>
                                <Text style={{lineHeight:16,fontSize:14,color:'#c4c4c4'}}>* Password minimal 6 karakter dan terdapat minimal 1 huruf dan angka.</Text>
                            </View>
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={[styles.defaultText,{paddingTop:5,paddingLeft:5},this.state._irp_lbl_style]}>Ulangi Kata Sandi</Text>

                            <TextInput style={styles.textInput}
                            value={this.state.repeat_new_passwd}
                            onChangeText={( repeat_new_passwd) => this.setState({ repeat_new_passwd })}
                            onFocus={this._onInputRPasswordFocus}
                            onBlur={this._onInputRPasswordBlur}
                            onKeyPress={this._validateInput}
                            placeholder={this.state._irp_placeHolderText}
                            placeholderTextColor="#8F8EA0"
                            underlineColorAndroid={this.state._irp_underlineColor}
                            secureTextEntry={this.state._irp_Secured}
                                />
                            <TouchableHighlight underlayColor='transparent' onPress={this._irp_viewPass} style={[styles.formIconViewPass,this.state._irp_shp_o_btn_style]}>
                                <Image source={ require('../../assets/icon/eye-close.png') }/>
                            </TouchableHighlight>

                            <TouchableHighlight underlayColor='transparent' onPress={this._irp_hidePass} style={[styles.formIconClose,this.state._irp_shp_c_btn_style]}>
                                <Image  source={ require('../../assets/icon/eye-open.png') }/>
                            </TouchableHighlight>
                        </View>
                       <View style={[styles.errorMessage,this.state.formErrorMsgStyle]}>
                            <Text style={{color:'#fff',marginBottom:-10}}>{this.state.formErrorMsg}</Text>
                       </View>
                        </View>
                    <View style={[{flex:1,flexDirection:'column-reverse',paddingHorizontal:5,paddingVertical:10,marginBottom:10},{display:this.state.changePasswordSucces?'none':'flex'}]}>
                        <TouchableHighlight underlayColor='transparent' onPress={()=>{ this.formSubmit() }} >
                            <View>
                                <LinearGradient colors={['#009EEE', '#00A4F6']} start={[0.0, 0.101]} 
                                    style={{flex:1,alignItems:'center',padding:12,borderRadius:50}}>
                                    <Text style={[{marginTop:0},styles.btnActionText]}>Ubah Kata Sandi</Text>

                                </LinearGradient>    
                            </View>
                        </TouchableHighlight>
                    </View>    
                    </ScrollView>
                    
                    </SafeAreaView>

                    </KeyboardAvoidingView>    
        );
    }
}
const styles = StyleSheet.create({
    btnAction:{
        backgroundColor:'#CACACC',
        borderRadius:50,
        padding:12,
        marginTop:10
    },
    btnActionText:{
        color:'#fff',
        fontSize:14,
        fontWeight:'bold'
    },
    btnSimpan:{
        backgroundColor:'#009EEE',
        borderRadius:50,
        padding:12,
        marginTop:10,
        alignItems:'center'
    },
    imagePreview:{
        width:100,
        height:100,
        marginBottom:5
    },
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
    photoUploadWrp:{
        backgroundColor:'white',
        borderRadius:5,
        borderColor:'#EFEFEF',
        borderWidth:1,
        padding:20,
        marginTop:20,
        marginBottom:10,
        justifyContent:'center',
        alignItems:'center',
        flex:1
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
    btnRegister:{
        backgroundColor:'#CACACC',
        borderRadius:50,
        padding:12,
        marginTop:10,
        marginBottom:40
    },
    btnRegisterText:{
        color:'#fff',
        fontSize:14,
        fontWeight:'bold',
        textAlign:'center'
    },
    btnUpload:{
        borderColor:'#009EEE',
        borderWidth:1,
        borderRadius:5,
        padding:12,
        marginTop:10

    },
    btnUploadText:{
        color:'#009EEE',
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

export default ChangePasswdPage;