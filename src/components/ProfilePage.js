import React from 'react';
import { AsyncStorage,View,StyleSheet, Text, Image, TouchableHighlight, TextInput, KeyboardAvoidingView ,SafeAreaView, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import Spinner from 'react-native-loading-spinner-overlay';

class ProfilePage extends React.Component {
    goBack=()=>{
        this.props.navigation.navigate('DashboardPage');
    };
    state = {
        spinner:false
    };
    render(){
        return (
            <KeyboardAvoidingView style={styles.wrapper} behavior='padding'>
                
                <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
                    <View style={styles.header}>
                        <View style={{paddingHorizontal:10,paddingVertical:20}}>
                        <TouchableHighlight onPress={()=>{this.goBack()}} >
                        <Image style={{width:22}} source={ require('../../assets/icon/chevron-left.png') }/>
                            
                        </TouchableHighlight>
                        </View>
                        <View style={{flex:1,textAlign:'left',paddingLeft:120,paddingVertical:20}}>
                            <Text style={{color:'#ffffff',fontSize:14}}>Profile</Text>
                        </View>
                    </View>
                    <SafeAreaView style={styles.content}>
                    <ScrollView style={{padding:20}}>
                    
                        <Text style={{fontWeight:'bold',fontSize:16}}>Profile</Text>
                        <Text style={{marginVertical:10}}>-</Text>

                        <TouchableHighlight onPress={()=>{this.logout()}} >
                        <View>
                        <Image style={{width:22}} source={ require('../../assets/icon/chevron-left.png') }/>
                        <Text style={{marginVertical:10}}>Logout</Text>
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
    tabContainer:{
        flexDirection:'row',
        justifyContent:'center',
        // position:'absolute',
        alignItems:'center',

        bottom:0
    },
    tabItem:{

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

export default ProfilePage;