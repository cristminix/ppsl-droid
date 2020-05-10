import React from 'react';
import { View,StyleSheet, Text, Image, TouchableHighlight, TextInput, KeyboardAvoidingView ,SafeAreaView, ScrollView,Button} from 'react-native';
import Constants from 'expo-constants';
import Spinner from 'react-native-loading-spinner-overlay';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
class DashboardPage extends React.Component {
    goBack=()=>{
        // this.props.navigation.navigate('LoginPage');
    };
    state = {
        tabItemTextStyle:{color:'#CACACC'},
        spinner:false,
        user_display_name:'Hari Nugraha',
        user_email:'nugrahahari@gmail.com',
        date:new Date(1598051730000),
        mode:'',
        loaderWidth:0,
        _boxStyle:{height:300}
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
    // console.warn(x);
    // console.warn(y);
    // console.warn(width);
    // console.warn(height);

    this.setState({_boxStyle:{marginHorizontal:5,height:height/2.2}})
  }
    render(){
        let show=false;
        return (
            <KeyboardAvoidingView style={styles.wrapper} behavior='padding'>
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
                
                <View style={[styles.header,{paddingVertical:10,paddingHorizontal:10}]}>
                        <Text style={{color:'#ffffff',fontSize:20,fontWeight:'bold'}}>{'Selamat Datang,'}</Text>

                        <TouchableHighlight style={[{marginHorizontal:10,marginVertical:10}]} onPress={()=>{this.goBack()}} >
                            <Image style={styles.photoProfile} source={ require('../../assets/icon/profile_user.png') }/>
                        </TouchableHighlight>
                        <Text style={{color:'#ffffff',fontSize:14,fontWeight:'bold'}}>{this.state.user_display_name}</Text>
                        <Text style={{color:'#ffffff',fontSize:14}}>{this.state.user_email}</Text>


                </View>
                <View style={[styles.periodes,{}]}>

                        <View style={{backgroundColor:'#F8F7FC',borderRadius:5, flexDirection:'row'}}>
                            <Image style={styles.iconCalendar} source={ require('../../assets/icon/icon-calendar.png') }/>
                            <Text  style={[{paddingHorizontal:10,paddingVertical:10}]}>08/06/2020</Text>
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
                    <ScrollView>
                        <View style={[styles.statistic,{flex:1,flexDirection:'column'}]}>
                            <View style={[styles.boxItem,{flexDirection:'row',margin:10}]}>
                                  <LinearGradient
                                      colors={['#FFC583', '#FAA871']}
                                      style={[{ padding: 15, borderRadius: 10 ,flex:1},this.state._boxStyle]}>
                                      <Text
                                        style={{
                                          backgroundColor: 'transparent',
                                          fontSize: 40,
                                          fontWeight:'bold',
                                          paddingTop:30,
                                          color: '#fff',
                                        }}>
                                        30
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
                                      style={[{ padding: 15, borderRadius: 10 ,flex:1},this.state._boxStyle]}>
                                      <Text
                                        style={{
                                          backgroundColor: 'transparent',
                                          fontSize: 40,
                                          fontWeight:'bold',
                                          paddingTop:30,
                                          color: '#fff',
                                        }}>
                                       10
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
                                      style={[{ padding: 15, borderRadius: 10 ,flex:1},this.state._boxStyle]}>
                                      <Text
                                        style={{
                                          backgroundColor: 'transparent',
                                          fontSize: 40,
                                          fontWeight:'bold',
                                          paddingTop:30,
                                          color: '#fff',
                                        }}>
                                        30
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
                                      colors={['#FE9797', '#FF7070']}
                                      style={[{ padding: 15, borderRadius: 10 ,flex:1},this.state._boxStyle]}>
                                      <Text
                                        style={{
                                          backgroundColor: 'transparent',
                                          fontSize: 40,
                                          fontWeight:'bold',
                                          paddingTop:30,
                                          color: '#fff',
                                        }}>
                                       10
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
                        </View>
                        
                    </ScrollView>
                </SafeAreaView>
                <View style={styles.tabContainer}>
                            <View style={styles.tabItem}>
                                <TouchableHighlight style={[{marginHorizontal:10,marginVertical:10}]}>
                                    <View style={styles.tabWrp}>
                                        <Image style={styles.tabIcon} source={ require('../../assets/icon/icon-home-gray.png') }/>
                                        <Text style={this.state.tabItemTextStyle}>Beranda</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                            <View style={styles.tabItem}>
                                <TouchableHighlight style={[{marginHorizontal:10,marginVertical:10}]}>
                                    <View style={styles.tabWrp}>
                                        <Image Transaks={styles.tabIcon} source={ require('../../assets/icon/icon-transaksi-gray.png') }/>
                                        <Text style={this.state.tabItemTextStyle}>Transaksi</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                            <View style={styles.tabItem}>
                                <TouchableHighlight style={[{marginHorizontal:10,marginVertical:10}]}>
                                    <View style={styles.tabWrp}>
                                        <Image style={styles.tabIcon} source={ require('../../assets/icon/icon-laporan-gray.png') }/>
                                        <Text style={this.state.tabItemTextStyle}>Laporan</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                            <View style={styles.tabItem}>
                                <TouchableHighlight style={[{marginHorizontal:10,marginVertical:10}]}>
                                    <View style={styles.tabWrp}>
                                        <Image style={styles.tabIcon} source={ require('../../assets/icon/icon-profile-gray.png') }/>
                                        <Text style={this.state.tabItemTextStyle}>Profile</Text>

                                    </View>
                                </TouchableHighlight>
                            </View>
                </View> 

            </KeyboardAvoidingView>    
        );
    }
}
const styles = StyleSheet.create({
    statistic:{
        flex:1
    },
    boxItem:{
        flex:1
    },
    tabItem:{

    },
    tabWrp:{
        alignItems:'center'
    },
    tabIcon:{
        width:25,
        height:25
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
    content:{
        flex:1,
        backgroundColor:'white',
        padding:0
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

export default DashboardPage;