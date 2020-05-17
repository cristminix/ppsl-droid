import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Animated,
    Image,
    Easing
  } from 'react-native'

  class Anime extends React.Component{
    constructor () {
        super()
        this.spinValue = new Animated.Value(0)
      }
      componentDidMount () {
        this.spin()
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
          <View style={styles.container}>
            <Animated.Image
              style={{
                width: 100,
                height: 100,
                transform: [{rotate: spin}] }}
                source={require('../../assets/logo.png')}
            />
          </View>
        )
    }  
  }
  const styles = StyleSheet.create({
      container:{
          paddingVertical:50,
          flex:1,
          justifyContent:'center',
          alignItems:"center"
      }
  });
  export default Anime;