import React from 'react';
import { View,StyleSheet, Text, Image, TouchableHighlight, NetInfo } from 'react-native';
import Constants from 'expo-constants';

class OfflineNotice extends React.Component{
    state = {
        isConnected: true
    };

    handleConnectivityChange = (isConnected) => {
        this.setState({ isConnected });
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    render() {
        if (!this.state.isConnected) {
          return <MiniOfflineSign />;
        }
        return null;
    }
}

export default OfflineNotice;