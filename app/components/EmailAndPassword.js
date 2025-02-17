import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Image, TouchableOpacity } from "react-native";

const EmailAndPassword = ({ email, password, setEmail, setPassword, onSubmit, buttonText, loading }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisi = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <View>
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
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter your password"
                    placeholderTextColor="#bbb"
                />
                <TouchableOpacity onPress={togglePasswordVisi} style={styles.eyeIcon}>
                    <Image source={require('../../assets/images/eye.png')} style={styles.eyeImage} />
                </TouchableOpacity>
            </View>

            <Pressable 
                onPress={onSubmit} 
                style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
                disabled={loading}
            >
                <Text style={styles.buttonText}>{loading ? "Processing..." : buttonText}</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
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
        width: "100%",  // Ensure the input takes full width of its container
    },
    passwordInput: {
        borderWidth: 1,
        borderColor: "#555",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        padding: 12,
        marginBottom: 15,
        borderRadius: 8,
        color: "white",
        flex: 1,  // Make the input take available space
    },
    button: {
        backgroundColor: "#007AFF",
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
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
        position: "relative",  // Allows precise positioning of the eye icon
    },
    eyeIcon: {
        position: "absolute",
        right: 10,  // Position the icon at the right edge of the password input
        top: "40%", // Vertically center the icon
        transform: [{ translateY: -15 }], // Fine-tune the vertical centering
    },
    eyeImage: {
        height: 30,
        width: 30,
    },
});

export default EmailAndPassword;
