import React from 'react';
import {  Animated,
    Image,StyleSheet,
    Easing,AsyncStorage,View, Text} from 'react-native';
import Constants from 'expo-constants';
import { NavigationEvents } from '@react-navigation/compat';
import { LinearGradient } from 'expo-linear-gradient';

class EntryPoint extends React.Component {
   
    

    constructor () {
        super()
        this.spinValue = new Animated.Value(0);
        this.state = {
            text:'',
            account:null
        };
      }
      componentDidMount () {
        this.spin();
      }
      spin () {
        this.spinValue.setValue(0)
        Animated.timing(
          this.spinValue,
          {
            toValue: 1,
            duration: 2500,
            easing: Easing.linear
          }
        ).start(() => this.spin())
      }
      
      render () {
        const spin = this.spinValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg']
        })
        return (
          <View style={[styles.container,{ alignItems:'stretch'}]}>
                                     
            
            <View style={{flex:1,alignItems:'center'}}>
            <Image
              style={{
               marginTop:200,   
                width: 100,
                height: 81,
                  }}
                source={require('../../assets/logo.png')}
            />
                <NavigationEvents onWillFocus={payload => this.refreshData()} />
                <Text style={{flex:1,textAlign:'center',color:'#240E6F',fontWeight:'bold'}}>{this.state.text}</Text>
            </View>  
            
          </View>
        )
    }
    refreshData = ()=>{
        let text = '';
        this.setState({account:null});

        AsyncStorage.getItem('account', (error, result) => {
            if (result) {
                let data = JSON.parse(result);
                this.setState({account:data})
            }

            this.setState({text:text});
            // text =`\nSebentar lagi\n` ;
            let account = this.state.account;
            let gotopage='LoginPage';
            text += `\nPPSL PERUMDAM TKR\nPendataan Potensi Sambungan Langganan\n`;
            if(typeof account == 'object' && account != null){
                
                setTimeout(()=>{ 
                    text += `\ Oke\n`;
                },1000);
                

                gotopage='DashboardPage';
            }else{
               
                
            }
            setTimeout(()=>{ 
                this.props.navigation.navigate(gotopage);
            },1000);
           
            this.setState({text:text});
        });

    }

}
const styles = StyleSheet.create({
    container:{
      
       
        marginTop: Constants.statusBarHeight,
        flex:1,
        justifyContent:'center',
        alignItems:"center",
        backgroundColor:'#fff'
    }
});

export default EntryPoint;