import React from 'react';
import { View,StyleSheet, Text, Image, TouchableHighlight } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

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
        console.log(menuName)
        // const { navigation } = this.props;
        // const navigation = useNavigation();
        if(this.props.activeMenu !== menuName){
            this.props.navigation.navigate(menuName);
        }
    }
    render(){ 
        return (
            <View style={styles.tabContainer}>
                <View style={styles.tabItem}>
                    <TouchableHighlight underlayColor='transparent' onPress={()=>{this.navigate('DashboardPage')}}  style={styles.touchX}>
                        <View style={styles.tabWrp}>
                            <Image style={styles.tabIcon} source={this.setIcon('DashboardPage')}/>
                            <Text style={this.setNavTextStyle('DashboardPage')}>Beranda</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={styles.tabItem}>
                    <TouchableHighlight underlayColor='transparent' onPress={()=>{this.navigate('SurveyPage')}}  style={styles.touchX}>
                        <View style={styles.tabWrp}>
                            <Image style={styles.tabIcon} source={this.setIcon('SurveyPage')}/>
                            <Text style={this.setNavTextStyle('SurveyPage')}>Survey</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={styles.tabItem}>
                    <TouchableHighlight underlayColor='transparent'  onPress={()=>{this.navigate('TransaksiPage')}} style={styles.touchX}>
                        <View style={styles.tabWrp}>
                            <Image Transaks={styles.tabIcon} source={this.setIcon('TransaksiPage')}/>
                            <Text style={this.setNavTextStyle('TransaksiPage')}>Transaksi</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={styles.tabItem}>
                    <TouchableHighlight underlayColor='transparent'  onPress={()=>{this.navigate('LaporanPage')}} style={styles.touchX}>
                        <View style={styles.tabWrp}>
                            <Image style={styles.tabIcon} source={this.setIcon('LaporanPage')}/>
                            <Text style={this.setNavTextStyle('LaporanPage')}>Laporan</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={styles.tabItem}>
                    <TouchableHighlight  underlayColor='transparent' onPress={()=>{this.navigate('ProfilePage')}} style={styles.touchX}>
                        <View style={styles.tabWrp}>
                            <Image style={styles.tabIcon} source={this.setIcon('ProfilePage')}/>
                            <Text style={this.setNavTextStyle('ProfilePage')}>Profile</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View> 
        )
    }
    
}
const styles = StyleSheet.create({
    boxItem:{
        flex:1,
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
        margin:10
    }
});
export default BottomNavigation;