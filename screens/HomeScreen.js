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
    props.getReadedArticles();
    // if (props.categories && props.categories.length == 0) {
    //   props.navigation.navigate('Settings');
    // }

    // props.categories en param de l'api call.
    // Mais on arrive pas attendre Redux avant de faire le call api
    api.getNewsByCategories(['business, entertainment']).then(realData => {
      const data = realData.filter(({ title }) => !props.readedArticles.includes(title));
      setData(data);
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
