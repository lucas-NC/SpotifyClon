import React from "react";
import { Linking } from "react-native";
import { ListItem } from "react-native-elements";

const Album = ({
  track: { image, name, release_date, uri, total_tracks, album_name }
}) => {
  return (
    <ListItem
      leftAvatar={{ source: { uri: image } }}
      title={`${name} - Album: ${album_name}`}
      subtitle={`${release_date} - ${total_tracks} temas.`}
      bottomDivider
      topDivider
      chevron
      onPress={() => {
        Linking.openURL(uri);
      }}
    />
  );
};
export default Album;
