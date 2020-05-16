import React from 'react';
import { View,StyleSheet, Text, Image, TouchableHighlight, TextInput, KeyboardAvoidingView ,SafeAreaView, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import Spinner from 'react-native-loading-spinner-overlay';

class ChangePasswdPage extends React.Component {
    goBack=()=>{
        this.props.navigation.navigate('ProfilePage');
    };
    state = {
        spinner:false,
        old_passwd: '',
        new_passwd:'',
        repeat_new_passwd:'',

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
        _irp_shp_c_btn_style: {height: 0, width: 0, opacity: 0}
    };
    _inp_viewPass = () => {
        console.log('please view password');
        this.setState({ 
            _inp_Secured : false,
            _inp_shp_o_btn_style: {height: 0, width: 0, opacity: 0}, // hide eye-open btn
            _inp_shp_c_btn_style: {marginTop: this.state._ip_Focused ? 30 : 0 ,padding:10,width:40,height:40}, // show eye-close
        });
    };

    _inp_hidePass = () => {
        console.log('please hide password');

        this.setState({ 
            _inp_Secured : true ,
            _inp_shp_c_btn_style: {height: 0, width: 0, opacity: 0}, // hide eye-close
            _inp_shp_o_btn_style: {marginTop: this.state._ip_Focused ? 30 : 0 } // show eye-open


        });
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
    };
    render(){
        return (
            <KeyboardAvoidingView style={styles.wrapper} behavior={Platform.OS === "ios" ? "padding" : null}>
                
                <Spinner visible={this.state.spinner} textContent={'Loading...'} textStyle={styles.spinnerTextStyle} />
                    <View style={styles.header}>
                        <View style={{paddingHorizontal:10,paddingVertical:20}}>
                        <TouchableHighlight onPress={()=>{this.goBack()}} >
                        <Image style={{width:22}} source={ require('../../assets/icon/icon-chevron-left-white.png') }/>
                            
                        </TouchableHighlight>
                        </View>
                        <View style={{flex:1,alignItems:'center',paddingVertical:20}}>
                            <Text style={{color:'#ffffff',fontSize:14,marginLeft:-22}}>Ubah Kata Sandi</Text>
                        </View>
                    </View>
                    <SafeAreaView style={styles.content}>
                    <ScrollView style={{paddingVertical:10}}>
                    
                        <Text style={{fontWeight:'bold',fontSize:16,marginVertical:5}}>Masukkan kata sandi lama Anda terlebih dahulu kemudian kata sandi baru.</Text>
                        <View style={styles.form}>
                        <View style={styles.formGroup}>
                            <Text style={[styles.defaultText,{paddingTop:5,paddingLeft:5},this.state._ip_lbl_style]}>Kata Sandi Lama</Text>

                            <TextInput style={styles.textInput}
                            value={this.state.old_passwd}
                            onChangeText={( old_password ) => this.setState({ old_passwd })}
                            onFocus={this._onInputOldPasswordFocus}
                            onBlur={this._onInputOldPasswordBlur}
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
                            <TouchableHighlight onPress={this._inp_viewPass} style={[styles.formIconViewPass,this.state._inp_shp_o_btn_style]}>
                                <Image source={ require('../../assets/icon/eye-close.png') }/>
                            </TouchableHighlight>

                            <TouchableHighlight onPress={this._inp_hidePass} style={[styles.formIconClose,this.state._inp_shp_c_btn_style]}>
                                <Image  source={ require('../../assets/icon/eye-open.png') }/>
                            </TouchableHighlight>
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
                            <TouchableHighlight onPress={this._irp_viewPass} style={[styles.formIconViewPass,this.state._irp_shp_o_btn_style]}>
                                <Image source={ require('../../assets/icon/eye-close.png') }/>
                            </TouchableHighlight>

                            <TouchableHighlight onPress={this._irp_hidePass} style={[styles.formIconClose,this.state._irp_shp_c_btn_style]}>
                                <Image  source={ require('../../assets/icon/eye-open.png') }/>
                            </TouchableHighlight>
                        </View>
                        <TouchableHighlight style={[{margin:20},styles.btnSimpan]} onPress={()=>{this.simpan()}} >
                            <View>
                                <Text style={{color:'#fff',fontSize:14,fontWeight:'bold'}}>Simpan</Text>
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