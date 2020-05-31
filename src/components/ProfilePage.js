import React from 'react';
import {  View,StyleSheet, Text, Image, TouchableHighlight, TextInput, KeyboardAvoidingView ,SafeAreaView, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import Spinner from 'react-native-loading-spinner-overlay';
import { NavigationEvents } from '@react-navigation/compat';
import BottomNavigation from './BottomNavigation';
import Session from '../app/Session';
import Config from '../app/Config';

class ProfilePage extends React.Component {
    goto=(nav)=>{
        this.props.navigation.navigate(nav,{sourcePage:'ProfilePage'});
    };
    state = {
        spinner : false,
        photoUrl : Config.defaultPhotoUrl,
        nomorHP : '',
        email : '',
        displayName :''
    };

    refreshData = ()=>{
        
        Session.userData('profile',(profile)=>{
            this.setState({
                photoUrl : profile.photo_64,
                displayName: profile.nama_lengkap,
                email: profile.email,
                nomorHP: profile.nomor_hp
            });
        },(error)=>{});
    };
    onRefresh = ()=>{
        // this.setState({refreshing:true})
        this.refreshData();
        console.log('refreshing')
    }

    logout(){
        Session.setUserData('account',null);
        Session.setUserData('profile',null);
        Session.setUserData('statistic',null);

        setTimeout(()=>{
            this.props.navigation.navigate('LoginPage');
        },100);
    }
    render(){
        const { navigation } = this.props;

        return (
            <KeyboardAvoidingView style={styles.wrapper} behavior={Platform.OS === "ios" ? "padding" : null}>
                    <View >
                        <NavigationEvents onWillFocus={payload => this.refreshData()} />
                    </View>
                    <Spinner visible={this.state.spinner} textContent={''} textStyle={styles.spinnerTextStyle} /> 

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
                                <TouchableHighlight underlayColor='transparent' style={styles.btnActX} onPress={()=>{this.goto('ChangeProfilePage')}}>
                                    <Image style={styles.tabIconX} source={require('../../assets/icon/chevron-right-black.png')}/>
                                </TouchableHighlight>
                            </View>
                        </View>

                        <View style={{backgroundColor:'#fff',padding:20}}>
                            <Text style={{fontWeight:'bold',fontSize:14,marginBottom:20}}>Keamanan</Text>
                            <View style={{flexDirection:'row',marginVertical:20}}>
                                <Image style={styles.tabIcon} source={require('../../assets/icon/icon-lock-blue.png')}/>
                                <Text style={{marginLeft:10}}>Ubah Kata Sandi</Text>
                                <TouchableHighlight underlayColor='transparent' style={styles.btnActX} onPress={()=>{this.goto('ChangePasswdPage')}}>
                                    <Image style={styles.tabIconX} source={require('../../assets/icon/chevron-right-black.png')}/>
                                </TouchableHighlight>
                                
                            </View>
                            <View style={{flexDirection:'row',marginVertical:20}}>
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
                        <View style={{marginTop:10}}>
                                <Text style={{paddingHorizontal:20,color:'#8C8C98',fontSize:12}}> Version 1.0</Text>
                        </View>
                        
                    <View style={{flexDirection:'column-reverse',backgroundColor:'#fff'}}>
                    <TouchableHighlight underlayColor='transparent' style={[{margin:20},styles.btnLogout]} onPress={()=>{this.logout()}} >
                            <View>
                                <Text style={{color:'#fff',fontSize:14,fontWeight:'bold'}}>Keluar</Text>
                            </View>
                        </TouchableHighlight>
                    </View>    
                    </ScrollView>
                    
                    </SafeAreaView>
                    <BottomNavigation activeMenu="ProfilePage" navigation={navigation}/>
                    
                    </KeyboardAvoidingView>    
        );


    }
    
    
}
const styles = StyleSheet.create({
    tabItem:{

    },
    tabWrp:{
        marginHorizontal:5,

        alignItems:'center'
    },
    tabIcon:{
        width:18,
        height:18
    },
    
    tabIconX:{
        width:22,
        height:22,
        
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
    
    formGroup:{
        paddingVertical:2
    },
    btnLogout:{
        backgroundColor:'#009EEE',
        borderRadius:50,
        padding:12,
        marginTop:10,
        alignItems:'center'
    }  
});

export default ProfilePage;