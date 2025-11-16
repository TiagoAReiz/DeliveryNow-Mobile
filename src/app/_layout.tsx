import "@/global.css"; // Importante para o NativeWind
import { AuthProvider } from "@/src/provider/auth-context";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
// Recomendo usar View simples ou SafeAreaProvider no root em vez de SafeAreaView direto
// para evitar conflitos de insets, mas se preferir SafeAreaView, use o de 'react-native-safe-area-context'

export default function RootLayout() {
  // A cor exata do slate-950 é #020617
  const backgroundColor = "#020617";

  return (
    <View style={{ flex: 1, backgroundColor }}>
      <StatusBar style="light" backgroundColor={backgroundColor} />
      <AuthProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            // Isso pinta o fundo do container de navegação, evitando o flash branco
            contentStyle: { backgroundColor },
            // Opcional: animação mais suave para dark mode
            animation: "fade",
          }}
        />
      </AuthProvider>
    </View>
  );
}
