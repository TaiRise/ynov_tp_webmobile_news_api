import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { getStorageReadedArticles, setStorageReadedArticles } from '../redux/actions/articlesActions';
import { getStorageSelectedCategories } from '../redux/actions/categoriesActions';
import NewsService from '../services/NewsService';
import NewsItem from '../components/NewsItem';
import Loading from '../components/Loading';

class HomeScreen extends Component {
  static navigationOptions = () => {
    return {
      title: 'Home'
    };
  };

  api = new NewsService();

  state = {
    data: null,
  };

  async componentDidMount() {
    this.props.getSelectedCategories();
    if (this.props.categories.length == 0) {
      this.props.navigation.navigate('Settings');
    }
    this.props.getReadedArticles();
    let data = await this.api.getNewsByCategories(this.props.categories);
    data = data.filter(({ title }) => !this.props.readedArticles.includes(title));
    this.setState({ data });
  }

  save = title => {
    this.props.setReadedArticles(title);
    let data = this.state.data.filter((article) => title !== article.title)
    this.setState({ data });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.data ? (
          <FlatList
            data={this.state.data}
            keyExtractor={item => item.title}
            renderItem={({ item }) => <NewsItem data={item} onSwipeRight={this.save} />}
          />
        ) : (
          <Loading displayColor="red" />
        )}
      </View>
    );
  }
}

const mapStateToProps = ({articlesReducer, categoriesReducer}) => {
  return {
    readedArticles: articlesReducer.readedArticles,
    categories: categoriesReducer.selectedCategories
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    getReadedArticles: () => dispatch(getStorageReadedArticles()),
    getSelectedCategories: () => dispatch(getStorageSelectedCategories()),
    setReadedArticles: selectedArticle => dispatch(setStorageReadedArticles(selectedArticle))
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(HomeScreen);
