import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { registerUser, loginUser, userExists } from "../storage/authStorage";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [existingUser, setExistingUser] = useState(null);

  // Verificar si el usuario ya existe
  const checkUser = async () => {
    const exists = await userExists(email);
    setExistingUser(exists);
  };

const handleRegister = async () => {

  if (!email || !password) {
    Alert.alert("Error", "Email y contraseña no pueden estar vacíos");
    return;
  }

  try {
    await registerUser(email, password);
    console.log("Usuario registrado con éxito");
    Alert.alert("Listo", "Usuario registrado con éxito");
    navigation.replace("Home", { email });
  } catch (error) {
    console.log("Error registrando usuario:", error);
    Alert.alert("Error", "No se pudo registrar el usuario");
  }
};


  const handleLogin = async () => {
    const success = await loginUser(email, password);
    if (success) {
      navigation.replace("Home", { email });
    } else {
      Alert.alert("Error", "Email o contraseña incorrecta");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {existingUser ? "Iniciar Sesión" : "Registrar Usuario"}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        onEndEditing={checkUser}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {existingUser ? (
        <Button title="Entrar" onPress={handleLogin} />
      ) : (
        <Button title="Registrar" onPress={handleRegister} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 22, marginBottom: 20 },
  input: { borderWidth: 1, width: "80%", padding: 10, marginBottom: 15, borderRadius: 5 },
});
