import React from "react";
import { Icon } from "react-native-elements";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import HomeScreen from "../screens/Home";
import PlaylistScreen from "../screens/Playlist";
import Login from '../screens/Login';
import AuthLoadingScreen from '../screens/AuthLoading';

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


const RootStack = createBottomTabNavigator(
  {
    Home: {
      screen: homeScreenStack,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "Exit",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="exit-run"
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
