import React, { Component } from "react";
import { View, Text } from "react-native";

class SettingsScreen extends Component {
  static navigationOptions = () => {
    return {
      title: 'Settings',
    }
  }

  render() {
    return (
      <View>
        <Text>Settings</Text>
      </View>
    );
  }
}

export default SettingsScreen;