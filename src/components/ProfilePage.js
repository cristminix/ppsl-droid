import React from 'react';
import { AsyncStorage,View,StyleSheet, Text, Image, TouchableHighlight, TextInput, KeyboardAvoidingView ,SafeAreaView, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import Spinner from 'react-native-loading-spinner-overlay';
import { NavigationEvents } from '@react-navigation/compat';

class ProfilePage extends React.Component {
    goBack=()=>{
        this.props.navigation.navigate('DashboardPage');
    };
    state = {
        spinner:false,
        photoUrl:'../../assets/logo.png',
        nomorHP:'',
        email:'',
        displayName:''
    };

    refreshData = ()=>{
        AsyncStorage.getItem('full_profile', (error, result) => {
            if (result) {
                let full_profile = JSON.parse(result);
                console.log(full_profile)
                this.setState({
                    photoUrl : full_profile.thumb,
                    displayName: full_profile.account.nama_lengkap,
                    email: full_profile.am.email,
                    nomorHP: full_profile.am.no_hp
                });
            }
        });
    };
    render(){
        return (
            <KeyboardAvoidingView style={styles.wrapper} behavior='padding'>
                    <View >
                        <NavigationEvents onWillFocus={payload => this.refreshData()} />
                    </View>
                    <Spinner visible={this.state.spinner} textContent={'Loading...'} textStyle={styles.spinnerTextStyle} /> 

                    <View style={[styles.header]}>
                        <Text style={{fontWeight:'bold',fontSize:20,marginBottom:10}}>Profil</Text>
                        <View style={{flexDirection:'row'}}>
                            <View>
                                <Image style={styles.profilePhoto} source={{uri:this.state.photoUrl}}/>
                            </View>
                            
                            <View>
                                <Text style={{fontSize:14,fontWeight:'bold',marginLeft:10,marginBottom:5}}>{this.state.displayName}</Text>
                                <Text style={{fontSize:12,marginLeft:10,marginBottom:5}}>{this.state.nomorHP}</Text>
                                <Text style={{fontSize:12,marginLeft:10,marginBottom:5}}>{this.state.email}</Text>
                            </View>
                        </View>
                    </View>
                    <SafeAreaView style={styles.content}>
                    <ScrollView style={{paddingVertical:0}}>
                        <View style={{backgroundColor:'#fff',padding:20,marginBottom:10}}>
                            <Text style={{fontWeight:'bold',fontSize:14,marginBottom:10}}>Akun</Text>
                            <View style={{flexDirection:'row',marginVertical:10}}>
                                <Image style={styles.tabIcon} source={require('../../assets/icon/icon-profile-blue.png')}/>
                                <Text style={{marginLeft:10}}>Ubah Profil</Text>
                                <TouchableHighlight style={styles.btnActX} onPress={()=>{this.changeProfile()}}>
                                    <Image style={styles.tabIconX} source={require('../../assets/icon/chevron-right-black.png')}/>
                                </TouchableHighlight>
                            </View>
                        </View>

                        <View style={{backgroundColor:'#fff',padding:20}}>
                            <Text style={{fontWeight:'bold',fontSize:14,marginBottom:10}}>Keamanan</Text>
                            <View style={{flexDirection:'row',marginVertical:10}}>
                                <Image style={styles.tabIcon} source={require('../../assets/icon/icon-lock-blue.png')}/>
                                <Text style={{marginLeft:10}}>Ubah Kata Sandi</Text>
                                <TouchableHighlight style={styles.btnActX} onPress={()=>{this.changePasswd()}}>
                                    <Image style={styles.tabIconX} source={require('../../assets/icon/chevron-right-black.png')}/>
                                </TouchableHighlight>
                                
                            </View>
                            <View style={{flexDirection:'row',marginVertical:10}}>
                                <Image style={styles.tabIcon} source={require('../../assets/icon/icon-doc-blue.png')}/>
                                <Text style={{marginLeft:10}}>Dokumen Data Diri</Text>
                                <View style={{flexDirection:'row',position:'absolute',right:0,backgroundColor:'#A9FFCB',borderRadius:5,paddingVertical:5,paddingHorizontal:10,marginTop:-5}}>
                                    <Image style={styles.tabIcon} source={require('../../assets/icon/icon-check-green.png')}/>
                                    <Text style={{marginLeft:5,color:'#5DC759',fontSize:12,fontWeight:'bold'}}>Terverifikasi</Text>
                                </View>
                            </View>
                            <View style={{marginVertical:10}}>
                                <Text style={{color:'#8C8C98',fontSize:12}}> * Dokumen yang Anda berikan telah tersimpan dan terlindungi dengan aman di dalam sistem kami.</Text>
                            </View>
                        </View>
                        <View style={{marginVertical:10}}>
                                <Text style={{paddingHorizontal:10,color:'#8C8C98',fontSize:12}}> Version 1.0</Text>
                        </View>
                        <TouchableHighlight style={[{margin:20},styles.btnLogout]} onPress={()=>{this.logout()}} >
                            <View>
                                <Text style={{color:'#fff',fontSize:14,fontWeight:'bold'}}>Keluar</Text>
                            </View>
                        </TouchableHighlight>
                        
                    </ScrollView>
                    </SafeAreaView>
                    <View style={styles.tabContainer}>
                            <View style={styles.tabItem}>
                                <TouchableHighlight  onPress={this.onHome} style={[{marginHorizontal:10,marginVertical:10}]}>
                                    <View style={styles.tabWrp}>
                                        <Image style={styles.tabIcon} source={ require('../../assets/icon/icon-home-gray.png') }/>
                                        <Text style={this.state.tabItemTextStyleActive}>Beranda</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                            <View style={styles.tabItem}>
                                <TouchableHighlight onPress={this.onTransaksi} style={[{marginHorizontal:10,marginVertical:10}]}>
                                    <View style={styles.tabWrp}>
                                        <Image Transaks={styles.tabIcon} source={ require('../../assets/icon/icon-transaksi-gray.png') }/>
                                        <Text style={this.state.tabItemTextStyle}>Transaksi</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                            <View style={styles.tabItem}>
                                <TouchableHighlight onPress={this.onLaporan} style={[{marginHorizontal:10,marginVertical:10}]}>
                                    <View style={styles.tabWrp}>
                                        <Image style={styles.tabIcon} source={ require('../../assets/icon/icon-laporan-gray.png') }/>
                                        <Text style={this.state.tabItemTextStyle}>Laporan</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                            <View style={styles.tabItem}>
                                <TouchableHighlight style={[{marginHorizontal:10,marginVertical:10}]}>
                                    <View style={styles.tabWrp}>
                                        <Image style={styles.tabIcon} source={ require('../../assets/icon/icon-profile-blue.png') }/>
                                        <Text style={this.state.tabItemTextStyle}>Profile</Text>

                                    </View>
                                </TouchableHighlight>
                            </View>
                </View> 
                    </KeyboardAvoidingView>    
        );


    }
    onHome= ()=>{
        this.props.navigation.navigate('DashboardPage')
        
    }
    changePasswd= ()=>{
        this.props.navigation.navigate('ChangePasswdPage')
        
    }
    changeProfile= ()=>{
        this.props.navigation.navigate('ChangeProfilePage')
        
    }
    logout= ()=>{
        AsyncStorage.setItem('account', 'null');
        this.props.navigation.navigate('EntryPoint');

        
    }
    onRefresh = ()=>{
        // this.setState({refreshing:true})
        this.refreshData();
        console.log('refreshing')
    }
    onLaporan(){
        console.log('onLaporan')
    }
    onTransaksi(){
        console.log('onTransaksi')
    }
}
const styles = StyleSheet.create({
    tabItem:{

    },
    tabWrp:{
        marginHorizontal:10,

        alignItems:'center'
    },
    tabIcon:{
        width:18,
        height:18
    },
    
    tabIconX:{
        width:16,
        height:16,
        
    },
    btnActX:{
        position:'absolute',
        right:0
    },
    tabContainer:{
        flexDirection:'row',
        justifyContent:'center',
        // position:'absolute',
        alignItems:'center',

        bottom:0
    },
    tabItem:{

    },
    profilePhoto:{
        width:80,
        height:80,
        marginBottom:5,
        borderRadius:80
    },
    wrapper:{
        paddingTop:Constants.statusBarHeight,
        flex:1,
        backgroundColor:'#F8F7FC' 
    },
    header:{
        paddingHorizontal:20,
        paddingVertical:20,
        backgroundColor:'#fff',
        marginBottom:10
    },
    content:{
        flex:1,
        backgroundColor:'#F8F7FC',
        
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
    btnLogout:{
        backgroundColor:'#009EEE',
        borderRadius:50,
        padding:12,
        marginTop:10,
        alignItems:'center'
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

export default ProfilePage;