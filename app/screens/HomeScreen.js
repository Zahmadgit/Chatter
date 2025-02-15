import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { login } from "../../firebase/authService";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ padding: 20 }}>
      <Text>Home</Text>
    </View>
  );
};

export default HomeScreen;