import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import NewsService from "../services/NewsService";

class HomeScreen extends Component {
  static navigationOptions = () => {
    return {
      title: 'Home',
    }
  }

  state = { 
    data: null,
    categories: []
  };
  api = new NewsService();

  async componentDidMount() {
    let data = await this.api.getNewsByCategories(this.categories);
    this.setData({ data })
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