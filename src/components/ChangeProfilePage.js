import React from 'react';
import { AsyncStorage, View,StyleSheet, Text, Image, TouchableHighlight, TextInput, KeyboardAvoidingView ,SafeAreaView, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import Spinner from 'react-native-loading-spinner-overlay';

import { LinearGradient } from 'expo-linear-gradient';
import { NavigationEvents } from '@react-navigation/compat';
import Config from '../app/Config';
import Store from '../app/Store';
import Session from '../app/Session';
class ChangeProfilePage extends React.Component {
    goBack=()=>{
        this.props.navigation.navigate('ProfilePage');
    };
    changePhoto=()=>{
        // this.props.navigation.navigate('ProfilePage');
    };
    state = {
        spinner:false,
        photoUrl:'https://ppsl.perumdamtkr.com/themes/metronic/assets/pages/media/profile/profile_user.png',
        nama_lengkap: '',
        nomor_hp:'',
        email:'',
        user_id:'',
        _inputNamaLengkapDisabled: false,
        foto:null,


        _btSimpanDisabled: false,
        _form_HasError: false,
        _form_errorMessage: 'Data tidak valid.',
        _form_err_msg_style:{ display:'none'},

        _ie_Focused: false,
        _in_Focused: false,
        _ihp_Focused: false,

        _ie_underlineColor  : '#EFEFEF',
        _ie_placeHolderText : 'Email',
        _ie_lbl_style: {display:'none'},
        _ie_clr_btn_style: {height: 0, width: 0, opacity: 0},

        _in_underlineColor  : '#EFEFEF',
        _in_placeHolderText : 'Nama Lengkap',
        _in_lbl_style: {display:'none'},
        _in_clr_btn_style: {height: 0, width: 0, opacity: 0},

        _ihp_underlineColor  : '#EFEFEF',
        _ihp_placeHolderText : 'Nomor HP',
        _ihp_lbl_style: {display:'none'},
        _ihp_clr_btn_style: {height: 0, width: 0, opacity: 0},

        _disableChangePhoto: false,
        formErrorMsg:'',
        fomsErrorShown: false,
        formErrorMsgStyle: {display:'none'},
    };
    refreshData = ()=>{
        Session.getFullProfile((full_profile)=>{
            console.log(full_profile);
            this.setState({
                photoUrl : full_profile.thumb,
                nama_lengkap: full_profile.account.nama_lengkap,
                email: full_profile.am.email=='n/a'?'':full_profile.am.email,
                nomor_hp: full_profile.am.no_hp,

            });
            if(full_profile.account.rules === 'pegawai'){
                this.setState({
                    _inputNamaLengkapDisabled : true,
                    _disableChangePhoto: true
                })
            }else{
                this.setState({
                    _inputNamaLengkapDisabled : false,
                    _disableChangePhoto: false
                })
            }
        },(error)=>{
            console.log(error);
        });
        
    };
    _ie_clear = () => {
        this.setState({ email: '' });
    };
    _in_clear = () => {
        this.setState({ nama_lengkap: '' });
    };
    _ihp_clear = () => {
        this.setState({ nomor_hp: '' });
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
        this._validateInput();
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
        this._validateInput();
    };
    _onInputNomorHPFocus = () => {
        this.setState({ 
            _ihp_Focused: true,
            _ihp_underlineColor: '#009EEE',
            _ihp_placeHolderText: '',
            _ihp_lbl_style: {display:'flex',color:'#009EEE',marginTop:4},
            _ihp_clr_btn_style: {marginTop:30}

        });
    };
    _onInputNomorHPBlur = () => {
        this.setState({ 
            _ihp_Focused: false,
            _ihp_underlineColor: '#EFEFEF',
            _ihp_placeHolderText : 'Nomor HP',
            _ihp_lbl_style: {display:'none'},
            _ihp_clr_btn_style: {height: 0, width: 0, opacity: 0}
        });
        this._validateInput();
    };
    _validateInput = ()=>{
        if(this.state.nama_lengkap.length >= 0 && this.state.nomor_hp.length>= 0 && this.state.email.length > 0){
            this.setState({_btSimpanDisabled:false});
        }else{
            this.setState({_btSimpanDisabled:true});
        }
    };
    onRefresh = ()=>{
        this.refreshData();
    };
    formSubmit = ()=>{
        this.setState({spinner:true});
        Session.userData('account',(account)=>{
            Store.LoginService.changeProfile(account.user_id,this.state.nama_lengkap,this.state.nomor_hp, this.state.email, this.state.foto,(res)=>{
                console.log(res)
                if(res.data.success){
                    this.setState({
                        changeProfileSucces: true
                        
                    });
                }else{
                    this.setState({
                        changeProfileSucces : false,
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
        },(error)=>{});
        
    };
    render(){
        let icons = {
            back :  require('../../assets/icon/chevron-left.png') 
        };
        return (
            <KeyboardAvoidingView style={styles.wrapper}  behavior={Platform.OS === "ios" ? "padding" : null}>
                <View >
                    <NavigationEvents onWillFocus={payload => this.onRefresh()} />
                </View>
                <Spinner visible={this.state.spinner} textContent={'Loading...'} textStyle={styles.spinnerTextStyle} /> 

                <LinearGradient colors={['#009EEE', '#00A4F6']} start={[0.0, 0.101]} style={[{paddingVertical:20},styles.headerGradient]}>

                    <View style={{paddingHorizontal:10,paddingVertical:0}}>
                    <TouchableHighlight underlayColor='transparent' onPress={()=>{this.goBack()}} >
                        <Image style={{width:22}} source={icons.back}/>
                    </TouchableHighlight>
                    </View>
                    <View style={{flex:1,alignItems:'center',paddingVertical:0}}>
                        <Text style={{color:'#ffffff',fontSize:14,marginLeft:-22,marginTop:-20}}>Ubah Profile</Text>
                    </View>
                    </LinearGradient>
               
                <View style={{alignItems:"center",backgroundColor:'#fff'}}>
                    <View style={{paddingHorizontal:10,paddingVertical:20}}>
                        <TouchableHighlight underlayColor='transparent'  onPress={()=>{this.changePhoto()}} >
                            <Image style={{width:100,height:100,borderRadius:90}} source={ {uri: this.state.photoUrl }}/>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor='transparent'  onPress={()=>{this.changePhoto()}} style={{position:'absolute',marginTop:100,marginLeft:80,backgroundColor:'#fff',padding:5,alignItems:'center',borderRadius:10,opacity:this.state._disableChangePhoto?0:1}}>
                            <Image style={{width:12,height:12,borderRadius:5}} source={require('../../assets/icon/icon-pencil-blue.png')}/>
                        </TouchableHighlight>
                    </View>
                    
                </View>
                <SafeAreaView style={styles.content}>
                    <ScrollView style={{paddingVertical:10}}>
                        <View style={styles.form}>
                            <View style={styles.formGroup}>
                                <Text style={[styles.defaultText,{paddingTop:5,paddingLeft:5},this.state._in_lbl_style]}>Nama Lengkap</Text>

                                <TextInput style={styles.textInput}
                                editable={!this.state._inputNamaLengkapDisabled}
                                value={this.state.nama_lengkap}
                                onChangeText={( nama_lengkap ) => this.setState({ nama_lengkap })}
                                onKeyPress={this._validateInput}
                                placeholder={this.state._in_placeHolderText}
                                onFocus={this._onInputNamaLengkapFocus}
                                onBlur={this._onInputNamaLengkapBlur}
                                placeholderTextColor="#8F8EA0"
                                autoCapitalize = 'none'
                                underlineColorAndroid={this.state._in_underlineColor} />
                                <TouchableHighlight onPress={this._in_clear} style={[styles.formIconClose,this.state._in_clr_btn_style]}>
                                    <Image  source={ require('../../assets/icon/close.png') } />
                                </TouchableHighlight>       
                            </View>
                            <View style={styles.formGroup}>
                                <Text style={[styles.defaultText,{paddingTop:5,paddingLeft:5},this.state._ihp_lbl_style]}>Nomor HP</Text>

                                <TextInput style={styles.textInput}
                                value={this.state.nomor_hp}
                                onChangeText={( nomor_hp ) => this.setState({ nomor_hp })}
                                onKeyPress={this._validateInput}
                                placeholder={this.state._ihp_placeHolderText}
                                onFocus={this._onInputNomorHPFocus}
                                onBlur={this._onInputNomorHPBlur}
                                placeholderTextColor="#8F8EA0"
                                autoCapitalize = 'none'
                                underlineColorAndroid={this.state._ihp_underlineColor} />
                                <TouchableHighlight onPress={this._ihp_clear} style={[styles.formIconClose,this.state._ihp_clr_btn_style]}>
                                    <Image  source={ require('../../assets/icon/close.png') } />
                                </TouchableHighlight>       
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
                            
                            <View style={[styles.errorMessage,this.state.formErrorMsgStyle]}>
                                <Text style={{color:'#fff',marginBottom:-10}}>{this.state.formErrorMsg}</Text>
                            </View>
                             
                        </View>
                    </ScrollView>
                    <View style={[{flex:1,flexDirection:'column-reverse',paddingHorizontal:5,paddingVertical:10,marginBottom:10},{display:this.state.changePasswordSucces?'none':'flex'}]}>
                        <TouchableHighlight disabled={this.state._btSimpanDisabled} underlayColor='transparent' onPress={()=>{ this.formSubmit() }} >
                            <View>
                                <LinearGradient colors={['#009EEE', '#00A4F6']} start={[0.0, 0.101]} 
                                    style={{flex:1,alignItems:'center',padding:20,borderRadius:10}}>
                                    <Text style={[{marginTop:-10},styles.btnActionText]}>Simpan</Text>

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
        flex:1,
        backgroundColor:'white',
        padding:10,
        paddingBottom:0,
        paddingHorizontal:20
    },
    btnSimpan:{
        backgroundColor:'#009EEE',
        borderRadius:50,
        padding:12,
        marginTop:10,
        alignItems:'center'
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

export default ChangeProfilePage;