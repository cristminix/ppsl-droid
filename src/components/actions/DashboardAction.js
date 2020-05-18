import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {  AsyncStorage } from 'react-native';
import Config from '../../app/Config';
import Store from '../../app/Store';
import Session from '../../app/Session';

class DashboardAction extends React.Component{
	state = {
        spinner : false,

        user_display_name : '',
        user_email : '',
        
        date : new Date(),
        mode : 'date',
        
        loaderWidth : 0,
        _boxStyle : {height:300},
        
        text : '',
        
        // statisticVal
        prospek : 0,
        survey : 0,
        pelanggan : 0,
        batal : 0,
        
        photoUrl : '../../assets/logo.png',
        refreshing : false,
        
        // Select Date
        start_date : null,
        end_date : null,

        start_date_text : '',
        end_date_text : ''
    }; 

    onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };
    
    showDatepicker = () => {
        showMode('date');
    };

    showTimepicker = () => {
        showMode('time');
    };

    find_dimesions(layout){
        const {x, y, width, height} = layout;
        this.setState({_boxStyle:{marginHorizontal:5,height:height/2.4}});
    }
    
    gotoNotif=()=>{
      
    }
    
    onRefresh = ()=>{
        // this.setState({refreshing:true})
        this.refreshData();
        console.log('refreshing')
    }
    
    refreshData = () =>{
        Session.getAccount((account)=>{
            this.setState({
                user_email : account.email == '0' ? '' : account.email,
                user_display_name : account.nama_lengkap
            });
            this.setState({spinner:true});
            Store.LoginService.getFullProfile(account.user_id,(res)=>{
                this.setState({
                    prospek : res.data.am.prospek,
                    survey : res.data.am.survey,
                    pelanggan : res.data.am.pelanggan,
                    batal : res.data.am.batal,
                    photoUrl :res.data.thumb,

                    user_email : res.data.am.email == 'n/a' ? res.data.am.nip_nik : res.data.email
                });
                AsyncStorage.setItem('full_profile', JSON.stringify(res.data));
                
                this.setState({ spinner:false });
            },(error)=>{
                this.setState({ spinner:false });       
            });
            
        },(error)=>{}); 
    }
}

export default DashboardAction;
