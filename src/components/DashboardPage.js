import React from 'react';
import { ActivityIndicator,RefreshControl,AsyncStorage,View,StyleSheet, Text, Image, TouchableHighlight, TextInput, KeyboardAvoidingView ,SafeAreaView, ScrollView,Button} from 'react-native';
import Constants from 'expo-constants';
import Spinner from 'react-native-loading-spinner-overlay';

import { LinearGradient } from 'expo-linear-gradient';
import { NavigationEvents } from '@react-navigation/compat';
import DashboardAction from './actions/DashboardAction';
import BottomNavigation from './BottomNavigation';
import DateTimePickerModal from "react-native-modal-datetime-picker";

class DashboardPage extends DashboardAction{
    
    render(){
        const { navigation } = this.props;
        let icons = {
            notification: require('../../assets/icon/icon-notification.png'),
            calendar: require('../../assets/icon/icon-calendar.png'),
            dash: require('../../assets/icon/icon-dash.png') 
        };
        // let isDatePickerVisible=this.isDatePickerVisible();
        let refreshing = <View></View>;
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
                <Spinner visible={this.state.spinner} textContent={''} textStyle={styles.spinnerTextStyle} /> 

                <View>
                    <NavigationEvents onWillFocus={payload => this.refreshData()} />
                </View>
                <LinearGradient  colors={['#009EEE', '#98D2FF']} start={[0.0,0.122]} style={styles.topGradient} />

                <TouchableHighlight underlayColor='transparent' style={styles.notifBtn} onPress={()=>{this.gotoNotif()}} >
                    <Image style={styles.notifIcon} source={icons.notification}/>
                </TouchableHighlight>

                <View style={[styles.header,{paddingVertical:10,paddingHorizontal:10}]}>
                    <Text style={styles.welcomeText}>{'Selamat Datang,'}</Text>

                    <TouchableHighlight underlayColor='transparent' style={styles.ppContainer} >
                        <Image style={styles.photoProfile} source={ {uri:this.state.photoUrl }}/>
                    </TouchableHighlight>

                    <Text style={styles.displayName}>{this.state.user_display_name}</Text>
                    <Text style={styles.emailText}>{this.state.user_email}</Text>
                </View>
                <View style={[styles.periodes,{}]}>

                        <TouchableHighlight onPress={()=>{this.pickDate('start_date')}} underlayColor='transparent' >
                        <View style={styles.datePickerContainer}>
                          
                            <Image style={styles.iconCalendar} source={icons.calendar}/>
                            <Text  style={styles.dateTxt}>{this.state.start_date_text}</Text>
                           
                        </View>
                        </TouchableHighlight>
                        <View style={styles.dashContainer}>
                            <Image style={styles.iconSd} source={icons.dash}/>
                        </View>

                        <TouchableHighlight onPress={()=>{this.pickDate('end_date')}}  underlayColor='transparent' >
                        <View style={styles.datePickerContainer}>
                           
                            <Image style={styles.iconCalendar } source={icons.calendar}/>
                            <Text style={styles.dateTxt}>{this.state.end_date_text}</Text>
                           
                        </View>
                        </TouchableHighlight> 
                    

                    
                    <DateTimePickerModal
                        isVisible={this.state.datepicker_shown}
                        mode="date"
                        onConfirm={this.onChangeDate}
                        date={this.state.date}
                        onCancel={()=>{}}
                    />
                    </View>
                <SafeAreaView style={styles.content} onLayout={(event) => { this.find_dimesions(event.nativeEvent.layout) }}>
                    <ScrollView style={{paddingVertical:0}}>
                        <View style={styles.statistic}>
                            <View style={styles.boxItem}>
                                
                                <LinearGradient colors={['#FFC583', '#FAA871']} style={[styles.boxStyle,this.state._boxStyle]}>
                                    <Text style={styles.statisticVal}>{this.state.prospek}</Text>
                                    <Text style={styles.statisticText}>Prospek</Text>
                                </LinearGradient>
                                
                                <LinearGradient colors={['#ACB4FF', '#778BFE']} style={[styles.boxStyle,this.state._boxStyle]}>
                                    <Text style={styles.statisticVal}> {this.state.survey} </Text>
                                    <Text style={styles.statisticText}>Survey</Text>
                                </LinearGradient>
                            </View>
                            <View style={styles.boxItem}>
                                <LinearGradient colors={['#7EDC84', '#5DC759']} style={[styles.boxStyle,this.state._boxStyle]}>
                                    <Text style={styles.statisticVal}>{this.state.pelanggan}</Text>
                                    <Text style={styles.statisticText}>Pelanggan</Text>
                                </LinearGradient>
                                
                                <LinearGradient colors={['#FE9797', '#FF7070']} style={[styles.boxStyle,this.state._boxStyle]}>
                                    <Text style={styles.statisticVal}>{this.state.batal}</Text>
                                    <Text style={styles.statisticText}>Batal</Text>
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
    header:{
        alignItems:'center'
    },
    boxItem:{flex:1,flexDirection:'row',margin:10},
    boxStyle:{ padding: 15, borderRadius: 10 ,flex:1,justifyContent:'flex-end'},
    statisticVal:{
        backgroundColor: 'transparent',
        fontSize: 40,
        fontWeight:'bold',
        paddingTop:30,
        color: '#fff',
      },
    statisticText:{
        backgroundColor: 'transparent',
        fontSize: 15,
        color: '#fff',
      },
    notifIcon:{width:28,height:31},
    ppContainer:{marginHorizontal:10,marginVertical:10},
    dashContainer:{backgroundColor:'transparent', flexDirection:'row'},
    dateTxt:{paddingHorizontal:10,paddingVertical:10},
    datePickerContainer:{backgroundColor:'#F8F7FC',borderRadius:5, flexDirection:'row'},
    emailText:{color:'#ffffff',fontSize:14},
    displayName:{color:'#ffffff',fontSize:14,fontWeight:'bold'},
    notifBtn:{position:'absolute',right:20,marginTop:45,marginHorizontal:10,marginVertical:10},
    topGradient:{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 400,
      },
    statistic:{
        flex:1,
        flex:1,flexDirection:'column'
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
    
    content:{
        flex:1,
        backgroundColor:'white',
        borderTopLeftRadius:40,
        borderTopRightRadius: 40,
        padding:10,
        paddingBottom:0
    },
    
    welcomeText:{color:'#ffffff',fontSize:20,fontWeight:'bold'},  
    
});

export default DashboardPage;