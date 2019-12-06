import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, Linking, StyleSheet } from "react-native";
import moment from 'moment/min/moment-with-locales';

class DetailScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.state.params.data.title,
    }
  }

  openInBrowser = (url) => {
    Linking.openURL(url).catch((err) => console.error('An error occurred', err));
  }

  render() {
    const { title, urlToImage, category, author, content, publishedAt, url } = this.props.navigation.state.params.data;

    return (
      <View>
        <Image style={styles.image} source={{ uri: urlToImage }} />
        <View style={styles.container}>
          <Text style={styles.meta}>{category} | {author} | {moment(publishedAt).locale('fr').format('ll')}</Text>
          <Text style={styles.title}>{title}</Text>
          <Text>{content}</Text>
          <TouchableOpacity style={styles.button} onPress={() => this.openInBrowser(url)}>
            <Text style={styles.buttonText}>Lire la suite</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default DetailScreen;

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: '100%',
    resizeMode: 'cover'
  },
  container: {
    margin: 15
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10
  },
  meta: {
    fontStyle: 'italic',
    color: 'gray',
    marginBottom: 5
  },
  button: {
    marginTop: 30,
    padding: 10,
    backgroundColor: 'lightgray',
    borderRadius: 5,
    alignItems: 'center'
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 14,
  }
});