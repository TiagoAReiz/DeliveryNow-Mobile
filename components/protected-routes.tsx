import { useAuth } from "@/provider/auth-context";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const { authState } = useAuth();

  // Estado ainda carregando token
  if (authState?.authenticated === null) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-900">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  // Se não autenticado → redireciona pro login
  if (!authState?.authenticated) {
    return <Redirect href="/" />;
  }

  // Autenticado → renderiza a página normalmente
  return <>{children}</>;
}
