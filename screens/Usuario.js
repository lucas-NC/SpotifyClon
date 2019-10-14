import React, { Fragment, useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import { logOutSpotify, UserInfo } from "../api/spotifyApi";
import Loading from "../src/Loading";
import UserCuentaInfo from "../src/usuario/Usuario";

const styles = StyleSheet.create({
    container: {
      justifyContent: "center"
    },
    alignButton: {
      flex: 1,
      justifyContent: "center"
    }
  });


  const CuentaScreen = ({ navigation }) => {
    const [userInfo, setUserInfo] = useState({
      display_name: "",
      image: "",
      uri: "",
      followers: 0
    });
    const [loading, setLoading] = useState(true);
    const handleOnPress = async () => {
      await logOutSpotify();
      navigation.navigate("Auth");
    };
    useEffect(() => {
        UserInfo().then(_userInfo => {
        setUserInfo(_userInfo);
        setLoading(false);
      });
    }, []);
    return (
      <Fragment>
        <View style={styles.container}>
          {loading && <Loading />}
          <UserCuentaInfo userInfo={userInfo} />
        </View>
        <View style={styles.alignButton}>
          <ListItem
            title="Cerrar Sesión"
            bottomDivider
            topDivider
            chevron
            onPress={() => handleOnPress()}
            style={styles.align}
          />
        </View>
      </Fragment>
    );
  };
  
  export default CuentaScreen;