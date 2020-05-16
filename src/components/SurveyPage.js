import React from 'react';
import { View,StyleSheet, Text, Image, TouchableHighlight, TextInput, KeyboardAvoidingView ,SafeAreaView, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import Spinner from 'react-native-loading-spinner-overlay';
import {Calendar, CalendarList, Agenda, LocaleConfig} from 'react-native-calendars';
import BottomNavigation from './BottomNavigation';

LocaleConfig.locales['id'] = {
    monthNames: ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'],
    monthNamesShort: ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'],
    dayNames: ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'],
    dayNamesShort: ['Min','Sen','Sel','Rab','Kam','Jum','Sab'],
    today: 'Hari Ini'
  };
  LocaleConfig.defaultLocale = 'id';
class SurveyPage extends React.Component {
    goBack=()=>{
        this.props.navigation.navigate('LoginPage');
    };
    state = {
        tabItemTextStyle:{color:'#CACACC'},
        tabItemTextStyleActive:{color:'#009EEE'},
        spinner:false
    };
    render(){
        const { navigation } = this.props;

        return (
            <KeyboardAvoidingView style={styles.wrapper} behavior={Platform.OS === "ios" ? "padding" : null}>
                <Spinner visible={this.state.spinner}  textContent={'Loading...'}   textStyle={styles.spinnerTextStyle}/>
                 <SafeAreaView style={styles.content}>
                 <Calendar
  style={[styles.calendar, {height: 300}]}
  dayComponent={({date, state}) => {
    return (<View style={{flex: 1}}><Text style={{textAlign: 'center', color: state === 'disabled' ? 'gray' : 'black'}}>{date.day}</Text></View>);
  }}
/>
                 </SafeAreaView>   
                 <BottomNavigation activeMenu="SurveyPage" navigation={navigation}/>
                
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
    wrapper:{
        paddingTop:Constants.statusBarHeight,
        flex:1,
        backgroundColor:'#F8F7FC' 
    },
    header:{
        // flexDirection:'row',
        // backgroundColor:'#00A4F6',
    },
  
    content:{
        flex:1,
        backgroundColor:'white',
        padding:5,
        paddingBottom:0
    }  
});

export default SurveyPage;