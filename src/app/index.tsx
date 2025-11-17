import "@/global.css";
import { useAuth } from "@/src/provider/auth-context";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
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
import { DismissKeyboardWrapper } from "../utils/dismissKeyboard";

export default function LoginScreen() {
  const { onLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailChange = (value: string) => {
    if (error) {
      setError(null);
    }
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    if (error) {
      setError(null);
    }
    setPassword(value);
  };

  const isFormFilled = email.trim().length > 0 && password.trim().length > 0;

  async function handleLogin() {
    try {
      setIsLoading(true);
      setError(null);
      await new Promise((resolve) => setTimeout(resolve, 500));
      await onLogin?.({ email, password });
    } catch (err: any) {
      const message = "Falha ao fazer login. Verifique suas credenciais.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <DismissKeyboardWrapper>
      <View className="flex-1 bg-slate-950">
        {/* Background Geral */}
        <LinearGradient
          colors={["#020617", "#0f172a", "#1e1b4b"]}
          className="absolute inset-0"
        />

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
              <LinearGradient
                colors={["#3b82f6", "#8b5cf6"]}
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
          <View className={` rounded-2xl p-4 ${error ? "bg-red-500/10" : ""}`}>
            <Text className="text-red-500 mb-4">{error}</Text>
            {/* Input Email */}
            <View>
              <Text className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2 ml-1">
                E-mail
              </Text>
              <View className="flex-row items-center bg-slate-900/80 border border-slate-700 rounded-2xl px-4 py-3.5 focus:border-indigo-500 transition-colors mb-5">
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
                  onChangeText={handleEmailChange}
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
                  onChangeText={handlePasswordChange}
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
              disabled={isLoading || !isFormFilled}
              className="mt-4 active:scale-[0.98] opacity-100 disabled:opacity-60"
            >
              <LinearGradient
                colors={["#3b82f6", "#4f46e5", "#7c3aed"]}
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
        </KeyboardAvoidingView>
      </View>
    </DismissKeyboardWrapper>
  );
}

const styles = StyleSheet.create({
  shadowBtn: {
    shadowColor: "#4f46e5",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  shadowGlow: {
    shadowColor: "#3b82f6",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 5,
  },
});
