import React from 'react';
import { Provider } from 'react-redux';

import store from './redux/store';
import MainTabNavigator from './navigation/MainTabNavigator';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainTabNavigator />
      </Provider>
    );
  }
}

export default App;
