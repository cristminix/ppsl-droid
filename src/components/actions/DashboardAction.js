import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {  AsyncStorage } from 'react-native';
class DashboardAction extends React.Component{
	state = {
        
        spinner:false,
        user_display_name:'',
        user_email:'',
        date:new Date(),
        mode:'date',
        loaderWidth:0,
        _boxStyle:{height:300},
        text:'',
        prospek:0,
        survey:0,
        pelanggan:0,
        batal:0,
        photoUrl:'../../assets/logo.png',
        refreshing:false
    };
	goBack=()=>{
        // this.props.navigation.navigate('LoginPage');
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
  measureSize = (nativeEvent) => {
    // this.setState({ loaderWidth: nativeEvent.layout.width });
  };
  find_dimesions(layout){
    const {x, y, width, height} = layout;


    this.setState({_boxStyle:{marginHorizontal:5,height:height/2.4}});



  }
  gotoNotif=()=>{
      
  }
  onProfile = ()=>{
    this.props.navigation.navigate('ProfilePage')
    
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
    refreshData = () =>{
        AsyncStorage.getItem('account', (error, result) => {
    if (result) {
            let text ='Checking AsyncStorage' + "\n";
   
            
            let account = JSON.parse(result);
            // console.log(account); 
            this.setState({
                user_email:account.email=='0'?'':account.email,
                user_display_name: account.nama_lengkap
            });
            // console.log('get full profile');

            // show spinner
            // this.setState({spinner:true});
            var formData = new FormData();
            formData.append('user_id', account.user_id);

           ///////////////
            fetch('https://api-ppsl.perumdamtkr.com/loginService/getFullProfile/'+account.user_id, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                    
                    'X-API-KEY' : '9c05c647d185d704fa3b5add357dd08777d05b99', 
                    'X-APP-ID' : 'ppsl-droid'
                },
                body: formData
            })

            .then((response) =>{ 
                // console.log(response)
                response.json().then((res) => {

                    if(res.data !== null){
                        // SAVE LOGIN INFO TO ASYNC STORAGE
                        // console.log(res.data);
                        this.setState({
                            prospek: res.data.am.prospek,
                            survey: res.data.am.survey,
                            pelanggan: res.data.am.pelanggan,
                            batal: res.data.am.batal,
                            photoUrl:res.data.thumb,

                            user_email:res.data.am.email=='n/a'?res.data.am.nip_nik:res.data.email
                        });
                        AsyncStorage.setItem('full_profile', JSON.stringify(res.data));

                         ////////////////////////////////////////////////////
                         // Lazy Loading	
                          // let urlOfImages = [res.data.thumb]

                          // let preFetchTasks = []; 

                          // urlOfImages.forEach((p)=>{
                          //     preFetchTasks.push(Image.prefetch(p));
                          // });

                          // Promise.all(preFetchTasks).then((results)=>{
                          //     let downloadedAll = true;
                          //     results.forEach((result)=>{
                          //         if(!result){
                          //             //error occurred downloading a pic
                          //             downloadedAll = false;
                          //         }
                          //     })

                          //     if(downloadedAll){
                          //         this.setState({ photoUrl: urlOfImages[0]})

                          //     }
                          // })







                         //////////////////////////////////////////////////////////// 
                        // Redirect to home page
                    }else{
                        // Disalay login error message
                        this._loginError(true);
                    }

                this.setState({ spinner:false });

                })
            }
            )
            .catch((error) => {
                console.log(error)
                this.setState({ spinner:false });
            })
            .done();
           ///////////////
        }
    });
    }
}

export default DashboardAction;
