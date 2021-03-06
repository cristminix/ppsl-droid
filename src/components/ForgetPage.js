import React from 'react';
import { View,StyleSheet, Text, Image, TouchableHighlight, TextInput, KeyboardAvoidingView ,SafeAreaView, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import Spinner from 'react-native-loading-spinner-overlay';
import { LinearGradient } from 'expo-linear-gradient';
import Helper from '../app/Helper';
import { NavigationEvents } from '@react-navigation/compat';
class ForgetPage extends React.Component {
    
    state = {
        spinner:false,
        email:'',
        _ie_underlineColor  : '#EFEFEF',
        _ie_placeHolderText : 'Email',
        _ie_lbl_style: {display:'none'},
        _ie_clr_btn_style: {height: 0, width: 0, opacity: 0},
        _form_errorMessage: '',
        _form_err_msg_style:{ display:'none'},

        email_sent : false,
        send_email_text : ''
    };

    goBack=()=>{
        this.props.navigation.navigate(this.props.route.params.sourcePage);
    };
    
    formSubmit = () => {
        if(this.state.email.length == 0){
            return;
        }
        this.setState({
            _form_errorMessage : '',
            _form_err_msg_style:{ display:'none'}
        });
        this.setState({spinner:true});
        Store.LoginService.forgetPassword(this.state.email,(res) => {
            if(res.success == true){
                this.setState({email_sent:true});
            }else{
                this.setState({
                    _form_errorMessage : res.msg,
                    _form_err_msg_style:{ display:'flex'}
                });
            }
            
            this.setState({spinner:false});

        },(error) => {
            this.setState({spinner:false});
        });
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

        setTimeout(()=>{
            this._updateFormView();
        },100);
    };
    _updateFormView = () => {
        let ok = 0;
        if(this.state.email != '' ){
            this.setState({ _ie_lbl_style: {display:'flex',color:'#8F8EA0'} });
            ok += 1;
        }
        this.setState({
            _form_err_msg_style:{ display:'none'}
        });
    }
    onRefresh(){
        this.setState({email_sent:false});
        this.setState({
            _form_errorMessage : '',
            _form_err_msg_style:{ display:'none'}
        });
    }
	render(){
        let icons = {
            back :  require('../../assets/icon/chevron-left.png') 
        };
        const email_sent = this.state.email_sent;
		return (
			<KeyboardAvoidingView style={styles.wrapper} behavior={Platform.OS === "ios" ? "padding" : null}> 
                <Spinner visible={this.state.spinner} textContent={''} textStyle={styles.spinnerTextStyle}/>
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
                <SafeAreaView style={[styles.content]}>
                    <ScrollView style={{padding:5}}>
                    
                        <View style={[styles.form]}>
                            <Text style={[{fontWeight:'bold',fontSize:16,color:'#3A3E4A'},{display:email_sent?'none':'flex'}]}>Kesulitan Mengakses akun Anda?</Text>
                            <Text style={[{marginVertical:10,fontSize:12,color:'#8F8EA0',lineHeight:16},{display:email_sent?'none':'flex'}]}>Lupa kata sandi? masukkan email login Anda dibawah ini. Kami akan mengirimkan pesan email beserta tautan untuk reset kata sandi Anda.</Text>
                        
                            <View style={[styles.formGroup,{display:email_sent?'none':'flex'}]}>
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
                                <TouchableHighlight underlayColor='transparent' onPress={this._ie_clear} style={[styles.formIconClose,this.state._ie_clr_btn_style]}>
                                    <Image  source={icons.close}/>
                                </TouchableHighlight>       
                            </View>
                            <View style={styles.formGroup}>
                                <View  style={[styles.errorMessage,this.state._form_err_msg_style]}>
                                    <Text style={{color:'#ffffff'}}>{this.state._form_errorMessage}</Text>
                                </View>
                            </View>
                        </View>
                         <View style={[styles.form,{display:!email_sent?'none':'flex'}]}>
                            <Text style={{fontWeight:'bold',fontSize:16,color:'#3A3E4A'}}>Email sudah terkirim</Text>
                            <Text style={{marginVertical:10,fontSize:12,color:'#8F8EA0',lineHeight:16}}>Silahkan periksa kotak masuk pada Email Anda.</Text>
                        </View>
                            
                    </ScrollView>
                    <View style={{flex:1,flexDirection:'column-reverse',padding:5}}>
                     <TouchableHighlight style={{display:email_sent?'none':'flex'}} underlayColor='transparent' onPress={()=>{ this.formSubmit() }} >
                                                    <View>
                                                        <LinearGradient colors={['#009EEE', '#00A4F6']} start={[0.0, 0.101]} 
                                                            style={{flex:1,alignItems:'center',padding:20,borderRadius:10}}>
                                                            <Text style={[{marginTop:-10},styles.btnActionText]}>Ubah Kata Sandi</Text>
                                                        </LinearGradient>    
                                                    </View>
                                                </TouchableHighlight>  
                   
                        
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>    
		);
	}
}
const styles = StyleSheet.create({
    errorMessage:{
        backgroundColor:'#e22134',
        marginVertical:15,
        alignItems:'center',
        padding:5,
        borderRadius:5,
        marginHorizontal:20
    },
    buttonGroup:{

    },
    headerGradient:{
       
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
    textInput:{
        paddingVertical:10,
        paddingHorizontal:5,
        fontSize:14
    },
    spinnerTextStyle:{

    },
    wrapper:{
        paddingTop:Constants.statusBarHeight,
        flex:1,
        backgroundColor:'#F8F7FC' 
    },
    header:{
        flexDirection:'row',
        backgroundColor:'#00A4F6',
    },
    content:{
        flex:1,
        backgroundColor:'white',
        padding:20
    },
 
    formGroup:{
        paddingVertical:2
    },
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
  
  
    errorMessage:{
        backgroundColor:'#e22134',
        marginVertical:15,
        alignItems:'center',
        padding:10,
        borderRadius:5,
        marginBottom:10
    }    
});

export default ForgetPage;