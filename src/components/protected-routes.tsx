import { useAuth } from "@/src/provider/auth-context";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const { authState } = useAuth();

  if (authState?.authenticated === null) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-900">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  
  if (!authState?.authenticated) {
    return <Redirect href="/" />;
  }


  return <>{children}</>;
}
