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

  api = new NewsService();

  state = { 
    data: null,
    categories: ['business', 'entertainment'],
    isRead: [
      "Trump faces complicated calculus in deciding whether to slap new tariffs on Chinese goods - CNBC",
      "Uber's sex assault scandal is set to wipe $1 billion from the stock (UBER) - Business Insider",
      "‘Fiscal dysfunction’ may lead to 10% pullbacks next year—and also some good opportunities, fund manager says - MarketWatch"
    ]
  };

  async componentDidMount() {
    let data = await this.api.getNewsByCategories(this.state.categories);
    data = data.filter(({title}) => !this.state.isRead.includes(title))
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