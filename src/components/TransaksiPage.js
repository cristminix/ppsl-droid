import React from 'react';
import { View,StyleSheet, Text, Image, TouchableHighlight, TextInput, KeyboardAvoidingView ,SafeAreaView, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import Spinner from 'react-native-loading-spinner-overlay';
import BottomNavigation from './BottomNavigation';
import { LinearGradient } from 'expo-linear-gradient';
import Helper from '../app/Helper';
import { NavigationEvents } from '@react-navigation/compat';
import { Dropdown } from 'react-native-material-dropdown';
 
class TransaksiPage extends React.Component {
    goBack=()=>{
        this.props.navigation.navigate('DashboardPage');
    };
    state = {
        spinner:false,
        ddlSelectedValue:'prospek'
    };
    onRefresh = () =>{

    }
    addPelanggan = () =>{

    }
    setSelectedStateValue = (ddlValue) =>{
        this.setState({
            ddlSelectedValue:ddlValue
        });
        console.log('ddlValue: ' + ddlValue)
    }
    pickDropdown = ()=>{

    }
    render(){
        const { navigation } = this.props;
        let icons = {
            back :  require('../../assets/icon/chevron-left.png') ,
            plus :  require('../../assets/icon/icon-plus-white.png') ,
            down  :require('../../assets/icon/icon-chevron-down-blue.png')
        };
        let statusPelanggan = [{
            label: 'Prospek',
            value: 'prospek'
        }, {
            label: 'Survey',
            value: 'survey'
        }, {
            label: 'Pelanggan',
            value: 'pelanggan'
        },
            {
            label: 'Batal',
            value: 'batal'
        }];

        return (
            <KeyboardAvoidingView style={styles.wrapper} behavior={Platform.OS === "ios" ? "padding" : null}>
                <Spinner visible={this.state.spinner} textContent={''} textStyle={styles.spinnerTextStyle}/>
                <NavigationEvents onWillFocus={payload => this.onRefresh()} />
                <View>
                <LinearGradient colors={['#009EEE', '#00A4F6']} start={[0.0, 0.101]} style={[{paddingVertical:20},styles.headerGradient]}>

                    <View style={{paddingHorizontal:10,paddingVertical:0}}>
                    <TouchableHighlight underlayColor='transparent' onPress={()=>{this.goBack()}} >
                        <Image style={{width:22}} source={icons.back}/>
                    </TouchableHighlight>
                    </View>
                    <View style={{flex:1,alignItems:'center',paddingVertical:0}}>
                        <Text style={{color:'#ffffff',fontSize:14,marginLeft:-22,marginTop:-20}}>Daftar Pelanggan</Text>
                    </View>
                    <View style={{paddingHorizontal:10,paddingVertical:0, marginTop:20,position:'absolute',right:10}}>
                    <TouchableHighlight underlayColor='transparent' onPress={()=>{this.addPelanggan()}} >
                        <Image style={{width:22}} source={icons.plus}/>
                    </TouchableHighlight>
                    </View>
                    </LinearGradient>
                </View>
                    <SafeAreaView style={styles.content}>
                    <ScrollView style={{padding:10}}>
                        <View style={{paddingHorizontal:10,paddingVertical:0, top:35,position:'absolute',right:10}}>
                        <TouchableHighlight underlayColor='transparent' onPress={()=>{this.pickDropdown()}} >
                            <Image style={{width:22}} source={icons.down}/>
                        </TouchableHighlight>
                        </View>
                        <Dropdown data={statusPelanggan} value={this.state.ddlSelectedValue} style={{color:'#007EFF',fontWeight:'bold',zIndex:1000}}
                                  fontSize={20} itemColor={'#007EFF'} useNativeDriver={true} 
                                  containerStyle={{borderWidth:1,borderColor:'#007EFF',borderRadius:10, paddingHorizontal:20, height:70}}
                                  baseColor={'transparent'}
                                  itemTextStyle={{color:'red'}}
                                  onChangeText={(value,index,data)=>this.setSelectedStateValue(value)} />
                        
                        
                    </ScrollView>
                    </SafeAreaView>
                 <BottomNavigation activeMenu="TransaksiPage" navigation={navigation}/>

                    </KeyboardAvoidingView>    
        );
    }
}
const styles = StyleSheet.create({
    dd:{borderWidth:1,borderColor:'#007EFF',color:'#007EFF',borderRadius:5,fontSize:20,fontWeight:'bold',paddingLeft:10},
    imagePreview:{
        width:100,
        height:100,
        marginBottom:5
    },
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
        padding:20
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
        flex:1,
        color:'#36227C',
        fontWeight:'bold',
        fontSize:20
    },
    logo:{
        flex:2,
        resizeMode:'contain',
        marginTop:10
    },
    content:{
        flex:2,
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

export default TransaksiPage;