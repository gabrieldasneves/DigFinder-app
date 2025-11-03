import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { styles } from "./styles";
import { api } from "@/services/api";
import { router } from "expo-router";
import BackButton from "@/components/atoms/backbutton";

export default function CreateAccountForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!name || !email || !password) {
      Alert.alert("Finish all fields");
      return;
    }
    setLoading(true);
    try {
      const response = await api.post("/auth/signup", {
        name,
        email,
        password,
      });
      console.log("Signup response:", response.data);
      Alert.alert("Account created successfully! Login now.");
      // Não salva token, não faz login automático
      router.replace("/auth/login");
    } catch (error: any) {
      console.error("Signup error:", error.response?.data || error.message);
      Alert.alert(
        "Error creating account",
        error.response?.data?.message || "Try again later."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <BackButton
        buttonStyle={styles.backButton}
        textStyle={styles.backButtonText}
      />
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Create Account</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Registering..." : "Register"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
