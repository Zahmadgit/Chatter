import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from "react-native-safe-area-context";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleResetPassword = () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email");
      return;
    }

    dispatch({ type: 'FORGOT_PASSWORD_REQUEST', payload: { email } });
  };

  return (
    <SafeAreaView style={styles.safeContainer}> 
    <LinearGradient colors={['black', 'gray']} style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.label}>Enter your email address to reset your password:</Text>

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="Enter your email"
        placeholderTextColor="#bbb"
      />

      <Pressable 
        onPress={handleResetPassword} 
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? "Sending..." : "Send Reset Link"}</Text>
      </Pressable>

      <Pressable 
        onPress={() => navigation.goBack()} 
        style={({ pressed }) => [styles.backButton, pressed && styles.buttonPressed]}
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
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "white",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#555",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 12,
    borderRadius: 8,
    color: "white",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  backButton: {
    backgroundColor: "#777",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
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

export default ForgotPasswordScreen;