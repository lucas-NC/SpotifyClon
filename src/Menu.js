import React from "react";
import { Icon } from "react-native-elements";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import HomeScreen from "../screens/Home";
import PlaylistScreen from "../screens/Playlist";
import Login from '../screens/Login';
import AuthLoadingScreen from '../screens/AuthLoading';
import CuentaScreen from '../screens/Usuario';

const homeScreenStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: "Favoritos",
    }
  },
  PlayList: {
    screen: PlaylistScreen,
    navigationOptions: {
      title: "Top 10 Canciones"
    }
  }
});

const cuentaScreenStack = createStackNavigator({
  Cuenta: {
    screen: CuentaScreen,
    navigationOptions: {
      title: "Cuenta Info"
    }
  }
});


const RootStack = createBottomTabNavigator(
  {
    Home: {
      screen: homeScreenStack,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "Favoritos",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="heart-outline"
            type="material-community"
            size={30}
            color={tintColor}
          />
        )
      })
    },
    Cuenta: {
      screen: cuentaScreenStack,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "Cuenta",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="account-circle-outline"
            type="material-community"
            size={30}
            color={tintColor}
          />
        )
      })
    }
  },
  {
    tabBarOptions: {
      inactiveTintColor: "#2F4F4F",
      activeTintColor: "#2F4F4F"
    }
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: RootStack,
      Auth: Login
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
