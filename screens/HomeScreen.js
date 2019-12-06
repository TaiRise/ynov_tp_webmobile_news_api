import React, { Component } from "react";
import { View, Text, Button } from "react-native";

class HomeScreen extends Component {
  static navigationOptions = () => {
    return {
      title: 'Home',
    }
  }
  
  render() {
    return (
      <View>
        <Text>Home</Text>
        <Button onPress={() => this.props.navigation.navigate('Detail')} title="Detail" />
      </View>
    );
  }
}

export default HomeScreen;