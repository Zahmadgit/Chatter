import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Alert, StyleSheet, Pressable} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from "react-native-safe-area-context";


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
    <SafeAreaView style={styles.safeContainer}>  
    <LinearGradient colors={['black', 'gray']} style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="Enter your email"
        placeholderTextColor="#bbb"
      />

      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        placeholderTextColor="#bbb"
      />

      <Pressable 
        onPress={handleSignUp} 
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? "Signing up..." : "Sign Up"}</Text>
      </Pressable>

      <Pressable 
        onPress={() => navigation.navigate("LoginScreen")} 
        style={({ pressed }) => [styles.backButton, pressed && styles.buttonPressed]}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Back to Login</Text>
      </Pressable>
    </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center"
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: "white",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#555",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    color: "white",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  backButton: {
    backgroundColor: "#6C757D",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SignupScreen;