import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native-paper';

class Loading extends Component {

  static propTypes = {
    displayColor: PropTypes.string.isRequired
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color={this.props.displayColor} />
        {this.props.children}
      </View>
    );
  }
}

export default Loading;
