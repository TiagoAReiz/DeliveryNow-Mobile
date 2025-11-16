import ProtectedRoute from "@/src/components/protected-routes";
import { Tabs } from "expo-router";

export default function DeliveriesPage() {
  return (
    <ProtectedRoute>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            display: "none",
          },
          headerShown: false,
        }}
      />
    </ProtectedRoute>
  );
}
