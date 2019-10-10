import React, { Fragment, useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import ArtistaFavorito from "../src/artistas/ArtistaFavorito";
import { getUserArtistsPromise } from "../api/spotifyApi";
import Loading from "../src/Loading";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15
  },
  text: {
    fontSize: 30,
    marginVertical: 20
  },
  alignText: {
    alignItems: "center",
    justifyContent: "center"
  }
});

const HomeScreen = ({ navigation }) => {
  const [artists, setArtists] = useState([]);
  useEffect(() => {
    getUserArtistsPromise().then(_artists => {
      setArtists(_artists);
    });
  }, []);
  return (
    <View style={styles.container}>
      {!artists.length && <Loading />}
      {artists && (
        <Fragment>
          {/* <View style={styles.alignText}>
            <Text style={styles.text}>Tus Artistas Favoritos</Text>
          </View> */}
          <FlatList
            showsVerticalScrollIndicator={false}
            data={artists}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <ArtistaFavorito
                key={item.id}
                artist={item}
                navigation={navigation}
              />
            )}
          />
        </Fragment>
      )}
    </View>
  );
};

export default HomeScreen;
