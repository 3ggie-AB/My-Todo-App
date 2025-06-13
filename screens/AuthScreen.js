import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert, ActivityIndicator } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

export default function AuthScreen({ navigation }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authenticate();
  }, []);

  const authenticate = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware || !isEnrolled) {
      Alert.alert("Gagal", "Fingerprint tidak tersedia");
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Login dengan sidik jari",
      fallbackLabel: "Gunakan passcode",
    });

    if (result.success) {
      navigation.replace("Main"); // masuk ke tab navigator
    } else {
      Alert.alert("Gagal", "Autentikasi dibatalkan atau gagal");
    }

    setLoading(false);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button title="Coba Lagi" onPress={authenticate} />
      )}
    </View>
  );
}
