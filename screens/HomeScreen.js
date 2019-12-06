import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import NewsService from "../services/NewsService";

class HomeScreen extends Component {
  static navigationOptions = () => {
    return {
      title: 'Home',
    }
  }

  api = new NewsService();

  async componentDidMount() {
    let res = await this.api.getNewsByCategories(['business', 'entertainment']);
    console.log(res);
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