import React, { Component } from "react";
import { View, Text } from "react-native";

class DetailScreen extends Component {
  static navigationOptions = () => {
    return {
      title: 'Detail',
    }
  }

  render() {
    return (
      <View>
        <Text>Detail</Text>
      </View>
    );
  }
}

export default DetailScreen;