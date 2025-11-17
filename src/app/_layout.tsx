import "@/global.css"; // Importante para o NativeWind
import { AuthProvider } from "@/src/provider/auth-context";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

export default function RootLayout() {
  const backgroundColor = "#020617";

  return (
    <View style={{ flex: 1, backgroundColor }}>
      <StatusBar style="light" backgroundColor={backgroundColor} />
      <AuthProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor },
            animation: "fade",
          }}
        />
      </AuthProvider>
    </View>
  );
}
