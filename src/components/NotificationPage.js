import React from 'react';
import { View,StyleSheet, Text, Image, TouchableHighlight, TextInput, KeyboardAvoidingView ,SafeAreaView, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import Spinner from 'react-native-loading-spinner-overlay';
import Session from '../app/Session';
import Store from '../app/Store';

class NotificationPage extends React.Component {
    goBack=()=>{
        this.props.navigation.navigate('DashboardPage');
    };
    state = {
        spinner:false,
        user_id: null,
        page: 1,
        pager: null
    };

    updateListData(data)=>{

    }
    loadNotification = () =>{
        Store.Notification.getList(this.state.user_id, this.page, (res)=>{
            // const data = res.data;
            console.log(res)
        },(err)=>{
            console.log(err)
        })
    }
    onRefresh = ()=>{
        Session.get('profile',(profile)=>{
            if(profile != null){
                this.setState({user_id:profile.user_id});

                setTimeout(()=>{
                    this.loadNotification(;)
                },100);
            }
        })
    }
    render(){
        return (
            <KeyboardAvoidingView style={styles.wrapper} behavior={Platform.OS === "ios" ? "padding" : null}>
                
                <Spinner visible={this.state.spinner} textContent={'Loading...'} textStyle={styles.spinnerTextStyle}/>
                <NavigationEvents onWillFocus={payload => this.onRefresh()} />
                <View>
                <LinearGradient colors={['#009EEE', '#00A4F6']} start={[0.0, 0.101]} style={[{paddingVertical:20},styles.headerGradient]}>

                    <View style={{paddingHorizontal:10,paddingVertical:0}}>
                    <TouchableHighlight underlayColor='transparent' onPress={()=>{this.goBack()}} >
                        <Image style={{width:22}} source={icons.back}/>
                    </TouchableHighlight>
                    </View>
                    <View style={{flex:1,alignItems:'center',paddingVertical:0}}>
                        <Text style={{color:'#ffffff',fontSize:14,marginLeft:-22,marginTop:-20}}>Notifikasi</Text>
                    </View>
                    </LinearGradient>
                </View>
                    <SafeAreaView style={styles.content}>
                    <ScrollView style={{padding:0}}>
                    
                        
                    </ScrollView>
                    </SafeAreaView>

                    </KeyboardAvoidingView>    
        );
    }
}
const styles = StyleSheet.create({
    
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
        padding:20,
        paddingBottom:0
    }
    }    
});

export default NotificationPage;