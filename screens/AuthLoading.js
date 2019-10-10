import React, { Component } from "react";
import { ActivityIndicator, AsyncStorage, StatusBar, StyleSheet, View } from 'react-native'
import Loading from "../src/Loading";

import { isAuthenticated } from "../api/spotifyApi";


class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const isAuth = await isAuthenticated();
    console.warn(isAuth);
    this.props.navigation.navigate(isAuth ? "App" : "Auth");
  };

  render() {
    return <Loading />;
  }
}

export default AuthLoadingScreen;
