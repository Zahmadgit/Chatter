import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Alert, StyleSheet, Pressable, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { LinearGradient } from 'expo-linear-gradient';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { error, loading, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigation.navigate("HomeScreen");
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      Alert.alert("Login Failed", error);
    }
  }, [error]);

  const handleLogin = () => {
    dispatch({
      type: 'LOGIN_REQUEST',
      payload: { email, password }
    });
  };

  return (
    <LinearGradient colors={['black', 'gray']} style={styles.container}>
      <View style={styles.fronticon}>
        <Image
          source={require('../../assets/images/fronticon.png')}
        />
      </View>
      <Text style={styles.title}>Welcome Back</Text>

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
        onPress={handleLogin} 
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? "Logging in..." : "Login"}</Text>
      </Pressable>

      <Pressable 
        onPress={() => navigation.navigate("SignupScreen")} 
        style={({ pressed }) => [styles.signupButton, pressed && styles.buttonPressed]}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
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
  signupButton: {
    backgroundColor: "#28A745",
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
  fronticon: {
    alignSelf: "center",
  }
});

export default LoginScreen;