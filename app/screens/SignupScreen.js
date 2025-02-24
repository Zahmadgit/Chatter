import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Alert, StyleSheet, Pressable} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from "react-native-safe-area-context";
import EmailAndPassword from "../components/EmailAndPassword";
import { clearError } from "../store/reducers/authReducer";

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
    dispatch(clearError()); // Clear error on screen mount
  }, []);

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
  
  //clear error before going off to signup signupscreen and reset stack

  const handleLogin = () =>{
    dispatch(clearError())
    navigation.reset({
      index: 0,
      routes: [{ name: "LoginScreen" }],
    })
  }

  return (
    <SafeAreaView style={styles.safeContainer}>  
    <LinearGradient colors={['black', 'gray']} style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      <EmailAndPassword
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          onSubmit={handleSignUp}
          buttonText={loading ? "Signing up..." : "Sign Up"}
          loading={loading}
        />

      <Pressable 
        onPress={handleLogin} 
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