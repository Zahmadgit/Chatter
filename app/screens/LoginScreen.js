import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { login } from "../../firebase/authService";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
      Alert.alert("Login Successful!");
      navigation.navigate("HomeScreen"); // Replace "Home" with your desired route
    } catch (error) {
      Alert.alert("Login Failed", error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Email:</Text>
      <TextInput style={{ borderWidth: 1, padding: 10 }} value={email} onChangeText={setEmail} />

      <Text>Password:</Text>
      <TextInput style={{ borderWidth: 1, padding: 10 }} secureTextEntry value={password} onChangeText={setPassword} />

      <Button title="Login" onPress={handleLogin} />
      <Button title="Sign Up" onPress={() => navigation.navigate("SignupScreen")} />
    </View>
  );
};

export default LoginScreen;