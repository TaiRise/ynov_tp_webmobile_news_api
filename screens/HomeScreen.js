import React, { Component } from "react";
import { View, FlatList } from "react-native";
import NewsService from "../services/NewsService";
import NewsItem from "../components/NewsItem";
import Loading from "../components/Loading";

class HomeScreen extends Component {
  static navigationOptions = () => {
    return {
      title: 'Home',
    }
  }

  state = { 
    data: null,
    categories: ['business', 'entertainment']
  };
  api = new NewsService();

  async componentDidMount() {
    let data = await this.api.getNewsByCategories(this.state.categories);
    this.setState({ data });
  }

  save = title => {
    console.log(title);
  }
  
  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.data ? (
          <FlatList data={this.state.data}
            keyExtractor={item => item.title}
            renderItem={({item}) => (
              <NewsItem 
                data={item}
                onSwipeRight={this.save} />
            )} />
        ) : (<Loading displayColor="red"/>)}
      </View>
    );
  }
}

export default HomeScreen;