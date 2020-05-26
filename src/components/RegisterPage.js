import React from 'react';
import { View,StyleSheet, Text, Image, TouchableHighlight, Button,TextInput, KeyboardAvoidingView,SafeAreaView,Dimensions ,ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Spinner from 'react-native-loading-spinner-overlay';
import RegisterAction from './actions/RegisterAction';
import { NavigationEvents } from '@react-navigation/compat';
import { LinearGradient } from 'expo-linear-gradient';
class RegisterPage extends RegisterAction{
    
	render(){
        let icons = {
            back : require('../../assets/icon/chevron-left.png'),
            close: require('../../assets/icon/close.png'),
            eye_close: require('../../assets/icon/eye-close.png') ,
            eye_open:  require('../../assets/icon/eye-open.png'),
            check:  require('../../assets/icon/icon-check-green.png')

        };
        let { image_ktp,image_ktp_selfie } = this.state;
			return (
            <KeyboardAvoidingView style={styles.wrapper} behavior={Platform.OS === "ios" ? "padding" : null}>
                <View >
                    <NavigationEvents onWillFocus={payload => this.onRefresh()} />
                </View>
                <Spinner visible={this.state.spinner} textContent={''} textStyle={styles.spinnerTextStyle} /> 

                <LinearGradient colors={['#009EEE', '#00A4F6']} start={[0.0, 0.101]} style={[{paddingVertical:20},styles.headerGradient]}>

                    <View style={{paddingHorizontal:10,paddingVertical:0}}>
                    <TouchableHighlight underlayColor='transparent' onPress={()=>{this.goBack()}} >
                        <Image style={{width:22}} source={icons.back}/>
                    </TouchableHighlight>
                    </View>
                    <View style={{flex:1,alignItems:'center',paddingVertical:0}}>
                        <Text style={{color:'#ffffff',fontSize:14,marginLeft:-22,marginTop:-20}}>Registrasi</Text>
                    </View>
                </LinearGradient>
                
                <SafeAreaView style={styles.content}>
                    <ScrollView style={{padding:0}}>
                        <Text style={{fontWeight:'bold',fontSize:16,display:!this.state.registerSuccess?'none':'flex'}}>Registrasi PPSL PERUMDAM TKR</Text>
                        <Text style={{marginVertical:10,display:!this.state.registerSuccess?'none':'flex'}}>Selamat registrasi berhasil, silahkan periksa email Anda.</Text>
                        <View style={{ marginVertical:10,flexDirection:'column',display:!this.state.registerSuccess?'none':'flex'}}>
                        <Text style={{lineHeight:16,marginVertical:10,display:!this.state.registerSuccess?'none':'flex'}}></Text>
                        </View>
                        
                        <Text style={{fontWeight:'bold',fontSize:16,display:this.state.registerSuccess?'none':'flex'}}>Registrasi PPSL PERUMDAM TKR</Text>
                        <Text style={{marginVertical:10,display:this.state.registerSuccess?'none':'flex'}}>Silahkan isi data dengan benar</Text>
                        <View style={[styles.form,{display:this.state.registerSuccess?'none':'flex'}]}>
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
                                    <Image  source={icons.close} />
                                </TouchableHighlight>       
                            </View>
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
                                value={this.state.nomor_hp}
                                onChangeText={( nomor_hp ) => this.setState({ nomor_hp })}
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
                            underlineColorAndroid={this.state._ie_underlineColor} />
                            <TouchableHighlight underlayColor='transparent'  onPress={this._ie_clear} style={[styles.formIconClose,this.state._ie_clr_btn_style]}>
                                <Image  source={icons.close} />
                            </TouchableHighlight>       
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={[styles.defaultText,{paddingTop:5,paddingLeft:5},this.state._ip_lbl_style]}>Kata Sandi</Text>

                            <TextInput style={styles.textInput}
                            value={this.state.passwd}
                            onChangeText={( passwd ) => this.setState({ passwd })}
                            onFocus={this._onInputPasswordFocus}
                            onBlur={this._onInputPasswordBlur}
                            onKeyPress={this._validateInput}
                            placeholder={this.state._ip_placeHolderText}
                            placeholderTextColor="#8F8EA0"
                            underlineColorAndroid={this.state._ip_underlineColor}
                            secureTextEntry={this.state._ip_Secured}
                                />
                            <TouchableHighlight underlayColor='transparent'  onPress={this._ip_viewPass} style={[styles.formIconViewPass,this.state._ip_shp_o_btn_style]}>
                                <Image source={icons.eye_close}/>
                            </TouchableHighlight>

                            <TouchableHighlight underlayColor='transparent'  onPress={this._ip_hidePass} style={[styles.formIconClose,this.state._ip_shp_c_btn_style]}>
                                <Image  source={icons.eye_open}/>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={[styles.defaultText,{paddingTop:5,paddingLeft:5},this.state._irp_lbl_style]}>Ulangi Kata Sandi</Text>

                            <TextInput style={styles.textInput}
                            value={this.state.repeat_passwd}
                            onChangeText={( repeat_passwd ) => this.setState({ repeat_passwd })}
                            onFocus={this._onInputRPasswordFocus}
                            onBlur={this._onInputRPasswordBlur}
                            onKeyPress={this._validateInput}
                            placeholder={this.state._irp_placeHolderText}
                            placeholderTextColor="#8F8EA0"
                            underlineColorAndroid={this.state._irp_underlineColor}
                            secureTextEntry={this.state._irp_Secured}
                                />
                            <TouchableHighlight underlayColor='transparent'  onPress={this._irp_viewPass} style={[styles.formIconViewPass,this.state._irp_shp_o_btn_style]}>
                                <Image source={icons.eye_close}/>
                            </TouchableHighlight>

                            <TouchableHighlight underlayColor='transparent'  onPress={this._irp_hidePass} style={[styles.formIconClose,this.state._irp_shp_c_btn_style]}>
                                <Image  source={icons.eye_open}/>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={[styles.defaultText,{paddingTop:5,paddingLeft:5},this.state._gry_lbl_style]}>Foto KTP</Text>
                            <View style={styles.photoUploadWrp}>
                                {image_ktp && <Image source={{ uri: image_ktp }} style={styles.imagePreview} />}

                                <TouchableHighlight underlayColor='transparent'  onPress={this._pickImageKtp} style={styles.btnUpload}>
                                <Text style={styles.btnUploadText}>Upload KTP</Text>
                                </TouchableHighlight>

                            </View>
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={[styles.defaultText,{paddingTop:5,paddingLeft:5},this.state._gry_lbl_style]}>Upload selfie dengan KTP</Text>
                            <View style={styles.photoUploadWrp}>
                                {image_ktp_selfie && <Image source={{ uri: image_ktp_selfie }} style={styles.imagePreview} />}
                                
                                <TouchableHighlight underlayColor='transparent'  onPress={this._pickImageKtpSelfie} style={styles.btnUpload}>
                                <Text style={styles.btnUploadText}>Upload selfie dengan KTP</Text>
                                </TouchableHighlight>

                            </View>
                        </View>
                        <View  style={styles.formGroup}>
                            <View  style={[styles.errorMessage,this.state._form_err_msg_style]}>
                                <Text style={{color:'#ffffff',padding:4}}>{this.state._form_errorMessage}</Text>
                            </View>
                        </View>
                        <View  style={styles.formGroup}>
                        <TouchableHighlight underlayColor='transparent'  style={styles.btnRegister} onPress={this._onSubmitForm} disabled={false}>
                            <Text style={styles.btnRegisterText}> Registrasi </Text>
                        </TouchableHighlight>
                        </View>
                        </View>
                    </ScrollView>
                    </SafeAreaView>

				</KeyboardAvoidingView>
			);
		}
}
const styles = StyleSheet.create({
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

export default RegisterPage;