import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { fecthArtistInfo } from '../api/spotifyApi';
import MostraAlbum from '../src/artistas/MostrarAlbum';
import Loading from "../src/Loading";

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const PlaylistScreen = ({ navigation }) => {
  const [tracks, setTracks] = useState([]);
  const id = navigation.getParam("id");
  useEffect(() => {
    fecthArtistInfo(id).then(_tracks => {
      setTracks(_tracks);
    });
  }, []);
  return (
    <View style={styles.container}>
      {!tracks.length && <Loading />}
      {tracks && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={tracks}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <MostraAlbum key={item.id} track={item} />}
        ></FlatList>
      )}
    </View>
  );
};

export default PlaylistScreen;
