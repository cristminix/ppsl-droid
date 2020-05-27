import React from 'react';
import { View,StyleSheet, Text, Image, TouchableHighlight, TextInput, KeyboardAvoidingView ,SafeAreaView, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import Spinner from 'react-native-loading-spinner-overlay';
import {Calendar, CalendarList, Agenda, LocaleConfig} from 'react-native-calendars';
import BottomNavigation from './BottomNavigation';
import { NavigationEvents } from '@react-navigation/compat';
import Config from '../app/Config';
import Helper from '../app/Helper';
import Store from '../app/Store';
import Session from '../app/Session';
LocaleConfig.locales['id'] = {
    monthNames: ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'],
    monthNamesShort: ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'],
    dayNames: ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'],
    dayNamesShort: ['Min','Sen','Sel','Rab','Kam','Jum','Sab'],
    today: 'Hari Ini'
};
LocaleConfig.defaultLocale = 'id';

class SurveyPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            spinner:false,
            bulan: null,
            tahun: null,
            user_id: null,
            dt: null,
   
            markingType:'period',
            marked:{},
            colorIndex:[
                'green','red','yellow','blue','pink','brown'
            ],
            items: {},
             selectedDate: null,
             refreshing:false,
             loadedDate:[],
             calendarOpened:false,
             firstTime:true,
             minDate:'2020-01-01',
             maxDate:'2020-12-31'
       };
    //    this.setState({
    //         agendaSelectedDate: Helper.getCurrentDateStr()
    //    });
    } 
    
    updateCalendar = (bulan, tahun) =>{
        console.log('updating calendar')
        // if(!this.state.calendarOpened){
        //     return;
        // }
        // let date = new Date();    
        // let defaultSelectedDate = Helper.mysqlDate(date);
        // let selectedDate = null;
        
        Store.Survey.getData(this.state.user_id, bulan, tahun, (res)=>{
            console.log(res);
            if(res.success){
                const marked = Object.assign({},this.state.marked);
                const items = Object.assign({},this.state.items);
                

                res.data.calendar.forEach((r,i) => {
                    // console.log(r,i);
                    const dateStrStart = Helper.getDateStr(r.tgl_rencana_survey);
                    const dateStrEnd = Helper.getDateStr(r.tgl_selesai_survey);
                    
                    // if(this.state.selectedDate == defaultSelectedDate && selectedDate == null){
                    //     selectedDate = dateStrStart;
            
                    // }
                    
                    marked[dateStrStart] = {marked: true,selected: true};// {startingDay: true, color: this.state.colorIndex[i]};
                    marked[dateStrEnd] =  {marked: true,selected: true};//{endingDay: true, color: this.state.colorIndex[i]};

                    items[dateStrStart] = [{nama_pelanggan: r.nama_pelanggan, nama_marketing: r.am_nama_lengkap, status: r.status}];
                    items[dateStrEnd] = [{nama_pelanggan: r.nama_pelanggan, nama_marketing: r.am_nama_lengkap, status: r.status}];
                });
                setTimeout(()=>{
                    this.setState({
                        items : items,
                        marked : marked
                    });

                    // if(this.state.selectedDate == defaultSelectedDate){
                    //     this.setState({
                    //         selectedDate : selectedDate
                    //     });
                    // }
                    
                },100);
            }
        });
    }
    onRefresh = () => {
        console.log('onRefresh');
        let dt = new Date();
        // let selectedDate = this.state.agendaSelectedDate;
        let minDate = dt.getFullYear() + '-01-01';
        let maxDate = dt.getFullYear() + '-12-31';


        Session.userData('profile',(profile)=>{
            let date = new Date();
            let bulan = date.getMonth()+1;
            let tahun = date.getFullYear();
            let user_id = profile.user_id;
            let selectedDate = Helper.mysqlDate(date);
            const items = {};
                items[selectedDate]=[];
            const marked = {};
                marked[selectedDate]={disabled:true};
            console.log(items,marked)
            this.setState({
                bulan: bulan,
                tahun: tahun,
                user_id: user_id,
                minDate: minDate,
                maxDate: maxDate,
                selectedDate: selectedDate,
                items: items,
                marked: marked 
            });

            this.updateCalendar(this.state.bulan, this.state.tahun);
        },(error)=>{});
    }
    onMonthChange = (month) =>{
        this.updateCalendar(month.month,month.year);
    }
    tryToUpdateCalendar = (month)=>{
        // Store.Survey.getData(this.state.user_id, month.month, month.year, (res)=>{
            // console.log(res);
        // },(error)=>{console.log(error)});
        this.updateCalendar(month.month, month.year);
    }
    render(){
        const { navigation } = this.props;
        
        
        return (
            <KeyboardAvoidingView style={styles.wrapper} behavior={Platform.OS === "ios" ? "padding" : null}>
                <View >
                    <NavigationEvents onWillFocus={payload => this.onRefresh()} />
                </View>
                <Spinner visible={this.state.spinner} textContent={''} textStyle={styles.spinnerTextStyle} /> 

                <View style={styles.content}>
                

                <Agenda
  // The list of items that have to be displayed in agenda. If you want to render item as empty date
  // the value of date key has to be an empty array []. If there exists no value for date key it is
  // considered that the date in question is not yet loaded
//   items={{
//     '2012-05-22': [{name: 'item 1 - any js object'}],
//     '2012-05-23': [{name: 'item 2 - any js object', height: 80}],
//     '2012-05-24': [],
//     '2012-05-25': [{name: 'item 3 - any js object'}, {name: 'any js object'}]
//   }}
  items={this.state.items}
  // Callback that gets called when items for a certain month should be loaded (month became visible)
  loadItemsForMonth={(month) => {this.tryToUpdateCalendar(month)}}
  // Callback that fires when the calendar is opened or closed
  onCalendarToggled={(calendarOpened) => {this.setState({calendarOpened})}}
  // Callback that gets called on day press
  onDayPress={(day)=>{console.log('day pressed')}}
  // Callback that gets called when day changes while scrolling agenda list
  onDayChange={(day)=>{console.log('day changed')}}
  // Initially selected day
  selected={this.state.selectedDate}
  // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
  minDate={this.state.minDate}
  // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
  maxDate={this.state.maxDate}
  // Max amount of months allowed to scroll to the past. Default = 50
  pastScrollRange={2}
  // Max amount of months allowed to scroll to the future. Default = 50
  futureScrollRange={2}
  // Specify how each item should be rendered in agenda
renderItem={(item, firstItemInDay) => { return (
<View style={{backgroundColor:item.status=='Terlaksana'?'green':'red',padding:10,marginTop:40,marginRight:5, borderRadius:10}}>
<Text style={{color:'white'}}>{item.nama_marketing} - {item.nama_pelanggan}</Text>
</View>
); }}
  // Specify how each date should be rendered. day can be undefined if the item is not first in that day.
//   renderDay={(day, item) => {
//       return (<View><Text style={{color:'green'}}>{JSON.stringify(day)}{JSON.stringify(item)}</Text></View>);
//   }}
  // Specify how empty date content with no items should be rendered
//   renderEmptyDate={() => {return (<View style={{height:200,width:200,backgroundColor:'yellow'}}></View>);}}
  // Specify how agenda knob should look like
//   renderKnob={() => {return (<View style={{height:200,height:300,backgroundColor:'red'}}></View>);}}
  // Specify what should be rendered instead of ActivityIndicator
  renderEmptyData = {() => {return (<View style={{}}></View>);}}
  // Specify your item comparison function for increased performance
  rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}
  // Hide knob button. Default = false
//   hideKnob={true}
  // By default, agenda dates are marked if they have at least one item, but you can override this if needed
//   markedDates={{
//     '2012-05-16': {selected: true, marked: true},
//     '2012-05-17': {marked: true},
//     '2012-05-18': {disabled: true}
//   }}
  markedDates={this.state.marked}
  // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
  disabledByDefault={true}
  // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
  onRefresh={() => console.log('refreshing...')}
  // Set this true while waiting for new data from a refresh
  refreshing={this.state.refreshing}
  // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
  refreshControl={null}
  // Agenda theme
  theme={{
   
    // agendaDayTextColor: 'yellow',
    // agendaDayNumColor: 'green',
    // agendaTodayColor: 'red',
    // agendaKnobColor: 'blue'
  }}
  // Agenda container style
  style={{}}
/>

                 </View>   
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