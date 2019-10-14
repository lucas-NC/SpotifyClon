import React from "react";
import { View, Linking, StyleSheet } from "react-native";
import { Text, ListItem, Avatar } from "react-native-elements";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center"
    },
    avatar: {
      marginTop: 30,
      marginBottom: 20
    },
    user: {
      fontSize: 20,
      fontWeight: "bold",
      marginVertical: 5
    },
    followers: {
      fontSize: 15,
      marginVertical: 5
    }
  });


  const UserCuentaInfo = ({ userInfo: { display_name, followers, image, uri } }) => {
    return (
      <View style={styles.container}>
        {image ? (
          <Avatar
            rounded
            size="large"
            source={{
              uri: image
            }}
            onPress={() => Linking.openURL(uri)}
            activeOpacity={0.9}
            containerStyle={styles.avatar}
          />
        ) : (
          <Avatar
            rounded
            size="large"
            icon={{ name: "user", type: "font-awesome" }}
            onPress={() => Linking.openURL(uri)}
            activeOpacity={0.9}
            containerStyle={styles.avatar}
          />
        )}
        <Text style={styles.user}>{display_name.toUpperCase()}</Text>
        <Text style={styles.followers}>{`Seguidores: ${followers}`}</Text>
      </View>
    );
  };
  
  export default UserCuentaInfo;