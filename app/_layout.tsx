import { AuthProvider } from "@/provider/auth-context";
import { Tabs } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0f172a" }}>
      <AuthProvider>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor: "gray",
            tabBarStyle: {
              display: "none",
            },
            headerShown: false,
          }}
        />
      </AuthProvider>
    </SafeAreaView>
  );
}
