import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { getStorageReadedArticles, setStorageReadedArticles } from '../redux/actions/articlesActions';
import { getStorageSelectedCategories } from '../redux/actions/categoriesActions';
import NewsService from '../services/NewsService';
import NewsItem from '../components/NewsItem';
import Loading from '../components/Loading';

const HomeScreen = props => {
  const [data, setData] = useState(null);
  const api = new NewsService();

  useEffect(() => {
    props.getSelectedCategories();
    if (props.categories && props.categories.length == 0) {
      props.navigation.navigate('Settings');
    }
    props.getReadedArticles();
    props.categories && api.getNewsByCategories(props.categories).then(realData => {
      if (data) {
        realData = data.filter(({ title }) => !props.readedArticles.includes(title));
        setData(realData);
      }
    });
  }, []);

  const save = title => {
    props.setReadedArticles(title);
    let filteredData = data.filter(article => title !== article.title);
    setData(filteredData);
  };

  return (
    <View style={{ flex: 1 }}>
      {data ? (
        <FlatList
          data={data}
          keyExtractor={item => item.title}
          renderItem={({ item }) => <NewsItem data={item} onSwipeRight={save} />}
        />
      ) : (
        <Loading displayColor="red" />
      )}
    </View>
  );
};

HomeScreen.navigationOptions = () => {
  return {
    title: 'Home'
  };
};

const mapStateToProps = ({ articlesReducer, categoriesReducer }) => {
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
