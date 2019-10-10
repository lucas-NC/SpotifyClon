import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    width: "100%",
    height: "100%",
    zIndex: 1030,
    opacity: 0.9
  }
});

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#14b534" />
    </View>
  );
};

export default Loading;
