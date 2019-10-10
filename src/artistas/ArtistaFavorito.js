import React from "react";
import { StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  container: {
    height: 150,
    width: 350,
    backgroundColor: "#F5FCFF",
    alignItems: "center",
    marginVertical: 7,
    flexDirection: "row"
  },
  name: {
    marginVertical: 5,
    marginHorizontal: 10,
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold"
  },
  followers: {
    marginVertical: 5,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "300"
  },
  image: {
    height: 150,
    width: 150
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: {
      height: 2,
      width: 1
    },
    shadowRadius: 1.5,
    shadowOpacity: 0.4,
    elevation: 2
  },
  dataInside: {
    flex: 1
  }
});

const ArtistaFavorito = ({
  navigation,
  artist: { image, name, followers, id }
}) => {
  return (
    <ListItem
      leftAvatar={{ source: { uri: image } }}
      title={name}
      subtitle={`🌟 ${followers} seguidores`}
      bottomDivider
      topDivider
      chevron
      onPress={() => {
        navigation.push("PlayList", {
          id
        });
      }}
    />
  );
};

ArtistaFavorito.propTypes = {
  artista: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    followers: PropTypes.number
  })
};

export default ArtistaFavorito;
