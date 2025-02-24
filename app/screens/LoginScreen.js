import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Alert, StyleSheet, Pressable, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from "react-native-safe-area-context"; // Import SafeAreaView
import EmailAndPassword from "../components/EmailAndPassword"
import { clearError } from "../store/reducers/authReducer";

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
    dispatch(clearError()); // Clear error on screen mount
  }, []);

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

  //clear error before going off to signup signupscreen and reset stack
  const handleSignUp = () => {
    dispatch(clearError());
    navigation.reset({
      index: 0,
      routes: [{ name: "SignupScreen" }],
    })
  };

  return (
    <SafeAreaView style={styles.safeContainer}>  
      <LinearGradient colors={['black', 'gray']} style={styles.container}>
        <View style={styles.fronticon}>
          <Image
            source={require('../../assets/images/fronticon.png')}
          />
        </View>
        <Text style={styles.title}>Welcome Back</Text>

        <EmailAndPassword
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          onSubmit={handleLogin}
          buttonText={loading ? "Logging in..." : "Login"}
          loading={loading}
        />

        <Pressable 
          onPress={handleSignUp} 
          style={({ pressed }) => [styles.signupButton, pressed && styles.buttonPressed]}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>

        <Pressable onPress={() => navigation.reset({
        index: 0,
        routes: [{ name: "ForgotPasswordScreen" }],
      })}>
          <Text style={{ color: 'white', textAlign: 'center', marginTop: 10 }}>
            Forgot Password?
          </Text>
        </Pressable>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "white", // Ensures background when gradient doesn't cover full height
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
    marginBottom: 30,
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
    marginBottom: 20,
  },
});

export default LoginScreen;