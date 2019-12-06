import React from 'react';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Icon from "react-native-vector-icons/Ionicons";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import DetailScreen from "../screens/DetailScreen";

const homeNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Detail: { screen: DetailScreen }
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'red'
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold'
      },
      headerRightContainerStyle: { marginRight: 12 }
    }
  }
);

const settingsNavigator = createStackNavigator(
  {
    Settings: { screen: SettingsScreen },
  },
  {
    initialRouteName: 'Settings',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'blue'
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold'
      },
      headerRightContainerStyle: { marginRight: 12 }
    }
  }
);

const tabNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: homeNavigator,
      navigationOptions: {
        tabBarLabel: 'Accueil',
        tabBarIcon: ({tintColor}) => (
          <Icon color={tintColor} size={25} name={'ios-home'} />
        ),
        tabBarColor: 'red',
      }
    },
    Settings: {
      screen: settingsNavigator,
      navigationOptions: {
        tabBarLabel: 'Paramètres',
        tabBarIcon: ({tintColor}) => (
          <Icon color={tintColor} size={25} name={'ios-settings'} />
        ),
        tabBarColor: 'blue'
      }
    },
  },
  {
    initialRouteName: 'Home',
    shifting: true,
  }
)

export default createAppContainer(tabNavigator);