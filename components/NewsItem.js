import React, { Component } from 'react';
import { View, Button, StyleSheet, Text, Image, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import { SwipeRow } from 'react-native-swipe-list-view';
import moment from 'moment/min/moment-with-locales';
import { withNavigation } from 'react-navigation';

class NewsItem extends Component {
  static propTypes = {
    onSwipeRight: PropTypes.func.isRequired,
    data: PropTypes.any.isRequired,
  }

  state = {}

  render() {
    const { navigate } = this.props.navigation;
    const { title, urlToImage, category, source, publishedAt } = this.props.data;

    return (
      <SwipeRow style={styles.swipe} rightOpenValue={-120} disableRightSwipe key={title}>
        <View style={styles.standaloneRowBack}>
          <View style={styles.button}>
            <Button title="Marqué comme lue" onPress={() => this.props.onSwipeRight(title)}></Button>
          </View>
        </View>
        <TouchableHighlight style={styles.standaloneRowFront} onPress={() => navigate('Detail', { data: this.props.data })}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Image style={styles.image} source={{ uri: urlToImage }} />
            <View style={styles.content}>
              <View>
                <Text>{category}</Text>
                <Text style={styles.title} numberOfLines={2} >{title}</Text>
              </View>
              <View>
                <Text style={styles.meta}>{source.name}</Text>
                <Text style={styles.meta}>{moment(publishedAt).locale('fr').format('lll')}</Text>
              </View>
            </View>
          </View>
        </TouchableHighlight>
      </SwipeRow>
    );
  }
}

export default withNavigation(NewsItem);

const styles = StyleSheet.create({
  swipe: {
    overflow: 'hidden',
    borderRadius: 5,
  },  
  standaloneRowFront: {
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    height: 120,
  },
  standaloneRowBack: {
    backgroundColor: 'azure',
    alignItems: 'flex-end',
  },
  button: {
    width: 120,
    height: 120,
    justifyContent: 'center',
  },
  image: {
    width: 120,
    height: 120,
    marginRight: 10,
    resizeMode: 'cover'
  },
  content: {
    flex: 1,
    paddingHorizontal: 2,
    paddingVertical: 5,
    justifyContent: 'space-between'
  },
  title: {
    fontWeight: 'bold',
  },
  meta: {
    fontSize: 12,
    fontStyle: 'italic',
    color: 'gray'
  }
});
