import React from 'react';

import {  AsyncStorage } from 'react-native';
import Config from '../../app/Config';
import Store from '../../app/Store';
import Session from '../../app/Session';
import Helper from '../../app/Helper';
const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

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
            end_date_text : '',

            datepicker_key:''
        }; 

	

    onChangeDate = (selectedDate) => {
        // this.setState({
        //     showDatepicker :  false
        // });

        if(this.state.datepicker_key == 'start_date'){
            this.setState({
                start_date_text :  Helper.mysqlDate(selectedDate)
            });

        }
        if(this.state.datepicker_key == 'end_date'){
            this.setState({
                end_date_text : Helper.mysqlDate(selectedDate)
            });
        }
        
        setTimeout(()=>{
            // this.refreshData();
        },100);
    };

    showDatepicker = () => {
        setDatePickerVisibility(true);
    };

    hideDatepicker = () => {
        setDatePickerVisibility(false);
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
    initStatistic = (user_id) =>{
        this.setState({spinner:true});

        Store.LoginService.getFullProfile(user_id,(res)=>{
            this.setState({
                prospek : res.data.am.prospek,
                survey : res.data.am.survey,
                pelanggan : res.data.am.pelanggan,
                batal : res.data.am.batal,
                photoUrl :res.data.thumb,

                user_email : res.data.am.email == 'n/a' ? res.data.am.nip_nik : res.data.email
            });

            Session.setUserData('full_profile',res.data);
            
            this.setState({ spinner:false });
        },(error)=>{
            this.setState({ spinner:false });       
        });
    };
    getStatisticData = (user_id,statisticOnly)=>{

        if(!statisticOnly){
            Session.userData('full_profile',(data)=>{
                try{
                    this.setState({
                        prospek : data.am.prospek,
                        survey : data.am.survey,
                        pelanggan : data.am.pelanggan,
                        batal : data.am.batal,
                        photoUrl : data.thumb,

                        user_email : data.am.email == 'n/a' ? data.am.nip_nik : data.email
                    });
                }catch(e){
                    console.log(e);
                    this.initStatistic(user_id);
                }
                

                    
            },(error) => {

                this.initStatistic(user_id);
            });
            
        }else{

        }
        


    }
    isDatePickerVisible=()=>{
        return isDatePickerVisible;
    }
    refreshData = () =>{

        Session.getAccount((account)=>{
            this.setState({
                user_email : account.email == '0' ? '' : account.email,
                user_display_name : account.nama_lengkap
            });
            if(this.state.start_date_text != '' && this.state.end_date_text != ''){
                this.getStatisticData(account.user_id);
            }else{
                Store.Pelanggan.getMinMaxDate(account.user_id,(res)=>{
                    if(res.data != null){
                        console.log(res.data);
                        this.setState({
                            start_date_text : res.data.min_date,
                            end_date_text : res.data.max_date,
                        });
                        this.getStatisticData(account.user_id,false);
                    }
                });
            }
            
            


        },(error)=>{}); 
    }
}

export default DashboardAction;
