import React from 'react';
import { View,StyleSheet, Text, Image, TouchableHighlight } from 'react-native';
// import Config from './Config';

class BottomNavigation extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            iconDashboardPage : require('../../assets/icon/icon-home-gray.png'),
            iconDashboardPageActive : require('../../assets/icon/icon-home-blue.png'),
    
            iconSurveyPage : require('../../assets/icon/icon-calendar-gray.png'),
            iconSurveyPageActive : require('../../assets/icon/icon-calendar-blue.png'),
    
            iconTransaksiPage : require('../../assets/icon/icon-transaksi-gray.png'),
            iconTransaksiPageActive : require('../../assets/icon/icon-transaksi-blue.png'),
    
            iconLaporanPage : require('../../assets/icon/icon-laporan-gray.png'),
            iconLaporanPageActive : require('../../assets/icon/icon-laporan-blue.png'),
    
            iconProfilePage : require('../../assets/icon/icon-profile-gray.png'),
            iconProfilePageActive : require('../../assets/icon/icon-profile-blue.png'),

            menuItems:[
                {id:1,caption:'Dashboard',menuName:'DashboardPage'},
                {id:2,caption:'Survey',menuName:'SurveyPage'},
                {id:3,caption:'Transaksi',menuName:'TransaksiPage'},
                {id:4,caption:'Laporan',menuName:'LaporanPage'},
                {id:5,caption:'Profil',menuName:'ProfilePage'}
            ]
        };
    }

    setIcon = (menuName) => {
        return this.props.activeMenu === menuName ? this.state[`icon${menuName}Active`] : this.state[`icon${menuName}`];
    } 
    setNavTextStyle = (menuName) => {
        let styleColor = this.props.activeMenu === menuName ? '#009EEE':'#CACACC';
        return {color : styleColor};
    }
    navigate = (menuName) => {
        if(this.props.activeMenu !== menuName){
            this.props.navigation.navigate(menuName);
        }
    }
    render(){ 
       
        let menuItems = this.state.menuItems.map((a,i)=>{
            let caption = a.caption;
            let menuName = a.menuName;
         
            return(
                <View style={styles.tabItem} key={i}>
                    <TouchableHighlight underlayColor='transparent' onPress={()=>{this.navigate(menuName)}}  style={styles.touchX}>
                        <View style={styles.tabWrp}>
                            <Image style={styles.tabIcon} source={this.setIcon(menuName)}/>
                            <Text style={this.setNavTextStyle(menuName)}>{caption}</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            )
        });
        return (
            <View style={styles.tabContainer}>
                {menuItems}
            </View> 
        )
    }
    
}
const styles = StyleSheet.create({
    boxItem:{
        // flex:1,
    },
    tabWrp:{
        marginHorizontal:5,
        alignItems:'center'
    },
    tabIcon:{
        width:18,
        height:18
    },
    tabContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        bottom:0
    },
    tabItem:{ },
    touchX:{
        marginHorizontal:5,
        marginVertical:10
    }
});
export default BottomNavigation;