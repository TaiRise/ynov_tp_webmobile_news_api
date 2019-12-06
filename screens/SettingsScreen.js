import React, { useState, useEffect } from 'react';
import { View, Text, SectionList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import * as actionCreators from '../redux/actions/categoriesActions';

const SettingsScreen = props => {
  useEffect(() => {
    props.getSelectedCategories();
  }, []);

  const categories = [
    {
      title: 'Selected Categories',
      data: props.selectedCategories,
      iconType: 'remove'
    },
    {
      title: 'All Categories',
      data: ['Business', 'Entertainment', 'General', 'Health', 'Science', 'Sports', 'Technology'],
      iconType: 'add'
    }
  ];

  const updateCategories = data => {
    if (data.section.iconType == 'add') {
      props.setSelectedCategories(data.item);
    } else {
      props.removeSelectedCategories(data.item);
    }
  };

  const RenderItem = ({ data }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{data.item}</Text>
        <TouchableOpacity style={{ width: 90 }} onPress={() => updateCategories(data)}>
          <View
            style={[{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }, styles[data.section.iconType]]}
          >
            <Icon size={32} name={`ios-${data.section.iconType}`} color="black" />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SectionList
        sections={categories}
        keyExtractor={(item, index) => item + index}
        renderItem={data => <RenderItem data={data} />}
        renderSectionHeader={({ section: { title } }) => <Text style={styles.header}>{title}</Text>}
      />
    </View>
  );
};

SettingsScreen.navigationOptions = {
  title: 'Settings'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f9c2ff',
    alignItems: 'center',
    height: 60,
    paddingLeft: 20,
    marginVertical: 8
  },
  header: {
    fontSize: 32,
    marginTop: 15
  },
  title: {
    fontSize: 22
  },
  add: {
    backgroundColor: 'green'
  },
  remove: {
    backgroundColor: 'red'
  }
});

const mapStateToProps = state => {
  return {
    selectedCategories: state.categoriesReducer.selectedCategories
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    getSelectedCategories: () => dispatch(actionCreators.getStorageSelectedCategories()),
    setSelectedCategories: selectedCategory => dispatch(actionCreators.setStorageSelectedCategories(selectedCategory)),
    removeSelectedCategories: selectedCategory =>
      dispatch(actionCreators.removeStorageSelectedCategories(selectedCategory))
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(SettingsScreen);
