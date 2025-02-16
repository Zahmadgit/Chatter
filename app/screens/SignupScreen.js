import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { error, loading, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigation.navigate("LoginScreen");
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      Alert.alert("Signup Failed", error);
    }
  }, [error]);

  const handleSignUp = () => {
    dispatch({
      type: 'SIGNUP_REQUEST',
      payload: { email, password }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button
        title={loading ? "Signing up..." : "Sign Up"}
        onPress={handleSignUp}
        disabled={loading}
      />
      <Button
        title="Back to Login"
        onPress={() => navigation.navigate("LoginScreen")}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default SignupScreen;