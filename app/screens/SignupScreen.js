import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { signUp } from "../../firebase/authService";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      await signUp(email, password);
      Alert.alert("Signup Successful!");
      navigation.navigate("LoginScreen"); // Navigates back to Login
    } catch (error) {
      Alert.alert("Signup Failed", error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Email:</Text>
      <TextInput style={{ borderWidth: 1, padding: 10 }} value={email} onChangeText={setEmail} />

      <Text>Password:</Text>
      <TextInput style={{ borderWidth: 1, padding: 10 }} secureTextEntry value={password} onChangeText={setPassword} />

      <Button title="Sign Up" onPress={handleSignUp} />
      <Button title="Back to Login" onPress={() => navigation.navigate("LoginScreen")} />
    </View>
  );
};

export default SignupScreen;