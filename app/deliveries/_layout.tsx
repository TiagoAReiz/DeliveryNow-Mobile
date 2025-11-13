import ProtectedRoute from "@/components/protected-routes";
import { Tabs } from "expo-router";

export default function DeliveriesPage() {
  return (
    <ProtectedRoute>
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
    </ProtectedRoute>
  );
}
