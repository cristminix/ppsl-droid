import React from 'react';
import { ActivityIndicator,RefreshControl,AsyncStorage,View,StyleSheet, Text, Image, TouchableHighlight, TextInput, KeyboardAvoidingView ,SafeAreaView, ScrollView,Button} from 'react-native';
import Constants from 'expo-constants';
import Spinner from 'react-native-loading-spinner-overlay';

import { LinearGradient } from 'expo-linear-gradient';
import { NavigationEvents } from '@react-navigation/compat';
import DashboardAction from './actions/DashboardAction';
import BottomNavigation from './BottomNavigation';

class DashboardPage extends DashboardAction{
    
    

  
    render(){
        const { navigation } = this.props;
        
        let show=false;
        let refreshing = <View></View>;
        // let haveFoto = '../../assets/icon/profile_user.png';
        if (this.state.refreshing) {
        refreshing = (
        //loading view while data is loading
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
        return (
            <KeyboardAvoidingView style={styles.wrapper} behavior='padding'>
                <View >
                    <NavigationEvents onWillFocus={payload => this.refreshData()} />
                </View>
                <LinearGradient
                  colors={['#009EEE', '#98D2FF']}
                  start={[0.0,0.122]}
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height: 400,
                  }}
                />
                <Spinner visible={this.state.spinner} textContent={'Loading...'} textStyle={styles.spinnerTextStyle} /> 
                <TouchableHighlight underlayColor='transparent' style={[{position:'absolute',right:20,marginTop:45,marginHorizontal:10,marginVertical:10}]} onPress={()=>{this.gotoNotif()}} >
                            <Image style={{width:28,height:31}} source={ require('../../assets/icon/icon-notification.png')}/>
                        </TouchableHighlight>
                <View style={[styles.header,{paddingVertical:10,paddingHorizontal:10}]}>
                        <Text style={{color:'#ffffff',fontSize:20,fontWeight:'bold'}}>{'Selamat Datang,'}</Text>

                        <TouchableHighlight style={[{marginHorizontal:10,marginVertical:10}]} onPress={()=>{this.goBack()}} >
                            <Image style={styles.photoProfile} source={ {uri:this.state.photoUrl }}/>
                        </TouchableHighlight>
                        <Text style={{color:'#ffffff',fontSize:14,fontWeight:'bold'}}>{this.state.user_display_name}</Text>
                        <Text style={{color:'#ffffff',fontSize:14}}>{this.state.user_email}</Text>

                        
                </View>
                <View style={[styles.periodes,{}]}>

                        <View style={{backgroundColor:'#F8F7FC',borderRadius:5, flexDirection:'row'}}>
                            <Image style={styles.iconCalendar} source={ require('../../assets/icon/icon-calendar.png') }/>
                            <Text  style={[{paddingHorizontal:10,paddingVertical:10}]}>01/04/2020</Text>
                        </View>
                        <View style={{backgroundColor:'transparent', flexDirection:'row'}}>
                            <Image style={styles.iconSd} source={ require('../../assets/icon/icon-dash.png') }/>

                        </View>

                        <View style={{backgroundColor:'#F8F7FC',borderRadius:5, flexDirection:'row'}}>
                            <Image style={styles.iconCalendar } source={ require('../../assets/icon/icon-calendar.png') }/>
                            <Text style={[{paddingHorizontal:10,paddingVertical:10}]}>08/06/2020</Text>
                        </View>
                    

                    {show && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      timeZoneOffsetInMinutes={0}
                      value={this.state.date}
                      mode={this.state.mode}
                      is24Hour={true}
                      display="default"
                      onChange={this.onChange}
                    />
                    )}
                    </View>
                <SafeAreaView style={[styles.content,{flex:1}]} onLayout={(event) => { this.find_dimesions(event.nativeEvent.layout) }}>
                    <ScrollView style={{paddingVertical:0}}>
                        <View style={[styles.statistic,{flex:1,flexDirection:'column'}]}>
                            <View style={[styles.boxItem,{flexDirection:'row',margin:10}]}>
                                  <LinearGradient onPress={()=>{ this.gotoTransPage('prospek') }}
                                      colors={['#FFC583', '#FAA871']}
                                      style={[{ padding: 15, borderRadius: 10 ,flex:1,justifyContent:'flex-end'},this.state._boxStyle]}>
                                      <Text
                                        style={{
                                          backgroundColor: 'transparent',
                                          fontSize: 40,
                                          fontWeight:'bold',
                                          paddingTop:30,
                                          color: '#fff',
                                        }}>
                                        {this.state.prospek}
                                      </Text>
                                      <Text
                                        style={{
                                          backgroundColor: 'transparent',
                                          fontSize: 15,
                                          color: '#fff',
                                        }}>
                                        Prospek
                                      </Text>
                                    </LinearGradient>
                                    <LinearGradient
                                      colors={['#ACB4FF', '#778BFE']}
                                      style={[{ padding: 15, borderRadius: 10 ,flex:1,justifyContent:'flex-end'},this.state._boxStyle]}>
                                      <Text
                                        style={{
                                          backgroundColor: 'transparent',
                                          fontSize: 40,
                                          fontWeight:'bold',
                                          paddingTop:30,
                                          color: '#fff',
                                        }}>
                                        {this.state.survey}
                                       
                                      </Text>
                                       <Text
                                        style={{
                                          backgroundColor: 'transparent',
                                          fontSize: 15,
                                          color: '#fff',
                                        }}>
                                        Survey
                                      </Text>
                                    </LinearGradient>
                            </View>
                            <View style={[styles.boxItem,{flexDirection:'row',margin:10}]}>
                                  <LinearGradient
                                      colors={['#7EDC84', '#5DC759']}
                                      style={[{ padding: 15, borderRadius: 10 ,flex:1,justifyContent:'flex-end'},this.state._boxStyle]}>
                                      <Text
                                        style={{
                                          backgroundColor: 'transparent',
                                          fontSize: 40,
                                          fontWeight:'bold',
                                          paddingTop:30,
                                          color: '#fff',
                                        }}>
                                        {this.state.pelanggan}
                                        
                                      </Text>
                                      <Text
                                        style={{
                                          backgroundColor: 'transparent',
                                          fontSize: 15,
                                          color: '#fff',
                                        }}>
                                        Pelanggan
                                      </Text>
                                    </LinearGradient>
                                    <LinearGradient
                                      colors={['#FE9797', '#FF7070']}
                                      style={[{ padding: 15, borderRadius: 10 ,flex:1,justifyContent:'flex-end'},this.state._boxStyle]}>
                                      <Text
                                        style={{
                                          backgroundColor: 'transparent',
                                          fontSize: 40,
                                          fontWeight:'bold',
                                          paddingTop:30,
                                          color: '#fff',
                                        }}>
                                        {this.state.batal}
                                       
                                      </Text>
                                       <Text
                                        style={{
                                          backgroundColor: 'transparent',
                                          fontSize: 15,
                                          color: '#fff',
                                        }}>
                                        Batal
                                      </Text>
                                    </LinearGradient>
                            </View>
                           
                        </View>
                        
                    </ScrollView>
                </SafeAreaView>
                <BottomNavigation activeMenu="DashboardPage" navigation={navigation}/>
            </KeyboardAvoidingView>    
        );
    }

    
}
const styles = StyleSheet.create({
    statistic:{
        flex:1
    },
    boxItem:{
        flex:1,
    },
  
    iconCalendar:{
        width:20,
        height:20,
        marginTop:8,
        marginLeft:5
    },
    iconSd:{
        width:20,
        height:20,
        marginTop:8,
        marginLeft:5,
        marginRight:5
    },
    wrapper:{
        flex:1,
        paddingTop:Constants.statusBarHeight,
        backgroundColor:'transparent' 
    },
    header:{
        alignItems:'center'
    },
    box:{

    },
  
    periodes:{
        alignItems:'center',
        backgroundColor:'#fff',
        flexDirection:'row',
        justifyContent:'center',
        borderRadius:10,
        paddingVertical:5,
        paddingHorizontal:5,
        marginHorizontal:35,
        marginBottom:-10
    },
   
    photoProfile:{
        width:80,
        height:80,
        marginBottom:5,
        borderRadius:100
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
        // flex:1,
        color:'#36227C',
        fontWeight:'bold',
        fontSize:20
    },
    logo:{
        // flex:2,
        resizeMode:'contain',
        marginTop:10
    },
    content:{
        // flex:2,
        backgroundColor:'white',
        borderTopLeftRadius:40,
        borderTopRightRadius: 40,
        padding:10,
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

export default DashboardPage;