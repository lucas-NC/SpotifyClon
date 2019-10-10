import React from "react";
import { View, StyleSheet, ToastAndroid, Linking } from "react-native";
import { Image, Text, Button } from "react-native-elements";
import { authorize } from "../api/spotifyApi";
//import logo from "../assets/Spotify_icon.png";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width: 80,
    height: 80
  },
  button: {
    backgroundColor: "#2F4F4F"
  },
  text: {
    marginTop: 10,
    marginBottom: 20
  }
});

const Login = ({ navigation }) => {
  const handleOnPress = () => {
    authorize().then(loggedIn => {
      if (!loggedIn) {
        ToastAndroid.show("No se pudo iniciar sesión...", ToastAndroid.SHORT);
      } else {
        ToastAndroid.show("Inicio de sesión exitoso!", ToastAndroid.SHORT);
        navigation.navigate("App");
      }
    });
  };
  return (
    <View style={styles.container}>
      {/* <Image source={logo} style={styles.image} /> */}
      {/* <Text style={styles.text}>Clon de Spotify</Text> */}
      <Button
        title={"Clon de Spotify"}
        onPress={() => handleOnPress()}
        raised
        buttonStyle={styles.button}
      />
    </View>
  );
};

export default Login;
