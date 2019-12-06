import React, { useState } from 'react';
import { View, Text, SectionList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SettingsScreen = () => {
  const [selectedCategories, setSelectedCategories] = useState();

  const categories = [
    {
      title: 'Selected Categories',
      data: selectedCategories,
      iconType: 'remove'
    },
    {
      title: 'All Categories',
      data: ['Business', 'Entertainment', 'General', 'Health', 'Science', 'Sports', 'Technology'],
      iconType: 'add'
    }
  ];

  function RenderItem({ data }) {
    console.log(data);
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{data.item}</Text>
        <View style={{ width: 90 }}>
          <View
            style={[{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }, styles[data.section.iconType]]}
          >
            <Icon size={32} name={`ios-${data.section.iconType}`} color="black" />
          </View>
        </View>
      </View>
    );
  }

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

SettingsScreen.navigationOptions = () => {
  return {
    title: 'Settings'
  };
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
    backgroundColor: 'red'
  },
  remove: {
    backgroundColor: 'green'
  }
});

export default SettingsScreen;
