import React from 'react';

import {  AsyncStorage } from 'react-native';
import Config from '../../app/Config';
import Store from '../../app/Store';
import Session from '../../app/Session';
import Helper from '../../app/Helper';


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
            
            photoUrl : 'https://ppsl.perumdamtkr.com/themes/metronic/assets/pages/media/profile/profile_user.png',
            refreshing : false,
            
            // Select Date
            start_date : null,
            end_date : null,

            start_date_text : '',
            end_date_text : '',

            datepicker_key:'',

            datepicker_shown:false
        }; 

	pickDate = (what) =>{
        console.log('pickDate')
        let jsDate = new Date();
        if(what=='start_date'){
            let dateParts = this.state.start_date_text.split("-");
            jsDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2].substr(0,2));
        }
        if(what=='end_date'){
            let dateParts = this.state.end_date_text.split("-");
            jsDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2].substr(0,2));
        }
        this.setState({
            date: jsDate,
            datepicker_key: what,
            datepicker_shown: true
        });
        
    }

    onChangeDate = (selectedDate) => {
        this.setState({
            datepicker_shown :  false
        });

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
            this.refreshData();
        },1000);
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

        Store.LoginService.getProfile(user_id,(res)=>{
            console.log(res)
            let statistic = res.data.statistic;
            let profile = res.data.profile;

            this.setState({
                prospek : statistic.prospek,
                survey : statistic.survey,
                pelanggan : statistic.pelanggan,
                batal : statistic.batal,
                        
                user_display_name : profile.nama_lengkap,
                photoUrl :profile.photo_thumb_url,
                user_email : profile.email == '' ? profile.nip_nik : profile.email
            });

            Session.setUserData('profile',profile);
            Session.setUserData('statistic',statistic);
            Config.DashboardPage.mustUpdateProfile = false;
            this.setState({ spinner:false });
        },(error)=>{
            this.setState({ spinner:false });       
        });
    };
    getStatisticData = (user_id,statisticOnly)=>{

        if(!statisticOnly){
            Session.userData('profile',(profile)=>{
              

                if(profile == null){
                    this.initStatistic(user_id);
                }else{
                    this.setState({
                        user_display_name : profile.nama_lengkap,
                        photoUrl :profile.photo_thumb_url,
                        user_email : profile.email == '' ? profile.nip_nik : profile.email
                    });
                    Session.userData('statistic',(statistic)=>{
                        if(typeof statistic == 'object'){
                            this.setState({
                                prospek : statistic.prospek,
                                survey : statistic.survey,
                                pelanggan : statistic.pelanggan,
                                batal : statistic.batal,
                            });  
                        }
                         
                    },(error) => {});
                }
            },(error) => {});

            

        }else{
            if(Config.DashboardPage.mustUpdateProfile){
                this.initStatistic(user_id);
           }else{
                Session.userData('profile',(profile)=>{
              

                if(profile !=  null){
                 
                    this.setState({
                        user_display_name : profile.nama_lengkap,
                        photoUrl :profile.photo_thumb_url,
                        user_email : profile.email == '' ? profile.nip_nik : profile.email
                    });            
                } });      
                let start_date = this.state.start_date_text;
                let end_date = this.state.end_date_text;
                this.setState({spinner:true});
                Store.Pelanggan.getStatisticData(user_id, start_date, end_date,(res)=>{
                    let statistic = res.data.statistic;
                    this.setState({
                        prospek : statistic.prospek,
                        survey : statistic.survey,
                        pelanggan : statistic.pelanggan,
                        batal : statistic.batal,
                    });
                     
                    this.setState({ spinner:false });
                },(error)=>{
                    this.setState({ spinner:false });       
                });
            }
        }
        


    }
    refreshData = () =>{
        this.setState({datepicker_shown:false});
        Session.getAccount((account)=>{
            this.setState({
                user_email : account.email == '0' ? '' : account.email,
                user_display_name : account.nama_lengkap
            });
            if(this.state.start_date_text != '' && this.state.end_date_text != ''){
                this.getStatisticData(account.user_id,true);
            }else{
                Store.Pelanggan.getMinMaxDate(account.user_id,(res)=>{
                    if(res.data != null){
                        console.log(res.data);
                        this.setState({
                            start_date_text : res.data.min_date,
                            end_date_text : res.data.max_date,
                        });
                        if(Config.DashboardPage.mustUpdateProfile){
                            this.initStatistic(account.user_id);
                        }else{
                            this.getStatisticData(account.user_id, false);
                        }
                        
                    }
                });
            }
            
            


        },(error)=>{}); 
    }
}

export default DashboardAction;
