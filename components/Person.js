import React from 'react';
import { StyleSheet, Text } from 'react-native';
export default class Person extends React.Component {
    constructor (props){
        super(props);
        this.state = { name : "" };
    }
    render() {
        return (
        <Text onPress={() => this.setState({ name: "Yaksin" }) }>My name is {this.state.name}</Text>
        );
    }
}