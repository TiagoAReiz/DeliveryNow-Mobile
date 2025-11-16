import "@/global.css";
import { useAuth } from "@/src/provider/auth-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function LoginScreen() {
  const { onLogin } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    await onLogin?.({ email, password });
    router.push("/deliveries");
    console.log("Login realizado com sucesso!");
  }
  return (
    <View className="p-4 flex justify-center bg-gray-900 gap-4 h-full">
      <Text className="text-4xl font-bold text-white text-center">
        Acesse sua conta
      </Text>
      <Text className="text-white text-base text-center">
        Bem vindo de volta! Realize o login.
      </Text>
      <Text className="text-white text-left">E-mail</Text>
      <TextInput
        placeholder="Digite seu email"
        placeholderTextColor={"gray"}
        value={email}
        onChangeText={setEmail}
        className="p-3 w-full  rounded-lg  bg-gray-800 text-white text-base
        border border-gray-600"
      />
      <Text className="text-white text-left">Senha</Text>
      <TextInput
        placeholder="Digite sua senha"
        placeholderTextColor={"gray"}
        value={password}
        onChangeText={setPassword}
        className="p-3 w-full  rounded-lg  bg-gray-800 text-white text-base
        border border-gray-600"
        secureTextEntry
      />
      <Pressable>
        <Text className="text-blue-500 text-right">Esqueceu sua senha?</Text>
      </Pressable>
      <Pressable
        onPress={handleLogin}
        className="bg-blue-500 px-4 py-3 rounded-lg w-full items-center"
      >
        <Text className="text-white text-base">Login</Text>
      </Pressable>
    </View>
  );
}
