import "@/global.css";
import { useAuth } from "@/src/provider/auth-context";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function LoginScreen() {
  const { onLogin } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin() {
    setIsLoading(true);
    // Simulação rápida de loading para feedback visual
    await new Promise((resolve) => setTimeout(resolve, 500));
    await onLogin?.({ email, password });
    setIsLoading(false);
    router.push("/deliveries");
    console.log("Login realizado com sucesso!");
  }

  return (
    <View className="flex-1 bg-slate-950">
      {/* Background Geral */}
      <LinearGradient
        colors={["#020617", "#0f172a", "#1e1b4b"]} // Slate 950 -> Indigo 950
        className="absolute inset-0"
      />

      {/* KeyboardAvoidingView para o teclado não cobrir os inputs */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-center px-8"
      >
        {/* Cabeçalho / Logo */}
        <View className="items-center mb-12">
          <View
            style={styles.shadowGlow}
            className="bg-slate-900 rounded-3xl p-6 mb-6 border border-white/10"
          >
            {/* CORREÇÃO AQUI: Usando style direto para garantir o padding/radius */}
            <LinearGradient
              colors={["#3b82f6", "#8b5cf6"]} // Blue to Violet
              style={{ borderRadius: 16, padding: 16 }}
            >
              <FontAwesome name="cube" size={40} color="white" />
            </LinearGradient>
          </View>
          <Text className="text-4xl font-black text-white text-center mb-2 tracking-tight">
            Bem-vindo
          </Text>
          <Text className="text-slate-400 text-base text-center">
            Acesse sua conta para gerenciar entregas
          </Text>
        </View>

        {/* Formulário */}
        <View className="space-y-5">
          {/* Input Email */}
          <View>
            <Text className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2 ml-1">
              E-mail
            </Text>
            <View className="flex-row items-center bg-slate-900/80 border border-slate-700 rounded-2xl px-4 py-3.5 focus:border-indigo-500 transition-colors">
              <FontAwesome
                name="envelope"
                size={18}
                color="#64748b"
                style={{ marginRight: 12 }}
              />
              <TextInput
                placeholder="exemplo@email.com"
                placeholderTextColor="#475569"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                className="flex-1 text-white text-base font-medium"
              />
            </View>
          </View>

          {/* Input Senha */}
          <View>
            <Text className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2 ml-1">
              Senha
            </Text>
            <View className="flex-row items-center bg-slate-900/80 border border-slate-700 rounded-2xl px-4 py-3.5">
              <FontAwesome
                name="lock"
                size={20}
                color="#64748b"
                style={{ marginRight: 12 }}
              />
              <TextInput
                placeholder="Digite sua senha"
                placeholderTextColor="#475569"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                className="flex-1 text-white text-base font-medium"
              />
            </View>
          </View>

          {/* Esqueceu a senha */}
          <Pressable className="items-end pt-1">
            <Text className="text-indigo-400 font-semibold text-sm">
              Esqueceu sua senha?
            </Text>
          </Pressable>

          {/* Botão de Login */}
          <Pressable
            onPress={handleLogin}
            disabled={isLoading}
            className="mt-4 active:scale-[0.98]"
          >
            {/* CORREÇÃO AQUI: Padding e Flex movidos para style */}
            <LinearGradient
              colors={["#3b82f6", "#4f46e5", "#7c3aed"]} // Blue -> Indigo -> Purple
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[
                styles.shadowBtn,
                {
                  borderRadius: 16,
                  paddingVertical: 16,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                },
              ]}
            >
              {isLoading ? (
                <FontAwesome
                  name="circle-o-notch"
                  size={20}
                  color="white"
                  className="animate-spin mr-3"
                />
              ) : (
                <Text className="text-white font-bold text-lg tracking-wide">
                  Entrar
                </Text>
              )}
            </LinearGradient>
          </Pressable>
        </View>

        {/* Footer (Opcional) */}
        <View className="mt-10 flex-row justify-center">
          <Text className="text-slate-500 text-sm">
            Ainda não tem uma conta?{" "}
          </Text>
          <Pressable>
            <Text className="text-indigo-400 font-bold text-sm">
              Cadastre-se
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  shadowBtn: {
    shadowColor: "#4f46e5", // Indigo shadow
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  shadowGlow: {
    shadowColor: "#3b82f6", // Blue glow for logo
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 5,
  },
});
